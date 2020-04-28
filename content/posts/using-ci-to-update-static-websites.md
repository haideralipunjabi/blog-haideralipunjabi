+++
date = 2020-04-28T09:30:00Z
description = "How to use Continuous Integration with Static Sites to update their data regularly"
images = ["/uploads/blog_banner_og.png"]
tags = ["travis", "jamstack", "netlify"]
title = "Using CI to update Static Websites."
[[other_blogs]]
link = "https://dev.to/haideralipunjabi/using-ci-to-update-static-websites-3ikh"
provider = "Dev"

+++
### Background

Sometimes, our websites require data that isn't updated in realtime but updated after every few hours, days or maybe even weeks. In such cases, requesting the data from some backend or API on every request will be a waste of resources. Client-side caching of data might help a bit but isn't the best solution. Also, you might end up reaching your API Requests limit.

In July 2019, I made a project - [HPFanfiction Recommender](https://hpffrec.hackesta.org "HPFanfiction Recommender") ([Read about it in a previous blog post](https://blog.haideralipunjabi.com/posts/making-hpfanfiction-recommender/)), where my backend generates the required data and then triggers a [Travis CI](https://travis-ci.org/) build which downloads the data and stores it in the repository. This method had a serious drawback. It used to commit 2 - 3 MB of files every 4 hours. As a result, when I tried to Pull the repo in February 2020, the size was huge. As a temporary fix, I added --amend to the Travis Commit command but I am not sure how well it worked.

At the end of March 2020, I started a project - [covidkashmir.org](covidkashmir.org), which also needed to make some changes to repo during CI but I didn't want those changes committed back to the repo, only deploy them to [Netlify](https://www.netlify.com/). My initial idea was to download [netlify-cli](https://docs.netlify.com/cli/get-started/) during the CI build and then use it to deploy the changes without committing them back. To my surprise, I found out about [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/). In a future blog, I will write the details about [covidkashmir.org](covidkashmir.org) 's requirements. In this blog, I will write about how to set up [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/) for any static site.

### Setting Up [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/)

#### In your code/repository

1. In your repository, add a .travis.yml file which will act as the configuration file for Travis.
2. Configure .travis.yml as per your needs. ([Travis CI Documentation](https://docs.travis-ci.com/))
3. In your .travis.yml add the following lines to set up [Travis CI DPL v2](https://docs.travis-ci.com/user/deployment-v2) and its [Netlify Drop Deployment](https://docs.travis-ci.com/user/deployment-v2/providers/netlify/)

   {{< highlight yml >}}

       deploy:
         provider: netlify
         site: $NETLIFY_SITE	# Add in Travis CI Settings
         auth: $NETLIFY_AUTH	# Add in Travis CI Settings
         dir: .
         edge: true # opt in to dpl v2
         prod: true		# for deploying to production

   {{< / highlight >}}

#### On Netlify

1. **For New Sites**

   Deploy your site using [netlify-cli](https://docs.netlify.com/cli/get-started/) or [Neltify Drop](https://app.netlify.com/drop), and don't link your site to Git

   **For existing Sites**

   If your site is already linked to a git repository, [apply here to unlink it](https://community.netlify.com/c/Netlify-support/48)

   We need an unlinked site because it will deploy twice (once without the changes from Travis) otherwise.
2. Go to the Sites Settings > General and note the API ID. We will need it later.
3. Go to User Settings > Applications and create a new Personal Access Token. Note it as well.

#### **On Travis CI**

1. Link Travis CI to your Repository
2. Go to the repository's settings and add the following environment variables:
   1. NETLIFY_SITE : API ID from Step 3 of the Previous Section
   2. NETLIFY_AUTH: Personal Access Token from Step 4 of the Previous Section

Now, when you push your code, it will trigger the build on Travis, generate your data and deploy to Netlify.