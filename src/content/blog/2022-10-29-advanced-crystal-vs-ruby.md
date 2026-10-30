---
published: true
layout: post
title: "Advanced: Crystal vs Ruby"
intro: Let's compare advanced features of both Crystal and Ruby
---

Considering that Crystal is heavily influenced by Ruby, and subsequently frequently compared against each other, I want to, without going into much detail, introduce some of the ways that these two languages are different when it comes to some advanced language features.

#### Metaprogramming

Among the advanced language features of Crystal and Ruby, there is metaprogramming support. This particular language feature in Ruby is one of the many reasons that made Ruby on Rails so successful (via the dynamic ORM methods of ActiveRecord). In metaprogramming, there is one notable specific feature that makes this language feature so powerful, and that is the ability to create new methods dynamically (at runtime or compile time). Let's take a look how you accomplish this in both languages...

```ruby
#!/usr/bin/env ruby

class Dog
  def bark
    puts "woof!"
  end
end

dog = Dog.new
dog.bark

dog.class.define_method(:name) { puts "Matsu!" }
dog.name
```

The key line in the example above is line 12, where we modify the class data structure of the object by defining a new instance method called `name`.

To read more about the metaprogramming features in Ruby, [go here][4].

{% raw %}

```crystal
#!/usr/bin/env crystal

class Dog
  def bark
    puts "woof!"
  end

  macro define_method(method_name, content)
    def {{method_name.id}}
      {{content}}
    end
  end

  def yield_with_self
    with self yield
  end
end

Dog.define_method name, { puts "Matsu" }

dog = Dog.new
dog.bark
dog.yield_with_self { name }
```

{% endraw %}
A few differences with Crystal:

- Unlike in Ruby, where you can alter an object's data structure at runtime, say by adding a new method, as a result of Crystal being a compile language, as opposed to an interpreted language like Ruby is, you cannot alter an object's data structure at runtime
- Use the `Macro` data structure to create AST nodes to produce code at compile time
- Then, in order to use said produced code, while keeping the scope in mind, call on the produced code, like in line 19 where we call the `define_method` method to create a new method at the class level (as opposed to at the object level)
- To use any method created at runtime, we need to tell the object to search for those methods within the context of itself, like we do in line 23 by using the `yield_with_self` method
- Last, notice in all of this that basic metaprogramming is not as easy or intuitive as that in Ruby

To read more about the metaprogramming features in Crystal, [go here][1].

#### Concurrency

Without going into any depth...

In (recent versions of) Ruby, concurrency is achieved via [Fiber][5] or [Ractor][6].

In Crystal, concurrency is achieved via [Fiber and Channels][2].

#### C-Bingings

Without going into any depth...

In Ruby, to bind to an external library you can [do it manually like so][7] or use third-party tools to help (gems) like [ffi][8].

In Crystal, you can bind to C libraries like [so][3].

#### Conclusion

While both languages have similar advanced features (and of course there are advanced features in each that the other doesn't have, but that is for another post), they vary in how they are used and/or how they work. Said variance is a result of a number of reasons, like the interpreted vs compiled nature of each, or the dynamically typed vs static typed nature of each, etc. Regardless, I find it immensely interesting and powerful how you can have these two languages to use for you advantage for the right job.

That is all, thanks for reading.

<!-- Crystal links -->

[1]: https://crystal-lang.org/reference/1.6/syntax_and_semantics/macros/index.html
[2]: https://crystal-lang.org/reference/1.6/guides/concurrency.html
[3]: https://crystal-lang.org/reference/1.6/syntax_and_semantics/c_bindings/

<!-- Ruby links -->

[4]: https://ruby-doc.org/core-3.0.0/Module.html
[5]: https://ruby-doc.org/core-3.0.0/Fiber.html
[6]: https://ruby-doc.org/core-3.0.0/Ractor.html
[7]: https://docs.ruby-lang.org/en/3.0/extension_rdoc.html#label-Example+-+Creating+the+dbm+Extension
[8]: https://github.com/ffi/ffi
