#!/usr/bin/env ruby

def calculate_gcd(a, b)
    remainder = a % b
    if remainder > 0
        return calculate_gcd(b, remainder)
    else
        return b
    end        
end

puts calculate_gcd 10, 2
puts calculate_gcd 10, 5
puts calculate_gcd 10, 10
puts calculate_gcd 10, 3
puts calculate_gcd 3, 10
puts calculate_gcd 252, 24
puts "now using random generated numbers..."
puts calculate_gcd rand(1..256), rand(1..256)