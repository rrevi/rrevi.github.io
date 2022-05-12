---
published: true
layout: post
title: 'Better utilize the multiple CPU cores on your computer via: The Silver Searcher'
intro: Let's explore the CPU usage and time to run performance of text search command line utility tools
---

With the advent of many CPU cores on the hardware side of modern day PCs, it is time for the software that runs on them to better utilize these cores (which is to say we software developers need to build software that better utilize said cores) for the benefit of the user(s).

And a great example of a piece of software that better utilizes multiple CPU cores is [The Silver Searcher](https://geoff.greer.fm/ag/), a shell tool known as the `ag` command. I won't go in depth at how this command tool better utilizes the many CPU cores here, since the author [@ggreer](https://github.com/ggreer) already does so [here](https://github.com/ggreer/the_silver_searcher/blob/master/README.md). But in summary, here is what you need to know:
- The `grep` command line utility tool is the original text search program to find ordinary text in files in your *nix operating system. Read more about it [here](https://en.wikipedia.org/wiki/Grep).
- The `ack` command line utility tool came later, as an attempt at a better user interface (mostly for software developers via better search term pattern matching support for program source code), also for searching text in files in your *nix operating system. Read more about it [here](https://github.com/beyondgrep/ack3/).
- The `ag` command line utility tool goes a step further where `ack` leaves off, and adds much better performance via the use of [Pthreads](https://en.wikipedia.org/wiki/Pthreads). Like some serious level of better performance! We're talking about magnitudes faster!! Like 5-10x faster in typical usage!!! Am I making myself clear here!!!!

Want to see how much faster each of these are from the other? Let's take a look...

First, we're going to be searching for the text *silver* in a directory with the following number of files:
```shell
$ find . -type f | wc -l                                             
  24769
$ 
```

Then, using the `grep` tool (the original of them all), we search for the *silver* text in all files in said directory (and all of its sub-directories, recursively):
```shell
$ grep --version
grep (BSD grep, GNU compatible) 2.6.0-FreeBSD
$ time grep -r silver . &> /dev/null
1.32s user 0.51s system 55% cpu 3.281 total
$ 
```
Notice I prepend each text search command example with the `time` tool to determine how long each command takes to run and to measure CPU usage, and also notice I include the version of each of the text search tools we're testing with here.

From the output above, we care for the value of *cpu* and *total*, in this case meaning that the `grep` command used up to 55% of the available CPU and that it took 3.28 seconds from the moment the user hit the *Enter* key to the moment the command line tool returned its output.

Now that we have a baseline, let's run the equivalent of the same command but with the `ack` tool:
```shell
$ ack --version                  
ack v3.5.0 (standalone version)
Running under Perl v5.30.3 at /usr/bin/perl

Copyright 2005-2021 Andy Lester.

This program is free software.  You may modify or distribute it
under the terms of the Artistic License v2.0.
$ time ack -r silver . &> /dev/null                                     
0.10s user 0.15s system 27% cpu 0.943 total
$ 
```

From the output above, using the `ack` tool to search for the same text across the same number of files, we see that it only used up to **27%** of the CPU (only about half of what `grep` required!) and it took **943 milli seconds** to run (over **3x** as fast as `grep`!!)

```shell
$ ag --version
ag version 2.2.0

Features:
  +jit +lzma +zlib
$ time ag -r silver . &> /dev/null  
0.12s user 0.34s system 147% cpu 0.311 total
$ 
```
If you were impressed with the performance gains from using `ack` versus when using `grep`, well take a look at the results from using the `ag` tool, it used **147%** of the CPU and it only took **311 milli seconds** to run, which is to say that by using up more than 100% of the CPU the tool used multiple cores! and it was **3x**  as fast as the `ack` tool (which was already fast! and if you do the math, this is over **10x** as fast as the original text search tool `grep`!!).

If you make it to the bottom of this blog post, and I hope you come away with two things: a general understanding at how modern software is better utilizing the multiple cores on your personal computer, and a general sense of excitement at how fast the future of software is going to be with the many CPU (or GPU) cores on your future personal computers!

Thanks for reading.