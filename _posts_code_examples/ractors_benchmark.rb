#!/usr/bin/env ruby -W0

require 'benchmark'

puts "\n### I/O like benchmark ###"

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

puts "\n### strictly CPU benchmarks ###"

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