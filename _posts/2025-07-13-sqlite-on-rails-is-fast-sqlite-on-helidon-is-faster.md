---
published: true
layout: post
title: "SQLite on Rails is fast, but SQLite on Helidon is faster!"
intro: Let's compare requests per second performance of a modern Ruby on Rails app vs a modern Java on Helidon app
---

### Brief history

At some point at the end of 2024, I ran into [SQLite on Rails][0] by [@fractaledmind][1]. Considering my fondness of Ruby and of Ruby on Rails, I was very excited by this article (and the rest of the Ruby on Rails community's continued effort to simplify both the dev experience and the prod experience). Along with this article, I then walked through the exercises in the [wrocloverb-2024][2] repo. Some time later, I then also walked through workshop exercises in the [railsconf-2024][3] repo.

Out of the excitement for the performance improvements of Ruby on Rails + SQLite, I then remebered having read [Helidon Níma — Helidon on Virtual Threads][4] by the Helidon team even earlier sometime in 2023. This is what I call Java on Helidon. Which got me thinking, what would the benchmark performance of Helidon on Virtual Threads + SQLite be like? (call it SQLite on Helidon)

But before we continue, here are specs of the computer system we are running on:

![fastfetch_screenshot](/assets/images/julia-fastfetch.png "Computer System information using fastfetch")

...with that out of the way...

### SQLite on Rails

Here are the requests/second benchmark results of the Ruby on Rails app (having gone through steps 1 through 3 of the [workshop][5]):

![ruby_on_rails_benchmark_screenshot](/assets/images/ruby-on-rails-http-benchmark-performance.png "SQLite on Rails Benchmark Performance")

### SQLite on Helidon

and here are the requests/second benchmark results of the about equivalent [SQLite on Helidon (SE edition) app][6]:

![java_on_helidon_benchmark_screenshot](/assets/images/java-on-helidon-http-benchmark-performance.png "SQLite on Helidon Benchmark Performance")

...here is a table format of the results:

|                   | Requests per Second |
| ----------------- | ------------------- |
| SQLite on Rails   | 366                 |
| SQLite on Helidon | 19,628              |

...WOW is Java + Helidon fast!

Some notes:

- If you look at the `oha` tool command difference between the two screenshots above, you will see that on the Ruby on Rails command I am using HTTP method `POST`, where as on the Java + Helidon app I am using the HTTP `GET` method. Anyone wise enough might wonder well on the Ruby on Rails app you are `writing` to the DB whereas on the Java + Helidon app you are `reading`. I assure you, this is not the case. The reason for the difference in HTTP method use is just an implementation detail of the Ruby on Rails app. There is no SQL writing in neither command. Just a simple read from the DB.
- If you read the bullet just above, you might also wonder, did the SQLite on Helidon app even have data in the SQLite database, I assure this was the case, since I executed the following `oha` command first to populate it:

  ```
  $ oha -c 10 -z 10s -m PUT http://localhost:8080/library/benchmark/book
  ```

  and here are the row counts for their respective databases:

  ```
  $ sqlite3 /tmp/library.db
  SQLite version 3.50.2 2025-06-28 14:00:48
  Enter ".help" for usage hints.
  sqlite> select count(*) from library
    ...> ;
  98986
  sqlite> .exit
  $
  ```

  ```
  $ sqlite3 ~/Github/railsconf-2024/storage/production.sqlite3
  SQLite version 3.50.2 2025-06-28 14:00:48
  Enter ".help" for usage hints.
  sqlite> select count(*) from posts;
  80703
  sqlite> .exit
  $
  ```

  ... but in reality, the row count is irrelevant since both apps (endpoints in use for benchmarking) use a limit of `100` in their SQL select statements.

Notes aside, there is a lot to unpack here (but I won't cover it all here).

Seeing a Ruby on Rails app with SQLite as the database successfully and consistently run at close to 400 requests per second is very exciting. However, seeing a Java on Helidon app with SQLite as the database run close to 20k requests per second is just 🤯. **This all makes me wonder, is the beauty of Ruby (and Rails) worth the (performance) price?**

That's all! Thanks for reading.

[0]: https://fractaledmind.github.io/2024/04/15/sqlite-on-rails-the-how-and-why-of-optimal-performance/
[1]: https://github.com/fractaledmind
[2]: https://github.com/fractaledmind/wrocloverb-2024
[3]: https://github.com/fractaledmind/railsconf-2024
[4]: https://medium.com/helidon/helidon-n%C3%ADma-helidon-on-virtual-threads-130bb2ea2088
[5]: github.com/fractaledmind/railsconf-2024/tree/workshop/workshop
[6]: https://github.com/rrevi/sqlite-on-helidon-quickstart-se
