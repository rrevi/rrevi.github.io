---
published: true
layout: post
title: Ruby 3.0 is now concurrent, the Ruby way via the Fiber primitive
intro: With this major release of Ruby, you can sprinkle light weight concurrency easily throughout your current codebase, let's see how...
---

With the release of Ruby 3.0, two concurrency features/frameworks were introduced, [Fibers][1] for light-weight 🥊 concurrency, and [Ractors][2] for full-weight 🥊 🥊 parallel execution.

In this post, let's cover the Fiber light-weight concurrency framework, how the [Async gem][3] extends Fiber for ease of use, and let's have some fun by running benchmarks.

#### Using the Fiber primitive

Using the Fiber primitive, let's write a sample **blocking** fiber program:

```ruby
#!/usr/bin/env ruby

# asynchronous - using blocking Fiber primitive
def nap
    puts "you now have to wait, while I nap..."
    sleep 3
    puts "...and now I'm awake, you can move along."
end

puts "blocking asynchronous execution, using the Fiber primitive"
fiber = Fiber.new do
    nap
    nap
end

fiber.resume
puts "blocking fibers are so boring."
```

and run it:

```
blocking asynchronous execution, using the Fiber primitive
you now have to wait, while I nap...
...and now I'm awake, you can move along.
you now have to wait, while I nap...
...and now I'm awake, you can move along.
blocking fibers are so boring.
```

As you can see, despite using the Fiber primitive for asynchronous code execution, by default, the behavior is blocking in nature. In other words, the code is run in serial fashion and pauses the current thread the Ruby interpreter is running on until the _fiber_ object finishes execution. Lame.

Well, how do we use the Fiber primitive in a non-blocking manner, so as to mimic actually concurrent execution of code? We have to implement a [Fiber scheduler interface][4] within the context of the Ruby interpreter thread. But think about it, nobody wants to do that! (it also means everyone has to, which isn't very DRY in principle)

Instead, let's leave it to the pros, and use a Ruby gem that already implements a Fiber schedule interface for us and makes writing non-blocking Fiber enabled code a breeze...

#### Using the Async gem

Meet the [Async gem][5], which [implements][6] the Fiber scheduler interface for us. With the Async gem, we can write non-blocking code like so:

```ruby
#!/usr/bin/env ruby

# asynchronous - non-blocking fiber using Async gem
require 'async'

def nap_async
    Async do |task|
        puts "you now have to wait, while I nap..."
        sleep 3
        puts "...and now I'm awake, you can move along."
    end
end

puts "non-blocking asynchronous execution, using the Async gem"

Async do
    nap_async
    nap_async
end

puts "non-blocking fibers are so much fun!"
```

and run it:

```
non-blocking asynchronous execution, using the Async gem
you now have to wait, while I nap...
you now have to wait, while I nap...
...and now I'm awake, you can move along.
...and now I'm awake, you can move along.
non-blocking fibers are so much fun!
```

I don't know about you, but I sure do like writing my code in non-blocking Fiber via Async and enjoying the benefits of asynchronous performance.

#### Let's have some fun, with benchmarks!

Running the following benchmark...

```ruby
#!/usr/bin/env ruby

require 'async'
require 'benchmark'

def nap
    sleep 3
end

def nap_async
    Async do |task|
        sleep 3
    end
end

Benchmark.bm do |x|
  # sequential version
  x.report('sequential'){ 3.times{ nap } }

  # blocking fiber version
  x.report('blocking fiber'){
    3.times.map do
        fiber = Fiber.new do
            nap
        end

        fiber.resume
    end
  }

  # non-blocking fiber version
  x.report('non-blocking fiber'){
    Async do
      3.times.map do
        Async do
            nap_async
        end
      end
    end
  }
end
```

Generates the following results:

```
                    user       system     total    real
sequential          0.000245   0.000205   0.000450 (9.003599)
blocking fiber      0.000451   0.000198   0.000649 (9.003754)
non-blocking fiber  0.001503   0.000343   0.001846 (3.001658)
```

If you look at the _real_ column values, which are in seconds, I hope you can see how great it is to write code with non-blocking fibers!

If you've liked what you've read and seen here, and would like to read more (better?) examples, go read [this][7] great intro to Async Ruby.

[1]: https://ruby-doc.org/core-3.0.3/Fiber.html
[2]: https://ruby-doc.org/core-3.0.3/Ractor.html
[3]: https://rubygems.org/gems/async
[4]: https://ruby-doc.org/core-3.0.3/Fiber/SchedulerInterface.html#method-i-fiber
[5]: https://socketry.github.io/async/guides/getting-started/index.html
[6]: https://github.com/socketry/async/releases/tag/v2.0.0
[7]: https://brunosutic.com/blog/async-ruby
