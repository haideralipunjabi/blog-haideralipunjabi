+++
date = 2020-06-01T13:30:00Z
description = "Graphs and WordCloud based analysis of Most Occurring Words in Harry Potter Books and popular Fanfiction Stories"
draft = true
images = []
other_blogs = []
tags = []
title = "Harry Potter Books & Fanfiction - An Analysis of Words"

+++
### Background

On 28th May, [a post on r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/comments/gs4me1/oc_word_cloud_comparison_between_user_comments_on/) inspired me to learn how to make Word Clouds myself. Being a huge Harry Potter fan, the data I was going to use was obvious. Using the Books seemed too simple so I decided to scrape 250 stories from [Fanfiction.net](http://fanfiction.net/) , and make a Word Cloud from that data. I posted [my first attempt on r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/comments/gtxzx8/oc_frequently_occurring_words_in_top_250_harry/), and based on the feedback I received, I decided to write this blog.

The entire source code (except the data files & output files) is available here

### Attempt 1

There are many approaches I could have taken to prepare the data. I decided to download the stories first and then do the processing on the local files due to my slow & unreliable internet.

#### Scraping Fanfiction

I used simple Python + BeautifulSoup combination to scrape the stories form  [Fanfiction.net](http://fanfiction.net/). I sorted the stories based on their Favorite Count, and filtered them to stories having more than 100k words. ([Link to the URL](https://www.fanfiction.net/book/Harry-Potter/?&srt=4&r=10&len=100&p=1)). I scraped first 10 pages, (each page has 25 stories) resulting in 250 stories. It took me a total of 10 hours (7 on one day, and 3 on the next) to scrape all the stories.

#### Processing the Data

Taking hints from the [original post](), I used nltk to tokenize the stories, and removed the common words from the nltk English Stopwords Corpus. This was my first attempt at doing anything like this, and the process was taking 3-4 minutes per story initially. After some optimization, I was able to reduce the time to 1-2 minutes per story. I talked to a friend about the problem, and he suggested me to try multiprocessing. After adding multiprocessing, I had the idea of distributing the load over two CPUs (my laptop and a Raspberry Pi 4B). I copied the script and 25% of the stories over to the Pi and started the job. 

_Additional Tip:_ [_screen_](https://www.geeksforgeeks.org/screen-command-in-linux-with-examples/) _is a good utility to do long jobs over SSH_

It took me an hour to the processing. I didn't want to do the processing again if I needed to remove some more words so I decided to store the word frequency data into json files. (Really helpful in future)

#### Making the Word Cloud

I took a look at [wordcloud Python Package](https://github.com/amueller/word_cloud) and copied the code from its examples to generate the word cloud.