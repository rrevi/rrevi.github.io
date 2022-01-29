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

# using Ractor
ractor = Ractor.new do
    msg_in_ractor = receive
    puts msg_in_ractor
end
ractor.send msg
ractor.take

# using Ractor
ractor = Ractor.new do
    loop do
        received = receive
        if received.empty? 
            close_incoming
            Ractor.yield "Finished."
        else
            puts received
        end
    end
end
ractor.send msg
ractor.send "some other message"
ractor.send ""
ractor.take

# using Ractor (error)
ractor = Ractor.new { puts msg }
ractor.take