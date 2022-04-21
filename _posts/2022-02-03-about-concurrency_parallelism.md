---
published: true
layout: post
title: About Concurrency and Parallelism in computing
intro: Let's go over a very brief history of concurrency in modern computers (consumer PCs), and the Ruby language's take on it 
---

Every so often something so exciting occurs in the computing industry, and more specifically in software development, and in this case in the Ruby language ecosystem, that it deserves writing about and sharing!

> It’s multi-core age today. Concurrency is very important. With Ractor, along with Async Fiber, Ruby will be a real concurrent language. — Matz

Don't know who Matz is? Read about him [here](https://en.wikipedia.org/wiki/Yukihiro_Matsumoto).

Before we dig in to these two new concurrency models of programming in the Ruby languange, let's talk about about modern computing...

**Disclaimer:** this is a very brief analysis, and it was mostly drawn up in an afternoon while searching for information (history) online. I expect there to be some inaccuracies. For a more in-depth and more accurate history, do your own research.

#### The 2000s - The hardware
Since about [2006][1], CPUs has been gaining an ability to run multiple processes (via cores) in parallel. Across all those cores, via the software layer, CPUs have also been able to run multiple threaded processes across all cores. It is important to understand the difference between cores vs threads, so go [read more about it][2] before you continue. It essentially boils down to cores are the actual hardware processing units which literally perform parallelism/concurrency by running software processes (programs) at the same time on each available core, whereas threads are virtual (software level) processing units that run your program across whatever core is available at any one moment.

If you've been following the personal computing world lately, you very well know about the relatively new Apple M1+ CPUs and how well they excell at running multiple tasks concurrently. While this is true for a number of reasons, one prominent reason is the many cores of this CPU (up to 10 at the time of this writing). The future of hardware, as it's been for a long time in the works now (remember since 2006), is the use of many cores to achieve computational prowress. Soon enough we'll have personal computers where the CPU contains 20 computational cores, 50 cores, 150 cores, and on and on. As a result, we need to make better use of these cores, otherwise they are just sitting there and all that computational prowress is for nothing (well, maybe for show haha).
 
#### The 2010s - The software
Naturally, software follows hardware. Up until recent time, with most programming languages you could only achive concurrent execution of a program at the software layer, via use of constructs like threads (much like the native multi-thread ability of the CPU). While constructs made you use the CPU more effectively and effeciently, the whole time you were still running on only one core of the CPU (and in theory, the rest of the cores are sitting idle) Which is to say, the most common of programming languages did not or were not able to give the software developer the ability to write a program to make use of all the cores that a CPU contains at the same time. As an example of this, think of Java, the JVM, and the [Thread feature][3].

In [2010][4] the first public version of Akka was released. It gained popularity and reached my perception of mass market from 2012 and on, [see here as an indicator][5]. In Akka, you find a implementation and introduction to the actor model of concurrency. The actor model of concurrency is a major shift in paradigm and technique to concurrency. [This][6] article does a great job at explaning the challenges of today's common programming model, and how Akka and the actor system of concurrency became a better solution to take advantage of the modern day CPU (with it's many cores). The actor model of concurrency has gained so much validation and popularity, that other common programming languages are starting to pick it up, [see this blog entry on Swift][7] and in the next section we will go over Ruby's take on concurrency.

#### The 2020s - The Ruby way to concurrent program
With the introduction of Ruby 3.0 in December of 2020, two new, much more modern (when compared to the Thread abstraction) ways to program concurrency were introduced: Fiber and Ractor. I've already covered these two new concurrency abstractions in previous blog posts, [here](/light-weight-concurrency-the-ruby-way) and [here](/heavy-weight-concurrency-the-ruby-way), so I won't be covering them in detail here. Needless to say, Ruby has joined modern computer languages in support of better ways to write computer programs with concurrency. I look forward to all of the practical ways we'll be able to add concurrency to our software, and the perfomance gains of doing so.

#### In Summary
I am really excited about the future...
- Today's hardware is starting to include tens of computing cores inside of the CPU, [Apple's M based CPUs][8] is [rejuvinating performance in the consumer PC world][9], and Intel while playing catch up and staying competitive with the [12th generation Core processors][10] is [doing the same on the Windows side of the market][11], particularly with [Thread Director support in Windows 11][12].
- Today's programming languages (and tools, think of all the [Akka libraries and modules][13]), are bringing software developers the right paradigm, techniques, and features to finally use up all of what today's CPUs have in concurrent/parallel power. This, naturally, means that software developers will produce software that will be much more capable and faster (at least I have 😎).
- The Ruby language continues to stay relevant by introducing a developer happiness focused implementation of new standards and conventions in the software development industry. To along with that, the Ruby ecosystem also continues to stay relevant in it's own by implemention of modern conventions and standars; a perfect example of this is Ruby on Rails with HTML-over-Websockets, read all about it [here][14] and [here][15].

[1]:    https://en.wikipedia.org/wiki/Intel_Core_(microarchitecture)
[2]:    https://www.guru99.com/cpu-core-multicore-thread.html#10
[3]:    https://en.wikipedia.org/wiki/Java_concurrency#Processes_and_threads
[4]:    https://en.wikipedia.org/wiki/Akka_(toolkit)#History
[5]:    https://github.com/akka/akka/graphs/contributors
[6]:    https://doc.akka.io/docs/akka/current/typed/guide/actors-motivation.html
[7]:    https://www.swift.org/blog/distributed-actors/
[8]:    https://www.apple.com/macbook-pro-14-and-16/
[9]:    https://arstechnica.com/gadgets/2021/10/2021-macbook-pro-review-yep-its-what-youve-been-waiting-for/5/
[10]:   https://www.intel.com/content/www/us/en/products/docs/processors/core/12th-gen-core-desktop-brief.html
[11]:   https://arstechnica.com/gadgets/2021/10/intels-12th-gen-alder-lake-cpus-will-try-to-make-up-for-rocket-lakes-stumbles/
[12]:   https://www.youtube.com/watch?v=h4ENatPLsro
[13]:   https://doc.akka.io/docs/akka/current/typed/guide/modules.html
[14]:   https://dev.to/julianrubisch/twitter-clone-with-stimulusreflex-gone-hybrid-native-app-17fm
[15]:   https://alistapart.com/article/the-future-of-web-software-is-html-over-websockets/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed3A+thechangelog+28The+Changelog29