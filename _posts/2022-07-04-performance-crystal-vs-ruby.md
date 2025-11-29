---
published: true
layout: post
title: "Performance: Crystal vs Ruby"
intro: In this post, let's compare the run performance of a bubble sort script with Crystal and Ruby
---

**update on July 4, 2022:** added crystal and ruby version terminal outputs below

```
$ crystal --version
Crystal 1.4.1 (2022-04-22)

LLVM: 13.0.1
Default target: aarch64-apple-darwin21.5.0
$
```

```
$ ruby --version
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [arm64-darwin21]
$
```

### Refresher about Crystal and Ruby

In my previous [post][1], I introduced the Crystal programming language, and additionally compared it some to it's major influence, the Ruby programming language.

In this post, I want to compare and contrast their runtime performance. Yes, this topic is awesome enough (to mean they differ enough in performance) to deserve it's own post!

We'll be comparing the runtime performance of the same source code. This is so cool. You'll almost never find two different programming languages where you can run the same source code on. Of course, in real-world applications, this will almost certainly never be the case, as a real-world application will almost always contain enough code that at some point they will just plain out differ in syntax (e.g. when using third-party dependencies).

Let's get to some code and run it!

### Code

Please take this code lightly, it is primarily written to be easy to read and for educational purposes.

```crystal
# bubble_sort_performance.cr

list = (1..1000).to_a.reverse

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
```

In this code, we bubble sort an array (list) of numbers that are in from greatest to least in order to from least to greatest in order (which is to say the worst possible case scenario in run complexity because every element needs to be moved).

Let's now run this code with Crystal and with Ruby...

### Run Performance

`ruby` vs `crystal run` vs `crystal build` vs `crystal build --release`

Here is the summary of runtime performances:

| execution type          | time (in seconds) |
| ----------------------- | ----------------- |
| ruby                    | 11.818            |
| crystal run             | 02.371            |
| crystal build           | 01.811            |
| crystal build --release | 00.303            |

Let's dive in a bit into each of these execution runtime performances...

```
$ time ruby src/bubble_sort_performance.cr
ruby src/bubble_sort_performance.cr  11.55s user 0.21s system 99% cpu 11.818 total
```

Above, we run the bubble sort code using the `ruby` interpreter, and we see it takes 11.818 seconds to interpret and run. This is our baseline performance value to compare with Crystal runs.

```
$ time crystal run src/bubble_sort_performance.cr
crystal run src/bubble_sort_performance.cr  2.28s user 0.15s system 102% cpu 2.371 total
```

Above, we run the bubble sort code using the `crystal run` command, where it builds and runs the resulting binary file in one command, and it takes 2.371 seconds to do so! That's **4.98x** as fast as the `ruby` interpreter run!! Remember this includes the build time, which is to say this is just an alias and helper command to be used during development and testing activities.

Now imagine if we removed the build process and only measure the run time of the resulting binary file?! ...

```
$ crystal build src/bubble_sort_performance.cr
-rwxr-xr-x   1 rrevi  staff   1.3M Jul  4 07:40 bubble_sort_performance
$ time ./bubble_sort_performance
./bubble_sort_performance  1.80s user 0.01s system 99% cpu 1.811 total
```

Above, first we `crystal build` a binary file from source, and notice that the resulting binary file is 1.3 megabytes in disk size. Next, we run said binary file, and it only takes 1.811 seconds to run! That's **6.52x** as fast as the `ruby` interpreter run!!

For as fast as exclusively running the build execution binary file is, now imagine if during the build process we add compiler optimization flags, as if we were building for running in a production environment?! ...

```
$ crystal build --release src/bubble_sort_performance.cr
-rwxr-xr-x   1 rrevi  staff   331K Jul  4 07:51 bubble_sort_performance
$ time ./bubble_sort_performance
./bubble_sort_performance  0.12s user 0.01s system 42% cpu 0.303 total
```

And finally, above, we first build with a release flag `crystal build --release`, read more about release building [here][2]. Also, from building with the release flag, notice that the disk size of the resulting binary file is only 331 kilobytes! That is only **23%** the size of not using release optimizations!! Next, we run the resulting binary file, and here we see it only takes 0.303 seconds to run!!! Talk about fast!!!! That is **39x** as fast as running with the `ruby` interpreter!!!!! I am speechless. I hope you are as amazed and in disbelieve as I am. (and bonus thing to point out: notice how in this case, it only uses **42%** of the CPU; now go compare that to the other runtime performances)

### Takeaway

There are many takeaways from walking through the runtime performance of a Crystal program (and more so when compared to a computer language like Ruby, it's main influence, well syntactically speaking), but there is really one ☝🏽 that I hope you go away with from this post: **As much as the Crystal programming language is a language for humans (read Ruby like syntax), it is as much a language for computers!** (read better utilization of the computer, hence the fast runtime speeds in this post).

Thanks for reading.

[1]: /about-the-crystal-programming-language
[2]: https://crystal-lang.org/reference/1.4/using_the_compiler/index.html#release-builds
