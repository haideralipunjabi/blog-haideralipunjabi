+++
date = 2020-06-04T13:30:00Z
description = "How I made a WordCloud for most occurring word in The Elder Scrolls V: Skyrim Special Edition"
draft = true
images = []
other_blogs = []
tags = ["skyrim", "games", "data", "python", "visualisation"]
title = "The Elder Scrolls V: Skyrim Special Edition - Analysis of Dialogues"

+++
### Background

After [my last visualisation of Harry Potter data](https://blog.haideralipunjabi.com/posts/harry-potter-books-fanfiction-an-analysis-of-words/), I decided to use some other data to create word clouds. I am a huge Skyrim fan and always wanted to learn how to use xEdit Scripts. As a result, here I am with another Word Cloud.

_Disclaimer: A lot of the code is shared between_ [_my previous_](https://blog.haideralipunjabi.com/posts/harry-potter-books-fanfiction-an-analysis-of-words/) _project and this one_

### Getting the data

I don't like opening my Windows installation (I have a dual boot setup, and use Manjaro mainly), and looked around the internet for some sort of data dump of Skyrim Dialogues. Unfortunately, I couldn't find any and then decided to extract the data myself. I had recently formatted my Windows Partition so had to reinstall the game. It also provided the benefit that no mods would pollute the data. (I had over 150 mods before the format). I downloaded the latest [xEdit](http://tes5edit.github.io/) and used the `Export dialogues.pas` script that comes with it to export all the dialogues. (It took me 22:05 minutes).