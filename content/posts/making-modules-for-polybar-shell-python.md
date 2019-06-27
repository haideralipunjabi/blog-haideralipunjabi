+++
date = "2019-06-27T13:30:00+00:00"
draft = true
images = []
other_blogs = []
tags = ["polybar", "linux", "python", "shell"]
title = "Making modules for Polybar (Shell + Python)"

+++
I started using [Manjaro i3](https://manjaro.org/download/i3/ "Manjaro i3") back in December 2018, after 3 years of Ubuntu and one unsuccessful attempt at installing Arch. Being a long time lurker of [r/unixporn](https://reddit.com/unixporn "r/unixporn"), I knew what I had to do. After learning the ropes of Manjaro, the first thing I worked on was ricing my installation. 

I initially installed [Polybar](https://github.com/polybar/polybar "Polybar") with some config I found on [r/unixporn](https://reddit.com/unixporn "r/unixporn"). A few weeks later, [u/adi1090x](https://reddit.com/user/adi1090x "u/adi1090x") [posted on Reddit](https://www.reddit.com/r/unixporn/comments/ac5ggg/oc_polybar_themes_with_19_material_accent_colors/) his beautiful [polybar themes](https://github.com/adi1090x/polybar-themes). I immediately fell in love (being a huge material fan) and started using them. 5 months later, I still use v2 of his themes.

In his work, he had used [rofi](https://github.com/davatorium/rofi) to act as a drop down for polybar. Many think that I came up with it, but I first saw it in [u/adi1090x](https://reddit.com/user/adi1090x "u/adi1090x") 's work.

Since I was using polybar, [indicator-kdeconnect](https://github.com/Bajoja/indicator-kdeconnect) wasn't working for me. It was an important part of my daily usage, and I missed it a lot. After coming up with no way of using it with polybar, I decided to look into making one of my own, thereby starting my journey into polybar modules.