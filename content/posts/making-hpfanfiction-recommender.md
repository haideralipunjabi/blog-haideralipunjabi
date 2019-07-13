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

In July 2019, inspiration stuck while I was researching Reddit bots, [reddit-ffn-bot](https://github.com/tusing/reddit-ffn-bot) specifically. It gave me an idea of a completely different approach to the problem. I know I couldn't scrape fanfiction.net properly, but I could scrape Reddit. My new idea was to scrape the [HPFanfiction subreddit](https://reddit.com/r/HPFanfiction) and collect data on what people were recommending. This idea had a merit, I knew, but I had to learn how to scrape Reddit properly. 

## PRAW

I had seen many projects use [PRAW]() to work with Reddit. I also thought of doing the same, and it looked pretty easy. After making a basic scrapper using PRAW, I encountered a big problem. I could only access 1000 posts in the subreddit. It would have created a smaller database than what I had hoped for. Yes, it would have grown over time, but I didn't like it. I kept the PRAW approach as a backup. I knew there were many huge databases of Reddit data, but filtering them for comments by one particular user ([u/FanfictionBot](https://www.reddit.com/user/FanfictionBot/)) would have been difficult. In my search, I came across a gold mine of Reddit data.

## pushshift.io

After browsing the internet for a while, I came across [pushshift.io](https://pushshift.io), which shows various Reddit related statistics along with a great API of a huge amount of Reddit Data. The API could give me sorted comments from [u/FanfictionBot](https://www.reddit.com/user/FanfictionBot/) since June 2015. 4 years of data. This is what I was looking for. This API has great potential for all kinds of Reddit related projects. I am looking forward for using it in future as well.

## Initial Scraping

The first step was to make a base database on my own computer before using a server to do it for small amounts of data regularly. I don't have the worlds most stable internet, and  I am also aware that the script could crash while scraping such a huge amount of data. I made  another small script that downloaded all of the data, so that I could work on local files. My initial download was 46 json files, around 120 megabytes of data. It took me a while to code a scraping algorithm that could work with all the template changes [u/FanfictionBot](https://www.reddit.com/user/FanfictionBot/) has done over the years. I only focused on Story Title, Story URL, Author Name and Author Link initially. It took my computer around 3 hours to scrape 70k+ stories. After the database was made, I wrote some code which executed a given SQL command and exported its result to a JSON file. These JSON files would be used by the frontend.

Initially I made the following JSON files:

* Latest 1000 stories
* Top 100 Stories (Past 7 days, Past 30 days, Past 365 days and all time)
* Top 100 Authors (Past 7 days, Past 30 days, Past 365 days and all time)

## Making the front-end

Choosing the right way to make the front-end was a rather difficult choice. I tried a lot of stuff (React, Vue, Hugo, to name a few) before settling on the simplest of all, HTML/CSS + JS/jQuery. I knew I didn't need many elements, but a good amount of code. I am more comfortable in using jQuery than React. So, after the choice was made (4-5 hours), I started working on the front-end. It took me around 1.5 hour to make the website with [Bulma CSS Framework](http://bulma.io). All the [front-end code is available on Github](https://github.com/HackeSta/hpffrec-website). 

## Linking the back-end & front-end

This is probably where many people face problems. My own approach is somewhat unorthodox, as I haven't seen anyone else doing this. I myself have been doing this since past 4-5 years. It's kind of like a pseudo-JAMStack thing. 

I hosted my script on [PythonAnywhere](). I am using its free plan, and it has been sufficient for all my projects. I have set-up a CRON job (1 per day on the free plan) that updates the database. It produces the set of JSON files I mentioned earlier, and also triggers a Travis CI build of the front-end.

The TRAVIS CI build downloads the JSON files from the server and commits them to the repo. This way, the back-end is accessed only a couple of times a day (well within the limits of free plan) and the front-end (Netlify hosted) handles all the traffic (the largest on any of my projects yet).

In future, I am planning on increasing the CRON jobs each day, either by asking PA for them, or by another trick I use on my other projects.

## Updates after the first release

The [initial release post on Reddit](https://www.reddit.com/r/HPfanfiction/comments/camzsb/hpfanfiction_recommender_tool_website/) got a good number of views, and lots of suggestions for improvements.

Adding metadata (story length, chapters,genre,rating,etc) was the biggest of them all. Writing a scraping algorithm for metadata proved to be extremely difficult due to the template changing over the years. I finally decided on scraping only the newer templates, and scraped metadata for around 56% of the stories. It was a good solution as all the stories which didn't get metadata were not linked by [u/FanfictionBot](https://www.reddit.com/user/FanfictionBot/) for a long time.

After adding metadata, the next obvious update was to add filters based on it. Initially, I planned on making separate JSON files for every filter combination but the size of them was too large. I was forced to filter the data that the front-end was already using but I increase the number of stories & authors from 100 to 1000 to compensate. It worked perfectly.

Smaller updates were also made, which included:

* Adding options to change number of entries displayed in a page
* Adding a progress bar & message when No Data is found

## Random problems I faced

1. **Too many requests for older versions of Font Awesome:** I added Font Awesome to my project to add icons for metadata, but it slowed down the site by a huge margin. [This Github Issue](https://github.com/FortAwesome/Font-Awesome/issues/15167) informed me that it's a problem from their side, one I hope they resolve soon.
2. **Paired Characters not appearing:** The  [u/FanfictionBot](https://www.reddit.com/user/FanfictionBot/) template is such that paired characters are listed in '<' & '>'. This made the front-end HTML treat them as a tag name and created an element. To solve it, I used the following way:

       .replace(/</g, '&lt;').replace(/>/g, '&gt;')

## References

* [ElusiveGuy's Tool](https://ficrecs.elusiveguy.com/)
* [Reddit post of original data](https://www.reddit.com/r/HPfanfiction/comments/9nc0cw/ever_thought_i_wish_i_could_find_more_fics_like_x/)
* [Fanfiction, Graphs, and PageRank](http://colah.github.io/posts/2014-07-FFN-Graphs-Vis/)
* 