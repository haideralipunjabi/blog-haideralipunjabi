+++
date = 2022-09-19T14:30:00Z
description = "Tutorial on how to write a script to fetch your coding stats from WakaTime API."
draft = true
images = ["/uploads/cover.png"]
other_blogs = []
tags = ["wakatime", "bash", "shell"]
title = "Display the time you spent coding in your status bar - WakaTime and Polybar"

+++
## Introduction

### WakaTime

[WakaTime](https://wakatime.com/) is an open-source time-tracking dashboard for programmers. It has open-source IDE Plugins for 60 editors, and integrations with popular platforms like Github, Slack etc.

It's straightforward to use. You just make an account and download plugins for all your IDEs. It then automatically records all your timings and groups them according to projects, operating systems, IDEs, etc.

![](/uploads/2022-09-19-175752_2335x1001_scrot.png)

### Polybar

[Polybar](https://polybar.github.io/) is a tool for Linux-based Operating Systems that helps in creating Status Bars. I have been using it for a while and really like it. I have also made some other scripts for it. 

## WakaTime API

WakaTime has a thorough API that can be used for various purposes. Our purpose is very simple today, call an endpoint for the summary of our usage. Although WakaTime supports OAuth2-based Authentication, we will use the API Key method as it is going to be used in a personal script, and it will also keep the script simple.

You can get your API Key from [this page](https://wakatime.com/settings/api-key)

## The Script

{{< highlight bash >}}

\#!/bin/sh

API_KEY="<API_KEY>"  
ENCODED_KEY=\`echo $API_KEY | base64\`  
HEADER="Authorization: Basic $ENCODED_KEY"  
TODAY=\`date +%Y-%m-%d\`  
YESTERDAY=\`date -d "yesterday" +%Y-%m%d\`  
URL="https://wakatime.com/api/v1/users/current/summaries?start=$YESTERDAY&end=$TODAY"
echo $(curl -s -X GET -H "$HEADER" "$URL" | jq -r '.cummulative_total.digital')

{{< / highlight >}}

The concept is very simple.

1. Store the API KEY in a variable
2. Encode it to Base64
3. Create an Authorization Header using the encoded key.
4. Store today's date and yesterday's date in two separate variables
5. Use the Header, and date variables to query the WakaTime API.
6. Use `jq` to extract the required output.

The output is a simple `hh:mm` notation of the amount of time you have spent coding today.

## Using the script in Polybar

I personally use Polybar for my status bar, and my purpose in writing this script was to show my WakaTime stats in my status bar.

{{< highlight bash >}}

\[module/wakatime\]  
type = custom/script  
exec = \~/bin/wakatime-stats  
interval = 60  
label = Coding: %output%

{{< /higlight >}}

Using the above snipper, I am able to see my coding time in my status bar.

![](/uploads/2022-09-19-175804_248x42_scrot.png)

## References

* [WakaTime API Documentation](https://wakatime.com/developers)
* [Polybar Status Bar]()