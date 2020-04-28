+++
date = ""
description = "How to use Continuous Integration with Static Sites to update their data regularly"
draft = true
images = []
other_blogs = []
tags = []
title = "Using CI to update Static Websites."

+++
# Background

Sometimes, our websites require data that isn't updated in realtime but updated after every few hours, days or maybe even weeks. In such cases, requesting the data from some backend or API on every request will be a waste of resources. Client-side caching of data might help a bit but isn't the best solution. 

In July 2019, I made a project - [HPFanfiction Recommender](https://hpffrec.hackesta.org "HPFanfiction Recommender") ([Read about it in a previous blog post](https://blog.haideralipunjabi.com/posts/making-hpfanfiction-recommender/)), where my backend generates the required data and then triggers a [Travis CI](https://travis-ci.org/) build which downloads the data and stores it in the repository. This method had a serious drawback. It used to commit 2 - 3 MB of files every 4 hours. As a result, when I tried to Pull the repo in February 2020, the size was huge. As a temporary fix, I added --amend to the Travis Commit command but I am not sure how well it worked. 

At the end of March 2020, I started a project - [covidkashmir.org](covidkashmir.org), which also needed to make some changes to repo during CI but I didn't want those changes committed back to the repo, only deploy them to [Netlify](https://www.netlify.com/). My initial idea was to download [netlify-cli](https://docs.netlify.com/cli/get-started/) during the CI build and then use it to deploy the changes without committing them back. To my surprise, I found out about [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/). In a future blog, I will write the details about [covidkashmir.org](covidkashmir.org) 's requirements. In this blog, I will write about how to set up [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/) for any static site.

# Setting Up [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/)