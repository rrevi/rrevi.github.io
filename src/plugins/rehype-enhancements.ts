interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

interface HastElement extends HastNode {
  type: 'element';
  tagName: string;
  properties: Record<string, unknown>;
  children: HastNode[];
}

interface HastParent extends HastNode {
  children: HastNode[];
}

const LANGUAGE_LABELS: Record<string, string> = {
  ruby: 'Ruby',
  crystal: 'Crystal',
  sh: 'Terminal',
  bash: 'Bash',
  zsh: 'Zsh',
  shell: 'Shell',
  shellscript: 'Shell',
  plaintext: 'Output',
  text: 'Plaintext',
  txt: 'Plaintext',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  html: 'HTML',
  xml: 'XML',
  css: 'CSS',
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  sql: 'SQL',
  sqlite: 'SQLite',
  java: 'Java',
  python: 'Python',
  py: 'Python',
  c: 'C',
  cpp: 'C++',
  rust: 'Rust',
  go: 'Go',
  dockerfile: 'Dockerfile',
  markdown: 'Markdown',
  md: 'Markdown',
};

function el(
  tagName: string,
  properties: Record<string, unknown> = {},
  children: HastNode[] = [],
): HastElement {
  return { type: 'element', tagName, properties, children };
}

function text(value: string): HastNode {
  return { type: 'text', value };
}

function hasClass(node: HastElement, name: string): boolean {
  const cls = node.properties?.className ?? node.properties?.class;
  if (Array.isArray(cls)) return cls.includes(name);
  if (typeof cls === 'string') return cls.split(/\s+/).includes(name);
  return false;
}

function formatLanguageName(lang: string): string {
  const lower = lang.toLowerCase().trim();
  return LANGUAGE_LABELS[lower] || (lower ? lower.toUpperCase() : 'CODE');
}

function walkAndTransform(
  parent: HastParent,
  visitor: (node: HastElement, parent: HastElement | null) => HastNode | void,
  parentElement: HastElement | null = null,
): void {
  if (!Array.isArray(parent.children)) return;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (child.type !== 'element' || !child.tagName) continue;
    const elem = child as HastElement;
    elem.properties ??= {};
    elem.children ??= [];

    const replacement = visitor(elem, parentElement);
    if (replacement) {
      parent.children[i] = replacement;
      continue;
    }
    walkAndTransform(elem, visitor, elem);
  }
}

function createCodeBlockHeader(displayLang: string): HastElement {
  return el('div', { className: ['code-block-header'] }, [
    el('div', { className: ['code-lang-pill'] }, [
      el('span', { className: ['code-lang-dot'] }),
      el('span', { className: ['code-lang-name'] }, [text(displayLang)]),
    ]),
    el('span', { className: ['code-swipe-hint'] }, [text('SWIPE →')]),
    el(
      'button',
      {
        className: ['copy-code-button'],
        type: 'button',
        ariaLabel: `Copy ${displayLang} code to clipboard`,
        title: 'Copy code to clipboard',
      },
      [
        el(
          'svg',
          {
            className: ['copy-icon'],
            viewBox: '0 0 24 24',
            width: '13',
            height: '13',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ariaHidden: 'true',
          },
          [
            el('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
            el('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
          ],
        ),
        el(
          'svg',
          {
            className: ['check-icon'],
            viewBox: '0 0 24 24',
            width: '13',
            height: '13',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ariaHidden: 'true',
            style: 'display:none',
          },
          [el('polyline', { points: '20 6 9 17 4 12' })],
        ),
        el('span', { className: ['copy-text'] }, [text('Copy')]),
      ],
    ),
  ]);
}

/** Wraps Shiki-rendered code blocks in a static `.code-block-wrapper` header container. */
export function rehypeCodeBlocks() {
  return (tree: HastParent) => {
    walkAndTransform(tree, (node, parent) => {
      if (node.tagName !== 'pre' || !hasClass(node, 'astro-code')) return;
      if (parent && hasClass(parent, 'code-block-wrapper')) return;

      const rawLang =
        (typeof node.properties.dataLanguage === 'string' && node.properties.dataLanguage) ||
        (typeof node.properties['data-language'] === 'string' &&
          (node.properties['data-language'] as string)) ||
        '';
      const displayLang = formatLanguageName(rawLang);

      return el('div', { className: ['code-block-wrapper'] }, [
        createCodeBlockHeader(displayLang),
        node,
      ]);
    });
  };
}

/** Wraps Markdown tables in `.table-wrapper` at build time for horizontal mobile scrolling. */
export function rehypeTables() {
  return (tree: HastParent) => {
    walkAndTransform(tree, (node, parent) => {
      if (node.tagName !== 'table') return;
      if (parent && hasClass(parent, 'table-wrapper')) return;
      return el('div', { className: ['table-wrapper'] }, [node]);
    });
  };
}

/** Appends a non-textual SVG anchor link to section headings that have a generated `id`. */
export function rehypeHeadingAnchors() {
  const anchorTags = new Set(['h2', 'h3', 'h4']);

  return (tree: HastParent) => {
    walkAndTransform(tree, (node) => {
      if (!anchorTags.has(node.tagName)) return;
      const id = typeof node.properties.id === 'string' ? node.properties.id : '';
      if (!id) return;
      const alreadyLinked = node.children.some(
        (child) => child.type === 'element' && hasClass(child as HastElement, 'heading-anchor'),
      );
      if (alreadyLinked) return;

      node.children.push(
        el(
          'a',
          {
            className: ['heading-anchor'],
            href: `#${id}`,
            ariaLabel: `Link to section ${id}`,
          },
          [
            el(
              'svg',
              {
                viewBox: '0 0 24 24',
                width: '15',
                height: '15',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                ariaHidden: 'true',
              },
              [
                el('path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }),
                el('path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }),
              ],
            ),
          ],
        ),
      );
    });
  };
}
