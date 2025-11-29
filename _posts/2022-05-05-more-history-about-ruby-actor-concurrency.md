---
published: true
layout: post
title: More history about Ruby and the Actor system of concurrency
intro: Let's go over more history of the Actor system of concurrency in the Ruby programming language
---

In [this](/heavy-weight-concurrency-the-ruby-way) previous post, I talk about the inclusion of the Actor system of concurrency into the Ruby for the first time. I should clarify two things about this news:

1. What this news means is that for the first time, the Ruby programming language, includes in it's standard set of libraries an Actor system framework
2. This news does not mean that it is the first time ever that the Actor system of concurrency is available in the Ruby programming language, it's quite the opposite. Mike Perham has written about [Threads Fibers Event and Actors](https://www.mikeperham.com/2011/05/19/threads-fibers-events-and-actors/) as far back as the year 2011. More specifically, Mike wrote about the [Celluloid](https://github.com/celluloid/celluloid) gem which makes concurrency possible in Ruby via an Actor system framework (see [here](https://github.com/celluloid/celluloid/blob/master/examples/basic_usage.rb) for an example). Of course, a long time has past since 2011, and gems like Celluloid that made concurrency available in Ruby have since stopped being developed.

This is all to say that **there is a long history with concurrency in the Ruby programming language**, and there is no better hope than to formally have concurrency built right into the programming language itself (as opposed to having to include third party libraries to do so, e.g. gems).

"Everything comes from something. Give credit, where credit is due." - Said someone someday somewhere, I am sure haha

Despite the long history that is there with concurrency in Ruby, I am still immensely excited about the Ruby programming language team formally including better concurrency support and what opportunities this will open up for us all!
