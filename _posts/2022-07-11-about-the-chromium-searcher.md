---
published: true
layout: post
title: The Chromium Searcher
intro: Let's explore my take at a The Silver Searcher like file search utility in Ruby
---

#### About The Chromium Searcher
In [this][1] other post, I talk about The Silver Searcher. Between my excitement for finding a file search utility that better utilizes your computer's multiple cores, and Ruby's new better concurrency support, I decided to try out my own take a file search command line utility, The Chromium Searcher was [born][2] (Go read the README for what's in a name and more).

But, to summarize what it is:

- it's a file search Ruby script
- it defaults to searching through all files using the Ractor construct (read in concurrency)
- optionally, you can search in a synchronous manner, or through the Fiber construct (read in concurrency)

Now that we have an introduction out of the way, ultimately, I really wrote The Chromium Searcher to see what the performance figures of using Ruby's new better conccurency constructs would be like when compared to a traditional synchronous run.

With that out of the way, like in my previous [post][1], we will be searching a directory with approximately 25k files. On to performance results!

#### Performance Results

Search synchronously/serially via a loop:
```
$ time ./the-chromium-searcher/cr.rb -r --method=serial --skip_output ruby .
./the-chromium-searcher/cr.rb -r --method=serial --skip_output ruby .  0.69s user 0.50s system 94% cpu 1.258 total
```

Search asynchronously via Fibers:
```
$ time ./the-chromium-searcher/cr.rb -r --method=fiber --skip_output ruby .
./the-chromium-searcher/cr.rb -r --method=fiber --skip_output ruby .  0.82s user 0.51s system 94% cpu 1.402 total
```

Search asynchronously via Ractor:
```
$ time ./the-chromium-searcher/cr.rb -r --skip_output ruby .
./the-chromium-searcher/cr.rb -r --skip_output ruby .  1.62s user 3.10s system 305% cpu 1.548 total
```

#### Takeaways
There are a number of takeaways from the performance results you see above, first of which should be that the total run time between these different type of runs are not that much different in value! Actually, searching through each file serially/synchronously is faster!! But how is that so?! You'd think that either using Ruby Fibers or the Ractor construct might yield a much faster run time (like with network I/O). Well, with disk I/O, operations are always synchronous. To read more about asynchronous disk I/O, go read [this][4] article.

There is one more takeaway I'd like to point out, in the run performance results above for when using the Ractor construct, notice the `305% cpu` value. While as a whole, the run time performance using the Ractor construct wasn't any faster than a simple synchronous loop over the files found, at least we used more CPU cores which tells us that if disk I/O operations were asynchronous the run time performance would have been much much faster.

#### Shoutout
A special thanks to Bruno Sutic ([@bruno-][3]), for being so generous with his time by replying to my emails about the lack of significant difference in run time performance numbers in Ruby between synchronous file search, Fiber based file search, and Ractor file search as a result of disk I/O being a blocking operation. Bruno was also who pointed me to [this][4] wonderful article about asynchronous disk I/O.

[1]: /about-the-silver-searcher
[2]: https://github.com/rrevi/the-chromium-searcher
[3]: https://github.com/bruno-
[4]: https://web.archive.org/web/20211104090555/https://blog.libtorrent.org/2012/10/asynchronous-disk-io/