---
published: true
layout: post
title: "CPUs are fast, but GPUs are faster!"
intro: Let's compare CPU vs GPU performance
---

Using the [Julia programming language][0], specifically while working through this [introduction to GPU programming with Julia][1], let's compare the performance (in time) of running the same computation sequentially on the CPU, in parallel on the CPU and in parallel on the GPU.

But before we continue, here are specs of the computer system we are running on:

![fastfetch_screenshot](/assets/images/julia-fastfetch.png "Computer System information using fastfetch")

Here are the sequential and parallel results on the CPU:

![julia_cpu_screenshot](/assets/images/julia-cpu.png "Julia CPU Performance")

and here is the same computation being run on the GPU (using [OpenCL][2]):

![julia_gpu_screenshot](/assets/images/julia-gpu.png "Julia GPU Performance")

...here is a table format of the results:

|                 | Time      |
| --------------- | --------- |
| Sequential, CPU | 183.325μs |
| Parallel, CPU   | 55.475μs  |
| Parallel, GPU   | 2.701μs   |

...WOW is the GPU fast!

...and go [read][3] some history on what made this all possible.

Thank you Julia programming language community and ecosystem for making all this possible (and very enjoyable).

[0]: https://julialang.org/
[1]: https://cuda.juliagpu.org/stable/tutorials/introduction/
[2]: https://github.com/JuliaGPU/OpenCL.jl
[3]: https://github.com/JuliaGPU/OpenCL.jl/issues/324#issuecomment-2993882134
