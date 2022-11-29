---
published: true
layout: post
title: 'Windows: About the WSL based development environment'
intro: Let's explore what a WSL based development environment looks like and it's impact(s)
---

Before we begin, let's state some obvious...
- If you are developing software for the Windows platform, well you have to do it on a Windows machine.
- If you are developing software for any other platform (Linux, macOS, etc.), well you have to do it on the one of the these platforms. 

This is all to say, that on Windows, you couldn't build that piece of software that you want to run on Linux (e.g. on a Windows machine, you couldn't develop, build, run and test that microservice you are building to deploy on some Cloud provider).

To a large extent, this is has been the way, sometimes the only way. That is, up until now.

### About WSL
With the introduction of the [Windows Subsystem for Linux (WSL)][0], you can now run Linux and related tools directly on Windows (and without the overhead of a virtualized environment!). This is huge news for a number of reasons. In particular, this is huge news for software developers who have always wanted to develop with a particular programming language or a particular development framework but couldn't because of a lack of support for Windows (or couldn't because a Mac is too expensive $$$, like it may be the case for many aspiring developers, more on this later).

#### Setup WSL
If you are reading this on a Windows machine, and are running the latest version of Windows 10 or Windows 11, from a PowerShell terminal or Command Prompt terminal (in administrator mode), go install a Linux distribution on WSL, using the following command:

`wsl --install`

The command above should have installed a version of Ubuntu. To verify, run the following WSL command to get a list of installed Linux distributions:

`wsl -l`

Read more about how to install a Linux distribution on WSL, or just how to use WSL in general, from [here][1].

As a suggestion, once you have a Linux distribution running on Windows via WSL, make sure to set it as the default Linux distribution for WSL to use. In this way, you can just run the `wsl` command with no options and automatically connect to said Linux distribution.

#### Setup WSL for software development
Now that you have a Linux distribution you can connect to and use on Windows, let's explore the use of common software development tools under WSL.

But before we do, go read about setting up a development enviroment with WSL [here][2].

In particular, before you move on to the next sections, make sure you install and setup Git in your Linux distro on WSL, and to do so go [here to learn more][3].

### About WSL and Docker
These days, where everyone is developing for the Cloud, one of the most commonly used software development tools is Docker for running containers on.

With WSL, you can now install Docker Desktop on Windows, and have Docker Desktop run containers in your WSL Linux distribution and skip the neccesacity to have build scripts for both Linux and Windows. To be clear, what that last piece means it that you can use the `docker` command within your WSL based Linux distro and also from a Windows terminal, all using the same Docker engine (that is running on Linux through WSL).

To read more about Docker Desktop on Windows via WSL, go read about it from [Microsoft][4] and go read about it from [Docker][5].

### About WSL and Visual Studio Code
One more development tool to be a big winner of the integration of running Linux on Windows through WSL is Visual Studio Code.

Think about it, what (limited) good would a Linux instance be if you couldn't use an IDE on it. To me, being able to run VS Code on Windows while it is connected to the Linux instance on WSL for development is the biggest sell of them all. I couldn't belief the ease to get it working, and I couldn't believe that VS Code running on Windows could connect to a Linux instance on WSL and use that environment for development activities!

Enough about my excitement, go setup VS Code to work with WSL, read the *Getting started* section from the VS Code team [here][6] or you can follow the equivalent article from the Microsoft team [here][7].

I (we?) no longer need macOS, or no longer need a separate machine running Linux in your office to do development on, or no longer need Linux running on a VM (whether on your workstation or in the Cloud).


### About what this all means
This all means too much for me to list here, but here is a brief take...

- While developing in Linux has always been an option, you just don't have a desktop environment like you do on a Mac or a Windows based PC. The Mac, with macOS, has become the defacto platform for developing software that isn't meant for Windows (Linux, web, etc.). But now, on Windows, with the WSL, you have the desktop environment most people have come to know, and be able to develop software for any intended OS.
- In November of 2022, a MacBook Pro 14" M1 Pro was on sale for $1599. At the same time, a Lenovo IdeaPad 15" with a 12th gen Intel Core i7 chipset (CPU + GPU) was on sale for $539. These two machines have comparable performance. Don't believe me? [Go read this blog post by me][8]. That is some major $$$ savings. To some, the Mac will be worth the over $1k more, but to most humans, I am sure, this opens a huge window of opportunity. Great move by Microsoft.
- For software developers, you no longer need to support building or running your software on Windows. Instead, just have your users or contributing  developers use WSL! This. Is. Huge.

For all those aspiring software developers who are on a Windows machine and come to me for how to get started, I now have a way to introduce them to development under Linux while on Windows! (e.g. like getting started with Ruby on Rails). All with minimal effort. This is most exciting!

Where as all my previous blog post entries were written and built on macOS. This blog post was written for my Jekyll based blog, in VS Code connected to a running Ubuntu instance on WSL, on a Lenovo IdeaPad running Windows 11.

Thanks for reading.

[0]: https://learn.microsoft.com/en-us/windows/wsl/about
[1]: https://learn.microsoft.com/en-us/windows/wsl/install
[2]: https://learn.microsoft.com/en-us/windows/wsl/setup/environment
[3]: https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git
[4]: https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers
[5]: https://docs.docker.com/desktop/windows/wsl/
[6]: https://code.visualstudio.com/docs/remote/wsl
[7]: https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode
[8]: /intel-8th-vs-12th-gen