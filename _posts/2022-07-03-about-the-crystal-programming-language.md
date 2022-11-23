---
published: true
layout: post
title: 'About the Crystal programming language'
intro: 'The Crystal programming language borrows inspiration from the best: Ruby, Go, Rust, Swift, and many more!'
---

### How I found out about Crystal
[This][1] Hacker News post introduced me to [this][2] article, that article instroduced me to [this][3] other article, and in that fashion I got introduced to the [Crystal programming language][4].

### About Crystal
So what is the Crystal programming language? According to their website, their motto is: 
> A language for humans and computers

Which I read as, a language like Ruby designed for ease of use by human beings (this is where a programming language like C fails), but also a language that like other programming languages such as C are designed to be efficient when running on a computer (this is where Ruby usually fails). In my limited experience using Crystal, I've found that they crush both of these objectives!

More specifically, from the language source code [repository][5], the goals are stated as:
> - Have a syntax similar to Ruby (but compatibility with it is not a goal)
> - Statically type-checked but without having to specify the type of variables or method arguments.
> - Be able to call C code by writing bindings to it in Crystal.
> - Have compile-time evaluation and generation of code, to avoid boilerplate code.
> - Compile to efficient native code.

I particularly like the first, second, and last goals. This is prove you can have the best of both worlds!

### Crystal vs Ruby
Let's compare Crystal (v. 1.4.1) vesus Ruby (v. 3.2.1), at a glance, here are key differences:

|                            | Crystal     | Ruby        |
| -------------------------- | ----------- | ----------- |
| syntax                     | ruby like                                      | ruby         |
| type system                | static (with type inference)                   | dynamic      |
| null reference checks      | yes                                            | no           |
| metaprogramming            | yes, via Macros                                | yes          |
| build and run system       | compiled (compile source code, then run binary)| interpreted (just run the source code file) |
| third-party dependencies   | shards                                         | gems         |

These are just a few differences, there are many more; there are advantages and disadvantages to each of these differences, I won't be going over them here, it is something you can google and learn on your own, and I really just want to get to some code!

Let's now go over my favorite Crystal language goals and compare them to the Ruby equivalent...

> - Have a syntax similar to Ruby (but compatibility with it is not a goal)

The first realization you need to have is that you can write (some) code that runs in both Crystal and in Ruby.

Let's look at a basic of example...

```crystal
# hello_world.cr
puts "Hello World"
```
this `hello_world.cr` file can be run by both the Crystal compiler and the Ruby interprerer, like so:

```
$ crystal run src/hello_world.cr 
hello world
$ ruby src/hello_world.cr 
hello world
$
```
Takeaways from this run output:
- The `crystal run` command both compiles the source code file and runs the resulting binary file all in one command! Very useful for development (and testing) purposes (not a command you would use otherwise).
- The Ruby interpreter doesn't care for file extensions (in the filename)
- This is one of the most basic examples and ways to demostrate how much the Crystal language syntax is like that of Ruby's syntax

Okay, but let's look at and run a better example...

```crystal
# bubble_sort_for_loop.cr

list = [9,8,7,6,5,4,3,2,1]

puts "Before bubble sort, first element: #{list.first} and last element: #{list.last}"

def swap_elements(array)
  for element_index in 0..array.size-1
    if element_index == array.size-1
      return false
    else
      if array[element_index] > array[element_index+1]
        next_element_value = array[element_index+1]
        array[element_index+1] = array[element_index]
        array[element_index] = next_element_value
        return true
      end
    end
  end
end

while(true)
  if !swap_elements(list)
    break
  end
end

puts "After bubble sort, first element: #{list.first} and last element: #{list.last}"
```

and when we run this file...
```
$ crystal run src/bubble_sort_for_loop.cr 
In src/bubble_sort_for_loop.cr:6:21

 6 | for element_index in 0..array.size-1
                       ^
Error: expecting identifier 'end', not 'in'
$ ruby src/bubble_sort_for_loop.cr 
Before bubble sort, first element: 9 and last element: 1
After bubble sort, first element: 1 and last element: 9
$
```
Takeaways from this run output:
- The Crystal run command fails, and the failure is related to the fact that the Crystal programming language does not have support for the `for` iterator construct; read about it [here][10]
- The Ruby interpreter command is successful, as the Ruby language has a `for` iterator construct

and here is the same bubble sort function but written in syntax that is valid in both Crystal and Ruby...

```crystal
def swap_elements(array)
  array.each_index do |element_index|
    if element_index == array.size-1
      return false
    else
      if array[element_index] > array[element_index+1]
        next_element_value = array[element_index+1]
        array[element_index+1] = array[element_index]
        array[element_index] = next_element_value
        return true
      end
    end
  end
end
```
and running this updated swap_elements function...
```
$ crystal run src/bubble_sort_each_loop.cr 
Before bubble sort, first element: 9 and last element: 1
After bubble sort, first element: 1 and last element: 9
$ ruby src/bubble_sort_each_loop.cr 
Before bubble sort, first element: 9 and last element: 1
After bubble sort, first element: 1 and last element: 9
$
```
...in this output, we see syntax that is compatible and functional in both languages! (of course, in a real-world app, this will very unlikely be the case)

> - Statically type-checked but without having to specify the type of variables or method arguments.

This is one my favorite features (goals) of Crystal. Where while the Crystal language has a statically typed system, it is out of the developer's way. What do I mean that the type system is out of the developer's way? Well, you can write programs where you don't explicitly set any type to any instance variable. So how is it statically typed if you don't set any explicit type when you define a new instance variable? Well, the compiler does type inference for us! This is awesome. As a developer, you only have to define the type of a new instance variable when either you must for some reason or just plain out want to.

Let's look over some code...
```crystal
# type_system.cr

foo = ENV["FOO"]? || false || 0 || 3.14

puts typeof(foo)
puts foo
puts foo.to_s
puts foo.upcase
```

and run it...

```
$ crystal run src/type_system.cr
Showing last frame. Use --error-trace for full trace.

In src/type_system.cr:5:10

 8 | puts foo.upcase
              ^-----
Error: undefined method 'upcase' for Bool (compile-time type is (Bool | Float64 | Int32 | String))
$
```

And takeaways from the output...
- the most obvious being that the compiler failed as a result of a missing `upcase` method in some of the possible object types for the variable `foo` (Bool, Float64, Int32); the [upcase][11] method is strictly only available in objects of the String type
- notice the compile time type (of variable `foo`) contains multiple types; more on this later
- last, notice there was no error for line 7, as the object method `to_s` is available in all of the possible types for variable `foo`

Okay Crystal compiler, let's remove line 8, the `puts foo.upcase` line and re-run the file...

```
$ crystal run src/type_system.cr
(Bool | Float64 | Int32 | String)
0
0
$
```
And takeaways from the output...
- Line 5 of the `type_system.cr` file, prints out all possible types for object `foo` at run time; why is more than one type printed? well, in line 3 we define `foo` be one of a number values from a conditinal statement (possibilities), from first if the environment variable `FOO` is set grab it's value (which is always an instance of String), otherwise `false`
(which is of type Bool), otherwise `0` (which is of type Int32), and finally otherwise `3.14` (which is of type Float64)
- Line 6 prints out **0**; why? well, from the list of possibilites, the environment key of `FOO` is not set and it returns the equivalent of false so the first conditional fails and we move to the next conditional statement, the next option `false` also fails the conditional statement and move on to the next one, next we have `0` which isn't a false value and the conditional stament passes and this we have the value of `0` assigned to the variable `foo`
- Line 7 also prints out **0** to the console; why? well this line is the equivalent of line 6, expect here we have explicitly told Crystal to print out the String value of whatever the `foo` variable is (this is exactly like what the `classInstanceVariable.toString()` is in Java)

One more thing about Crystal's type system versus Ruby's lack of, while it is evident that having a type system helps catch potential problems that would occur at run time, it can be argued, in favor of a dynamic type system like that in Ruby, that with enough TDD (a.k.a. testing) coverage to catch potential problems at runtime even out the playing field. And of course, this is not to say that with having a type system check you shouldn't test your code, you really should anyway as a way to building even more robust software ([read][13] about Crystal's own testing library)

Like any type system, there is a lot more to Crystal's type system than this very basic example is showing, so go read more about it [here][12].

> - Compile to efficient native code.

And finally, let's cover what is by far my favorite Crystal feature (and goal)! Efficient native code.

Let's just jump right into some code....

```crystal
# bubble_sort.cr

list = (1..1000).to_a.reverse

puts "Before bubble sort, first element: #{list.first} and last element: #{list.last}"

def swap_elements(array)
  array.each_index do |element_index|
    if element_index == array.size-1
      return false
    else
      if array[element_index] > array[element_index+1]
        next_element_value = array[element_index+1]
        array[element_index+1] = array[element_index]
        array[element_index] = next_element_value
        return true
      end
    end
  end
end

while(true)
  if !swap_elements(list)
    break
  end
end

puts "After bubble sort, first element: #{list.first} and last element: #{list.last}"

```

and when we run and time track this code in both Crystal and Ruby, it's output...
```
$ time ruby src/bubble_sort.cr
Before bubble sort, first element: 1000 and last element: 1
After bubble sort, first element: 1 and last element: 1000
ruby src/bubble_sort.cr  11.60s user 0.21s system 99% cpu 11.882 total
$ time crystal run src/bubble_sort.cr 
Before bubble sort, first element: 1000 and last element: 1
After bubble sort, first element: 1 and last element: 1000
crystal run src/bubble_sort.cr  2.74s user 0.35s system 106% cpu 2.901 total
$
```

...the Crystal run is 4x as fast as running this very same code with the Ruby interpreter!!!! (oh and I am not even compiling this code usign the Crystal `--release` tag; more on this in a later post)

And in this short bit, I hope you now understand why my favorite feature (goal) of the Crystal programming language (most when compared to Ruby) is the compiling of source code to native code and the efficiency that accompanies such process.

### Explore Crystal, here are some resources
- [Book: Crystal Programming][6]
- [Official Crystal language getting started guide][7]
- [Official Crystal language online playground][8]
- [Advanced: Official Crystal language documentation resources][9]

Thanks for reading.

[1]: https://news.ycombinator.com/item?id=31628293
[2]: https://medium.com/@mario.arias.c/comparing-implementations-of-the-monkey-language-viii-the-spectacular-interpreted-special-ruby-2f9e4ed2e660
[3]: https://medium.com/@mario.arias.c/comparing-implementations-of-the-monkey-language-iv-here-comes-a-new-challenger-crystal-2dd565071820
[4]: https://crystal-lang.org
[5]: https://github.com/crystal-lang/crystal
[6]: https://forum.crystal-lang.org/t/book-crystal-programming/4639
[7]: https://crystal-lang.org/reference/1.4/getting_started/
[8]: https://play.crystal-lang.org/#/cr
[9]: https://github.com/crystal-lang/crystal#documentation
[10]: https://github.com/crystal-lang/crystal/issues/830
[11]: https://crystal-lang.org/api/1.4.1/String.html#upcase%28options%3AUnicode%3A%3ACaseOptions%3D%3Anone%29%3AString-instance-method
[12]: https://crystal-lang.org/reference/1.4/syntax_and_semantics/types_and_methods.html
[13]: https://crystal-lang.org/reference/1.4/guides/testing.html