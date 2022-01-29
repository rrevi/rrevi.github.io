---
published: true
layout: post
title: Ruby 3.0 is now concurrent, the Ruby way via the Ractor abstraction
intro: With this major release of Ruby, you can now build applications with code that is executed in parallel, let's see how...
---

With the release of Ruby 3.0, two concurrecy features were introduced, [Fibers][1] for light-weight concurrency, and [Ractors][2] for full-weight parallel execution.

In this post, let's briefly cover the history of the Actor model abstraction, then go over Ruby's implementation of this Actor model abstraction by going over examples of the Ractor framework for full-weight concurrency, and finally have some fun by running benchmarks.

### Brief history of the Actor model of computing
The Actor model for concurrent computing dates back to [1973][3]. Essentially, this model of computing provides a framework around how to structure a computer program so as to be able to run pieces of said program (Actors) independent of each other (concurrency) and allow for them to talk to each other (via messages). You can read more about this [here][4]. This model of concurrent computing was popularized in the early 2010s by the [Akka framework][5]. This model of computing for concurrency has become so popular, that the Ruby language team decided to add it's [interpreptation][6] of it to the Ruby language.

### Using the Ractor abstraction
Ractors achieve true concurrency (a.k.a. parallelism) via thread-safety, by not sharing each other's objects nor any outer scope context. Ractors achieve this by each having it's own Global Virtual Machine Lock (GVL) on the standard implementation of the Ruby langauge (a.k.a. CRuby). In other implementations of the Ruby lamguage, this can be achieved in other ways. This is very different say from threads, where they share outer scope context, and a GVL is not held per thread.

To better understand how Ractors work, let's go over some examples...

```ruby
#!/usr/bin/env ruby

msg = "Hello World!"

# sequential
puts msg

# using threads
thread = Thread.new { puts msg }
thread.join

# using Fiber
fiber = Fiber.new do
    puts msg
end
fiber.resume

# using Ractors
ractor = Ractor.new { puts msg }
ractor.take
```

If you run the code above, you will get the following output...

```
Hello World!
Hello World!
Hello World!
<internal:ractor>:267:in `new': can not isolate a Proc because it accesses outer variables (msg). (ArgumentError)
```
... the error at the last line is a result of the *ractor* object being run within it's own GVL and not having access to the scope context of the program from which it is being defined and invoked. How do we fix this error?

To fix this Ractor error, you must send a message to the *ractor* object with the data you wish for it to know about, like so:
```ruby
#!/usr/bin/env ruby

msg = "Hello World!"

# using Ractor
ractor = Ractor.new do
    msg_in_ractor = receive
    puts msg_in_ractor
end
ractor.send msg
ractor.take
```

There is a lot more to cover about the Ractor abstraction in Ruby, like using an event loop to conitnue to receive messages, but I'll leave that for another post. Now that we have a basic understand of how Ractors work, let's have some fun!

### Let's have some fun with benchmarks!

First, let's benchmark an I/O like scenario, by running the following code:
```ruby
#!/usr/bin/env ruby -W0

require 'benchmark'

Benchmark.bm(10) do |x|
    # sequential version
    x.report('sequential'){ 8.times{ sleep 1 } }

    # Ractor version
    x.report('Ractor'){
        8.times.map do
            Ractor.new { sleep 1 }
        end.each(&:take)
    }
end
```

Which yields the following output:
```
                 user     system      total        real
sequential   0.000481   0.000393   0.000874 (  8.008347)
Ractor       0.006173   0.000683   0.006856 (  1.007379)
```
If you look at the values in the *real* column, which values are in seconds, you can see how using Ractors can speed your program by many magnitudes.

For as much as using Ractors can speed up your program, there are cases and instances where Ractors isn't the right abstraction to use in your program. Let's mimic and benchmark a CPU intensive task (where there is no waiting on I/O ):
```ruby
#!/usr/bin/env ruby -W0

require 'benchmark'

def calculate_gcd(a, b)
    remainder = a % b
    if remainder > 0
        return calculate_gcd(b, remainder)
    else
        return b
    end        
end

Benchmark.bm(10) do |x|
    # sequential version
    x.report('sequential'){ 8.times{ calculate_gcd rand(1..256), rand(1..256) } }

    # Ractor version
    x.report('Ractor'){
        8.times.map do
            Ractor.new { calculate_gcd rand(1..256), rand(1..256) }
        end.each(&:take)
    }
end

Benchmark.bm(10) do |x|
    # sequential version
    x.report('sequential'){ 128.times{ calculate_gcd rand(1..256), rand(1..256) } }

    # Ractor version
    x.report('Ractor'){
        128.times.map do
            Ractor.new { calculate_gcd rand(1..256), rand(1..256) }
        end.each(&:take)
    }
end

Benchmark.bm(10) do |x|
    # sequential version
    x.report('sequential'){ 1024.times{ calculate_gcd rand(1..256), rand(1..256) } }

    # Ractor version
    x.report('Ractor'){
        1024.times.map do
            Ractor.new { calculate_gcd rand(1..256), rand(1..256) }
        end.each(&:take)
    }
end
```

Which yields the following results:
```
                 user     system      total        real
sequential   0.000142   0.000010   0.000152 (  0.000152)
Ractor       0.000514   0.000205   0.000719 (  0.000723)
                 user     system      total        real
sequential   0.000281   0.000003   0.000284 (  0.000283)
Ractor       0.007692   0.008971   0.016663 (  0.007570)
                 user     system      total        real
sequential   0.000957   0.000002   0.000959 (  0.000958)
Ractor       0.041280   0.038501   0.079781 (  0.040213)
```

Again here, if you look at the values in the *real* column, over the three beanchmark runs, notice how the code that is in Ractors is taking considerable more time to run than the simple code that is being run sequentially. Why that is? Well, the CPU is amazingly advanced at performing arithmetic and as a result it can calculate the simple sequential code without the overhead that it takes to setup and teardown of the Ractors abstraction. 

I hope this very brief introduction to Ractors was insightful.

[1]: https://ruby-doc.org/core-3.0.3/Fiber.html
[2]: https://ruby-doc.org/core-3.0.3/Ractor.html
[3]: https://en.wikipedia.org/wiki/Actor_model
[4]: https://doc.akka.io/docs/akka/current/typed/guide/actors-intro.html
[5]: https://akka.io
[6]: https://docs.ruby-lang.org/en/3.0/doc/ractor_md.html