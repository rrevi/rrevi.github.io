---
published: true
layout: post
title: About Undefined Behavior
intro: Let's explore undefined behavior in your software, and how to get rid of common undefined behaviors by choosing the right programming language
---

#### TL;DR
The programming language you choose to develop your software with can consequently trigger Undefined Behavior in your software, and getting rid of common Undefined Behaviors usually means choosing a better programming language.

#### Rust in the Linux Kernel
A few months ago, from a Hacker News post, I learned about the effort that has been going on to bring the [Rust programming language][0] to the Linux kernel. Why Rust? Well, go read the [Foreword][1] section of the official online book for some clues.

#### Undefined Behaviors
In learning about this effort to bring Rust to the Linux kernel, I came across [this great Youtube video][2] and [presentation][3] from [Miguel Ojeda][4], where he goes into some depth about why bringing Rust to the Linux kernel is a good thing. Among the reasons is the idea of getting rid of some [Undefined Behavior][5] in the Linux kernel as a result of the only system level programming languages available being C/C++. I won't define or provide examples of what Undefined Behaviors are, go work through the links above before reading on.

This effort to bring Rust to the Linux kernel, and my introduction to the idea of how the programming language you choose to develop your software with can introduce Undefined Behaviors, made me think of how over the years there has been a consistent shift in the software industry away from unmanaged memory and dynamically typed programming languages to managed memory and type-safe languages as a way to mitigate all the [security vulnerabilities][6] that the former, with all their possibilities of Undefined Behaviors, can create.

#### Shift in programming languages
Here are some examples in shifts away from programming languages with Undefined Behavior to programming languages with less of it:

**Web (Front-end)**

|               | Javascript  | TypeScript |
| ------------- | ----------- | ---------- |
| memory        | managed     | managed    |
| type system   | dynamic*    | static     |

**Web (Back-end)**

|               | Ruby        | Crystal    |
| ------------- | ----------- | ---------- |
| memory        | managed     | managed    |
| type system   | dynamic*    | static     |

**Systems-level programming (e.g. Linux kernel)**

|               | C/C++       | Rust       |
| ------------- | ----------- | ---------- |
| memory        | unmanaged*  | managed    |
| type system   | static      | static     |

All languages above where one row value has an asterisk (*), equate to a language with greater possibility for Undefined Behavior by design. Move away from these languages, to their counterpart from above.

That is all, thanks for reading.

[0]: https://www.rust-lang.org/
[1]: https://doc.rust-lang.org/book/foreword.html
[2]: https://youtu.be/VlSkZYBeK8Q
[3]: https://static.linaro.org/connect/lvc21f/presentations/LVC21F-317.pdf
[4]: https://ojeda.dev/
[5]: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2596.pdf#subsection.3.4.3
[6]: https://www.theregister.com/2022/09/20/rust_microsoft_c/