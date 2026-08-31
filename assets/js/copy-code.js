document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('div.highlight, figure.highlight, pre.highlight');

  codeBlocks.forEach((block) => {
    // Avoid duplicate buttons on nested elements
    if (block.tagName === 'PRE' && block.parentElement && block.parentElement.classList.contains('highlight')) {
      return;
    }

    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.textContent = 'Copy';

    button.addEventListener('click', async () => {
      const codeElement = block.querySelector('td.rouge-code pre') ||
                          block.querySelector('td.code pre') ||
                          block.querySelector('code') ||
                          block.querySelector('pre') ||
                          block;

      const codeText = codeElement.textContent;

      try {
        await navigator.clipboard.writeText(codeText);
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });

    block.style.position = 'relative';
    block.appendChild(button);
  });

  // Native lazy-loading and asynchronous decoding for post images
  document.querySelectorAll('.post-content img, .page-content img').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });

  // Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') ||
                           (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
});
