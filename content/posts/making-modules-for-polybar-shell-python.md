+++
date = "2019-06-27T13:30:00+00:00"
draft = true
images = []
other_blogs = []
tags = ["polybar", "linux", "python", "shell"]
title = "Making modules for Polybar (Shell + Python)"

+++
### Background

I started using [Manjaro i3](https://manjaro.org/download/i3/ "Manjaro i3") back in December 2018, after 3 years of Ubuntu and one unsuccessful attempt at installing Arch. Being a long time lurker of [r/unixporn](https://reddit.com/unixporn "r/unixporn"), I knew what I had to do. After learning the ropes of Manjaro, the first thing I worked on was ricing my installation.

I initially installed [Polybar](https://github.com/polybar/polybar "Polybar") with some config I found on [r/unixporn](https://reddit.com/unixporn "r/unixporn"). A few weeks later, [u/adi1090x](https://reddit.com/user/adi1090x "u/adi1090x") [posted on Reddit](https://www.reddit.com/r/unixporn/comments/ac5ggg/oc_polybar_themes_with_19_material_accent_colors/) his beautiful [polybar themes](https://github.com/adi1090x/polybar-themes). I immediately fell in love (being a huge material fan) and started using them. 5 months later, I still use v2 of his themes.

In his work, he had used [rofi](https://github.com/davatorium/rofi) to act as a drop down for polybar. Many think that I came up with it, but I first saw it in [u/adi1090x](https://reddit.com/user/adi1090x "u/adi1090x") 's work.

Since I was using polybar, [indicator-kdeconnect](https://github.com/Bajoja/indicator-kdeconnect) wasn't working for me. It was an important part of my daily usage, and I missed it a lot. After coming up with no way of using it with polybar, I decided to look into making one of my own, thereby starting my journey into polybar modules.

### polybar-kdeconnect v1

I started by learning how polybar modules work. Any script (python,bash,etc) that can be executed in a shell can be used as a module. The output of the script is what is shown in polybar. Polybar also allows to execute scripts on events such as `click`, `right-click` etc.

The [v1 of my kdeconnect]() module was very simple. A script that used kdeconnect-cli (part of [kdeconnect]()) to check whether a device was connected or not, and show an icon based on that. It didn't support multiple devices, and the only way was to create copies of the module.

After [sharing that on reddit](https://www.reddit.com/r/unixporn/comments/ajz7km/oc_kdeconnect_module_for_polybar/), I received lots of feedback, suggestions and ideas to improve the module.

A day later, I had implemented different colours for different battery levels.

After learning about polybar modules a bit more (I will link to the resources at the end), I was ready to give the kdeconnect module another shot. The v2 was entirely different to v1, so much so that I had to rewrite the whole (60 lines approx.) module.

### polybar-kdeconnect v2

Two weeks after v1, I release the [polybar-kdeconnect v2](https://github.com/HackeSta/polybar-kdeconnect/tree/3e4e2df87b01b6f86773d0ab0e376c87f9b022f0). Among the many improvements, the following were the most important

* no dependency on kdeconnect-cli
* Multiple Device support with extra config
* Parinig / Unpairing from the module
* Single script

The best improvement was adding multiple device support. It worked by going over every device kdeconnect knows, which were of 3 types

* Connected (Reachable & Trusted)
* Not Connected (Not Reachable & Trusted)
* Available (all that were left)

Based on their type, the script would append an icon with a separator to an output string. After all devices were checked, the output string would be printed (echoed??) and displayed on polybar.  
To make every icon clickable separately, I used [action format tags]() (the %{A} things in the code).   
Action format tags work by executing some command. Since I couldn't call a function by its name directly, this script wasn't loaded in the environment the action tag used the command, I had to source my script and then call the function and pass the parameters.

Here's the appending to output part

    devices+="%{A1:. $DIR/polybar-kdeconnect.sh; show_pmenu $devicename $deviceid $:}$icon%{A}$SEPERATOR"

_Note that this isn't what my final code looks like_ 