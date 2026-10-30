---
published: true
layout: post
title: "Middleware: Crystal Edition"
intro: Let's compare how to develop middleware for some of Crystal's Web app frameworks
---

A as a Web software developer (mostly back-end or full-stack), often we have to intercept requests as they come in or intercept responses before they finally go out (to the client), and do some level of work during said interception.

On a request, you might have to check for HTTP headers as you validate the request, or add HTTP headers as you prepare the request for the next middleman in the processing of the request.

On a response, you might add HTTP headers to help the client process it or optimize the response, say to minimize impact on the network.

This is all to say, that as a Web software developer, you will find yourself writing middleware for your Web app regularly. With that in mind, let's very briefly explore the different ways middleware is written in some of the most popular Web frameworks in the Crystal programming language ecosystem.

### HTTP via Standard Library API

At the most basic level, to build a HTTP server in Crystal, you can use the language's standard library API via the [HTTP module][0]:

```ruby
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world!"
end

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

With a HTTP server, to build any middleware, you will have to add a custom [Handler][1]:

```ruby
# http_custom_handler.cr

require "http/server/handler"

class CustomHandler
  include HTTP::Handler

  def call(context)
    # log to stdout
    puts "Doing some stuff"

    # call the next handler
    call_next(context)
  end
end
```

Together, it looks like so:

```ruby
require "http/server"
require "http/server/handler"

class CustomHandler
  include HTTP::Handler

  def call(context)
    # log to stdout
    puts "Doing some stuff"

    # call the next handler
    call_next(context)
  end
end

server = HTTP::Server.new [
  CustomHandler.new
  ], do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world!"
end

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

and when you run this server code, it yields the following outputs of the client <-> server interactions:

Server output:

```
$ crystal run http_custom_handler.cr                                                                               ✔   4s
Listening on http://127.0.0.1:8080
Doing some stuff
```

Client output:

```
$ curl http://localhost:8080/
Hello world!%
```

### Athena

A popular Web framework in the Crystal ecosystem is [Athena][2]. In Athena, to create [middleware][3], you will want to use the [Event Dispatcher][4] by listening for HTTP events (requests, responses, etc.) like so:

```ruby
require "athena"

@[ADI::Register]
class CustomListener
  include AED::EventListenerInterface

  # Specify that we want to listen on the `Response` event.
  # The value of the hash represents this listener's priority;
  # the higher the value the sooner it gets executed.
  def self.subscribed_events : AED::SubscribedEvents
    AED::SubscribedEvents{ATH::Events::Response => 25}
  end

  def call(event : ATH::Events::Response,
            dispatcher : AED::EventDispatcherInterface) : Nil
    event.response.headers["FOO"] = "BAR"
  end
end

class ExampleController < ATH::Controller
  get "/" do
    "Hello World"
  end
end

ATH.run

# GET / # => Hello World (with `FOO => BAR` header)
```

When comparing the use of Athena to build middleware to that of using the standard library's HTTP module, notice the use of Crystal [annotations][5] in Athena (to register event listeners) as opposed to not so in the standard library HTTP module.

### Kemal

What [Sinatra][6] is to Ruby, [Kemal][7] is to Crystal.

In Kemal, to build [middleware][8], you (also) use Handlers:

```ruby
class CustomHandler < Kemal::Handler
  def call(context)
    puts "Doing some custom stuff here"
    call_next context
  end
end

add_handler CustomHandler.new
```

Notice how much this is like when using the Crystal standard library's HTTP module.

### Amber

What [Ruby on Rails][9] is to Ruby, [Amber][10] is to Crystal.

In Amber, to build middleware, you use [Pipelines][11]:

```ruby
# amber_app_root/config/routes.cr

class CustomHandler
  include HTTP::Handler

  def call(context)
    context.response.headers.add("X-Custom-Header", "Some Value")
    call_next(context)
  end
end

Amber::Server.configure do |app|
  pipeline :web do
    # Plug is the method to use connect a pipe (middleware)
    # A plug accepts an instance of HTTP::Handler
    # plug Amber::Pipe::Params.new
    plug Amber::Pipe::Logger.new
    plug Amber::Pipe::Flash.new
    plug Amber::Pipe::Session.new
    plug Amber::Pipe::CSRF.new

    # Plug in a custom handler (a.k.a pipe)
    plug CustomHandler.new
  end

  # All static content will run these transformations
  pipeline :static do
    plug HTTP::StaticFileHandler.new("./public")
    plug HTTP::CompressHandler.new
  end

  routes :web do
    get "/", HomeController, :index
  end

  routes :static do
    get "/*", Amber::Controller::Static, :index
  end
end
```

In Amber, just like in Kemal, you need to use the Handler class from the HTTP module to create your custom middleware (alternatively, you can use the [base class][12] from the Amber pipe module, like the [PoweredByAmber][13] pipe does).

### In Conclusion

With the exception of Athena (where you need to use Crystal annotations to listen for events), the most popular Web frameworks in the Crystal language ecosystem use the very straight forward Handler class from the HTTP module to intercept HTTP requests and responses. Simple enough for me (to build middleware with).

Thanks for reading.

[0]: https://crystal-lang.org/api/1.6.2/HTTP.html
[1]: https://crystal-lang.org/api/1.6.2/HTTP/Handler.html
[2]: https://athenaframework.org/
[3]: https://athenaframework.org/getting_started/advanced_usage/#middleware
[4]: https://athenaframework.org/components/event_dispatcher/
[5]: https://crystal-lang.org/reference/1.6/syntax_and_semantics/annotations/index.html
[6]: https://sinatrarb.com/
[7]: https://kemalcr.com/
[8]: https://kemalcr.com/guide/#middleware
[9]: https://rubyonrails.org/
[10]: https://docs.amberframework.org/amber/
[11]: https://docs.amberframework.org/amber/guides/routing/pipelines
[12]: https://github.com/amberframework/amber/blob/master/src/amber/pipes/base.cr
[13]: https://github.com/amberframework/amber/blob/master/src/amber/pipes/powered_by_amber.cr
