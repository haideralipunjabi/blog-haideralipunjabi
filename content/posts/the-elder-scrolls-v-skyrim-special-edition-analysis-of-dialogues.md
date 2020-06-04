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

I am going to look into other data I can extract this way, and maybe make some other stuff.

### Processing the data

In the CSV, there were two columns of data I was interested in **RESPONSE TEXT** & **TOPIC TEXT**. Response Text was the larger one, with over 40k unique dialogues. Topic Text had only around 5.5K unique dialogues and also needed some additional processing. Topic Text contained some game constants such as `RoomCost` , `HorseCost`, and other prices, which had to be filtered out. I did all that in `csv_to_json.py`. Here's the code for it:

### Counting the Words

Like the [previous visualisation](),  I used [nltk']()s stopwords corpus, along with a modified version of [20k most common words by Google](https://github.com/first20hours/google-10000-english). Interestingly, the modifications I did for Harry Potter were valid for Skyrim as well, because there is no dialogue with names like Harry, Ron, Arthur, etc and they share words like vampires, magic, etc.

I counted both RESPONSE TEXT & TOPIC TEXT data separately and then merged them into a single file count.json

_Additional Tip:_ [_progress_](https://pypi.org/project/progress/) _is a great Python Package to show progress in your scripts._

Here's the code I used for counting:

### Making the WordCloud

I used pretty much the same process as the last visualisation. I changed the maximum font size to depict the variation properly and used a custom font this time. 

To make the WordCloud, I used the [wordcloud](https://amueller.github.io/word_cloud/) package. For the mask, I used [Skyrim Logo Vector](https://www.nexusmods.com/skyrim/mods/68054). For the font, I used [Sovngarde](https://www.nexusmods.com/skyrimspecialedition/mods/386) font.

Here's the code for the wordcloud:

### Making the Graph

I initially planned on making a set of graphs from the data.