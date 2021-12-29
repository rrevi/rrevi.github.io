---
published: true
layout: post
title: Ruby 3.0 is fast, now repeat that three times fast!
intro: With this major release of Ruby, comes a long awaited feature -> concurrency
---

With the 3.0 major release of the Ruby programming language in December of 2020, see the official release news [here][1], come three major features:
- Major increase in performance 
- Concurrency
- Typing (static analysis)

[Multiple][2] [people][3] have already done a great job at coverring this major release of Ruby. Of these major new features, of most interested to me is concurrency.

>It’s multi-core age today. Concurrency is very important. With Ractor, along with Async Fiber, Ruby will be a real concurrent language. — Matz

The impact of this new concurrency support has also been well covered, in example [here][4].

Instead of going over what is already covered news, I want to show my own take with code examples to get the point accross of how impactful programming with concurrency is when compared to the old sequential style of programming.

For those who don't know, before the days of mutiple cores in a CPU, before the days of multiple threads, and before the days of programming language support for concurrency (and there are lots of styles and different flavors of this), all program logic were performed/executed in sequence (a.k.a sequentially). Meaning, if your program had three instructions, and each intruction takes 1 second to be executed, it will take a total of 3 seconds for this program to run. However, with use of concurrency, each of these three instructions will run in parallel, and running the program will only take about 1 second (or the lenght of time of the instruction that takes the longest to run).

Running the following Ruby code...

```ruby
#!/usr/bin/env ruby

require 'async'
require 'benchmark'

Benchmark.bm do |x|
  # sequential version
  x.report('sequential'){ 3.times{ sleep 1 } }

  # asynchronous version
  x.report('full asynchronous'){
    Async do 
      3.times.map do
        Async do
          sleep 1
        end
      end
    end
  }

  # parallel version
  x.report('parallel'){
    3.times.map do
      Ractor.new { sleep 1 }
    end.each(&:take)
  }
end
```

...yields the following results...
```shell
                user       system     total    real
sequential      0.000166   0.000127   0.000293 (3.003358)
asynchronous    0.000979   0.000215   0.001194 (1.001575)
parallel        0.012533   0.000715   0.013248 (1.020977)
```

In these results, the **real** column represents the code run time value in seconds (that the user experienced).

Oh and the performance gain by running your program code cocurrently scales in magnetude. Don't believe me? let's double the number of intructions to be run in the code above (to 6 instructions, as opposed to 3):
```shell
                user       system     total    real
sequential      0.000322   0.000326   0.000648 (6.006453)
asynchronous    0.001109   0.000244   0.001353 (1.001546)
parallel        0.007229   0.000730   0.007959 (1.012728)
```

See? Told you.

In a future post, I will take you on a brief deep dive of the *Async* framework, which is a light-weight concurrency framework for intercepting blocking operations.

In another post, I will also take you on a brief deep dive of the *Ractor* framework, which is a heavy-weight concurrency framework for use in any of your code.

But before you go, let's have a little more fun...

Let's now double the number of instructions again (to 12 instructions to be run):
```shell
                user       system     total    real
sequential      0.000737   0.000736   0.001473 (12.013701)
asynchronous    0.001551   0.000434   0.001985 (1.001451)
parallel        0.013558   0.001214   0.014772 (1.020158)
```

24x:
```shell
                user       system     total     real
sequential      0.001079   0.001098   0.002177 (24.024478)
asynchronous    0.003029   0.000810   0.003839 (1.002354)
parallel        0.008827   0.001543   0.010370 (1.014844)
```

48x:
```shell
                user       system     total    real
sequential      0.001933   0.001856   0.003789 (48.048899)
asynchronous    0.008469   0.001610   0.010079 (1.009128)
parallel        0.009244   0.003312   0.012556 (1.017398)
```

If that doesn't catch your attention, or get you excited, not sure what will!

[1]: https://www.ruby-lang.org/en/news/2020/12/25/ruby-3-0-0-released/
[2]: https://bignerdranch.com/blog/where-is-ruby-headed-in-2021/
[3]: https://www.bigbinary.com/blog/ruby-3-features
[4]: https://brunosutic.com/blog/async-ruby
