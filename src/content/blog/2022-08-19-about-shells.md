---
published: true
layout: post
title: "Bash -> Zsh -> Fish -> Nushell"
intro: Let's talk about command-line interpreters, why you need to modernize your shell environment, and my terminal and shell setup overtime
---

#### TL;DR

As a software developer, you need to understand that while you may have the need to develop your software in the context of a POSIX standards compliant shell (bash, csh, tcsh, etc.), to make sure that it works in production on POSIX compliant systems, that doesn't mean that your development environment (read workstation) needs to be limited to those old shells. You should modernize your development environment to use newer shells, such as Fish or Nushell, to go along with that new workstation hardware that you continually upgrade (or do you still use 1970s/1980s hardware to go along with those old shells? Yeah, I didn't think so.), and reap other development productivity benefits!

#### Brief History of command-line interfaces

The history of command-line interface programs, shells, is a very long history. Instead of attempting to re-write it here, I am going to direct you to go read [this][1].

My history with shell programs started off with the [Bash shell][2], binary file being `bash` or `sh`, when first learning Linux early in my life, and through most of my career (still going today).

Up until 2019, my experience with shell programs at a personal workstation level were always using Bash, when then the Catalina (10.15) version of macOS adopted the [Zsh shell][3] as the default login shell, and I also adopted it as my personal shell of choice.

Below are my terminal and shell setups overtime...

#### -2019

- Terminal (default terminal app in macOS)
- Bash shell

This is as a basic as you can get, as a result, no screenshot to share.

#### 2019-2020

- Terminal
- [Zsh shell][4]
- [Oh-my-zsh][5]

![terminal_zsh_omz](/assets/images/terminal-zsh-omz.png "Default Terminal app + Zsh shell + Oh-My-Zsh")

#### 2020-2022

- [iTerm terminal][6]
- Zsh shell
- Oh-my-zsh

![iterm_zsh_omz](/assets/images/iterm-zsh-omz.png "iTerm terminal app + Zsh shell + Oh-My-Zsh")

#### Current

- iTerm terminal
- [Fish shell][7]
- [Tide][8]

![iterm_fish_tide](/assets/images/iterm-fish-tide.png "iTerm terminal app + Fish shell + Tide")

#### Future

- iTerm terminal
- [Nushell shell][9]

No screenshot here to show (yet).

I am particularly excited about moving to the Nushell shell some day. In particular, and if you have read some of my previous posts this shouldn't come as a surprise, I am exited about the Nushell support for parallelism, read more about it [here][10].

That is all. Thanks for reading.

[1]: https://en.wikipedia.org/wiki/Comparison_of_command_shells
[2]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
[3]: https://en.wikipedia.org/wiki/Z_shell
[4]: https://www.zsh.org/
[5]: https://ohmyz.sh/
[6]: https://iterm2.com/
[7]: https://fishshell.com/
[8]: https://github.com/IlanCosman/tide
[9]: https://www.nushell.sh/
[10]: https://www.nushell.sh/book/parallelism.html
