+++
date = ""
draft = true
images = []
other_blogs = []
tags = []
title = "Making HPFanfiction Recommender"

+++
## Background

I have been reading Harry Potter Fan-fiction since late 2017. Around mid 2018, finding more stories became very difficult and I started finding story suggestions in the [HPFanfiction subreddit](https://reddit.com/r/HPFanfiction). After a couple of months, [a fic recommendation tool was posted in the subreddit](https://www.reddit.com/r/HPfanfiction/comments/9pw53f/a_lot_of_people_liked_the_fic_recommender_i/). It was based on some previous research & data (I will link to all related stuff in the end of the post).  It basically worked by comparing the user who like two different fics and generating a similarity score.  This tool (and its maker ElusiveGuy) was a huge inspiration behind my tool, and I initially hoped to use the same method but with a larger database (I have dabbed in the art of web scraping a bit).

## Initial Plans

As I said, my initial plan (around December 2018) was to collect much more data than what ElusiveGuy's tool was using. I knew fanfiction.net didn't like scraping scripts, but I only wanted the metadata of the stories, not the stories themselves. I also planned on making a request every 2-3 seconds so that their server didn't face any issues.

The problem with this plan was that their was no way of getting the list of users who like a particular story. You could only get the stories which a particular user liked ([vir_innominatus](https://www.reddit.com/user/vir_innominatus/), the guy who collected the data had a list of users from some previous analysis which he used). I might be able to pull this of now because I also have a huge list (7.5k +) of authors now. 

I had to give up on this plan and shelved the project, until inspiration stuck.

## Straightforwardness with the straightforward, crookedness with the crooked

In July 2019, inspiration stuck while I was researching Reddit bots, [reddit-ffn-bot](https://github.com/tusing/reddit-ffn-bot) specifically. It gave me an idea of a completely different approach to the problem. I know I couldn't scrape fanfiction.net properly, but I could scrape Reddit. 