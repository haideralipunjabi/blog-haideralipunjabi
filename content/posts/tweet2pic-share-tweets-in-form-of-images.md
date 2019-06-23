+++
date = "2019-06-23T06:30:00+00:00"
draft = true
tags = ["android"]
title = "Tweet2Pic - Share Tweets in form of Images"

+++
# Tweet2Pic

### Share Tweets in form of Images

_My first post on this blog, and I thought it was best if I wrote about the best app (code wise) I have made._

I joined Twitter in 2014 but didn't start using it properly till 2018 (I created some Twitter bots which got me interested into Twitter). Sometime around August 2018, I wanted to share some tweet on Instagram and searched for an app that could convert a tweet to an image. I found nothing and ended up sharing it by taking a screenshot, but the idea of the app stuck with me.

After some googling, I came across Cameron Adams' experiment [Screenshot a Tweet](http://themaninblue.com/experiment/screenshot-a-tweet/) ([related blog post](https://themaninblue.com/2018/03/26/screenshot-a-tweet/)). With this tool in mind, I started developing a similar app for Android.

I used [Twitter's oEmbed API](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed.html) to generate a better looking tweet, which I could convert to an image. The API also had some additional features like _dark theme, including parent thread, hiding media_ which I included in the app. In v1.2, as an additional feature, I added a **Square Image** feature, which generated a square image (for Instagram).

3 weeks after the initial release, I released v1.4 (current release) which had some additional requested features, and fixed some bugs. I won't go into the complete details of every bug, but write a summarised description / fix for the developers reading this blog.

* v1.1 (Released a day after 1.0) added a Settings UI (with options to remember options such as dark theme, hide media, square image, etc) and added translations to 15 Languages (I might make a post related to generating translations using code someday).
* v1.2 (Released a day after 1.1) added the Square Image feature and fixed the bug where one couldn't save multiple copies of the same tweet, if they used separate options. I was initially using just the Tweet ID as filename, but added additional text for each option used.
* v1.3 (Released a week after 1.2) fixed the big issue of gallery not showing the images downloaded using the app. I learnt that one need's to programmatically refresh the gallery after adding/deleting any image. ([SO post that helped me](https://stackoverflow.com/questions/2170214/image-saved-to-sdcard-doesnt-appear-in-androids-gallery-app))
* v1.4 (Released 10 days after 1.3) Added the option to share directly to Instagram Stories, and replaced Switched with Check boxes (people on reddit convinced me that its better UX)

You should give my app a try if you are an Android user.

{{ $image **:=** $resource.Resize "100x" }}

[![Get it on Google Play](https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png "Google Play Badge")](https://play.google.com/store/apps/details?id=org.hackesta.tweet2pic&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

{{ end }}