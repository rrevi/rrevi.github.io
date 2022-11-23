---
published: true
layout: post
title: 'Perfomance: Intel 8th vs 12th generation'
intro: Let's compare the performance between a Intel 8th gen PC and a 12th gen PC
---

Much like in my [previous post][0], on the performance comparison between a model year 2018 Intel based MacBook Pro versus a model year 2021 Apple Silicon (M1) MacBook Pro, the 12th generation of Intel CPUs and SoC are a major leap in performance versus hardware that is only a few years old, like a 8th generation Intel CPU and chipset.

From a software developer's perspective, let's compare the performance of running some commands with the following set of hardware.

### The Hardware

Spec               | Lenovo ThinkCentre M90n    | Lenovo IdeaPad 5            | 14" MacBook Pro
------------------ | -------------------------- | --------------------------- | ----------------
Model Year         | 2019                       | 2022                        | 2021
Chipset Gen        | 8th                        | 12th                        | 1st
CPU                | Intel Core i5-8365U 4-core | Intel Core i7-1255U 10-core | M1 Pro 8-core
Graphics           | Intel UHD 620              | Intel Iris Xe (96 EUs)      | M1 Pro 14-core
RAM                | 8GB DDR4-2666              | 16GB DDR4-3200              | 16GB
Storage (SSD)      | 512GB                      | 512GB                       | 512GB
Wi-Fi              | 802.11ac                   | 802.11ax                    | 802.11ax

For more hardware technical details:
- [Lenovo ThinkCentre M90n][1]
- [Lenovo IdeaPad 5][2]
- [14" MacBook Pro][3]

### The Software

Spec            | Lenovo ThinkCentre M90n    | Lenovo IdeaPad 5            | 14" MacBook Pro
--------------- | -------------------------- | --------------------------- | ----------------
OS              | Windows 11                 | Windows 11                  | macOS

For the Intel based Lenovo machines, the commands mentioned in the performance sections below were run in Ubuntu on [WSL][4].

### The Intel 12th gen

Command                | Balanced, Battery | Performance, Battery | Performance, AC
---------------------- | ----------------- | -------------------- | ----------------
Install Ruby 3.0.x     | 208s              | 196s                 | 150s
Install Python 3.9.x   | 94s               | 85s                  | 71s
Build a Docker project | 19s               | 17s                  | 15s

Notice the relatively linear progression in performance from running in Balanced to Performance power mode. More importantly, notice the significant jump in performance gain when going from running on battery to AC power!

### The Intel 8th vs 12th gen

The values below are in performance power mode and on AC power.

Command                | Lenovo ThinkCentre M90n | Lenovo IdeaPad 5
---------------------- | ----------------------- | ----------------
Install Ruby 3.0.x     | 257s                    | 150s
Install Python 3.9.x   | 125s                    | 71s
Build a Docker project | 21s                     | 15s

I hope this section is self-explanatory. As in, your jaw should have dropped to the floor right about now!

On average, the Intel 12th gen based IdeaPad 5 is **1.6x** faster than the Intel 8th gen based ThinkCentre m90n!!

In other words, on average, the Intel 12th gen based IdeaPad 5 is about **40%** faster than the Intel 8th gen based ThinkCentre m90n!!

### The Intel 12th gen vs Apple 1st gen (M1 Pro)

Command                | Lenovo IdeaPad 5 | 14" MacBook Pro
---------------------- | ---------------- | ----------------
Install Ruby 3.0.x     | 150s             | 144s
Install Python 3.9.x   | 71s              | 54s
Build a Docker project | 15s              | 12s

To some of you, this might be the most interesting section in this entire blog. Where you gain some insight on how does a Intel 12th gen based PC compare to a Apple M1 Pro. As you can see, a 12th gen based PC performs very close to that of a Apple M1 Pro.  

Thanks for reading.

[0]: /2021-macbook-pro-is-fast
[1]: https://psref.lenovo.com/Detail/ThinkCentre_M90n1_Nano?M=11AD0021US
[2]: https://psref.lenovo.com/Detail/IdeaPad/IdeaPad_5_15IAL7?M=82SF000NUS
[3]: https://support.apple.com/kb/SP854?viewlocale=en_US&locale=en_US
[4]: https://learn.microsoft.com/en-us/windows/wsl/about