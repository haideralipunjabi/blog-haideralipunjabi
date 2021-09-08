+++
date = ""
description = ""
draft = true
images = []
other_blogs = []
tags = []
title = "Dynamic Twitter Header using Python"

+++
Twitter Headers are a craze among the tweeps of Tech Twitter, especially the ones "Made With CSS". Even though I am fairly comfortable with CSS, I lack the creativity to make a good CSS header with it, and near impossible to make anything on par with the CSS geniuses there. (Check out [@Prathkum](https://twitter.com/Prathkum), he is a CSS Wizard and one of the inspirations behind my header projects).

Since "Made With CSS" wasn't possible, I decided to take a different route. **Python**. Python is something I use daily, from automating simple tasks to making bots for my amusement. Given my love for Python, it was the obvious choice for my _Twitter Header Experiments_.

The first one I made was similar to the one I will explain in this blog. It displayed my Twitter Statistics (Followers, Following, No. of Tweets, Lists I am on, My Twitter Age, etc). Even though it was cool and something that I used for a month or so, I later changed it to a humourous cryptocurrency one.

The second one like I said, was a cryptocurrency joke which updated the USD rates every minute. (I have that [same joke on Reddit](https://www.reddit.com/user/dJones176/comments/npoq3f/a_boy_asked_his_bitcoininvesting_dad_for_1/)). I used this header for a while but later changed it to some static image.

Then, a couple of days ago I saw a cool "Made With CSS" header and thought about making another dynamic one. I also realised that I hadn't made a tutorial about it. So, here I am, killing two birds with one stone.

## The Idea

The idea is really simple, make a Dynamic Twitter Header that display's the likes and retweets of the Tweet announcing the header. Since the header will change when users interact with the Tweet, the user