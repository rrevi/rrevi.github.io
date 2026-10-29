---
published: true
layout: post
title: The Iron Searcher
intro: Let's explore my take at a The Silver Searcher like file search utility in Crystal
---

#### About The Iron Searcher
Between [this][1] previous post, where I share my excitement for the Crystal programming language, and [this][2] more recent previous post, where I go over my own take at The Silver Seacher but in Ruby, I decided to try out my own take at a file search command line utility but in Crystal, and thus The Iron Searcher was [born][3] (Go read the README for what's in a name and more).

To summarize what it is:

- it's a file search utility (binary) written in the Crystal programming language
- much like The Silver Searcher, this utility filters out files in directories known not to be of relevance (bin, tmp, node_modules, etc.)
- it defaults to searching through all files using the Crystal's concurrency features (Fibers + Channels)
- optionally, you can search in a synchronous manner

Now that we have an introduction out of the way, ultimately, I wrote The Iron Searcher to see what the performance figures of using the Crystal programming language would be like when compared to The Silver Seacher and to The Chromium Searcher.

With all that out of the way, like in my previous [post][2] about The Chromium Searcher, we will be searching a directory with approximately 25k files. On to performance results!

#### Performance Results

Search using The Silver Searcher (C via Pthreads):
```
$ time ag Iron .
ag Iron .  0.14s user 0.34s system 226% cpu 0.212 total
```

Search using The Chromium Searcher (Ruby via Ractors):
```
$ time ./the-chromium-searcher/cr.rb -r Iron .
./the-chromium-searcher/cr.rb -r Iron .  0.50s user 0.57s system 135% cpu 0.796 total
```

Search using The Iron Searcher (Crystal via Fibers + Channels):
```
$ time ./the-iron-searcher/bin/fe -r Iron .
./the-iron-searcher/bin/fe -r Iron .  0.14s user 0.21s system 104% cpu 0.327 total
```

#### Takeaways
- The Silver Searcher had the best performance, as in it took the least amount of time to search all files; however, there are some caveats here, where The Silver Searcher is likely to be searching a smaller amount of files since it reads ignore files and doesn't search in entries listed there, and also this utility is over 10+ years old and has had so many optimizations (read about them [here][4]). Nonetheless, we will use this as our baseline of comparison to the other searchers...
- The Chromium Searcher is over **3x slower** than The Silver Searcher
- The Iron Searcher is over **2x faster** than The Chromium Searcher! and about **50% slower** than The Silver Searcher, which isn't as bad as it might sound if you keep in mind the caveats I mentioned in the first takeaway above. This is truly very good performance considering how little effort it took to put it together. I am confident with more time spent on optimizing it, we could have The Iron Searcher perform very close to that of The Silver Seacher.
- All file search utilities listed here had more than 100% as a value in the `cpu` field, which is all to say that they all used multiple cores at the same time! Exactly what we want.

That is all. Thanks for reading.

[1]: /about-the-crystal-programming-language
[2]: /about-the-chromium-searcher
[3]: https://github.com/rrevi/the-iron-searcher
[4]: https://github.com/ggreer/the_silver_searcher#how-is-it-so-fast