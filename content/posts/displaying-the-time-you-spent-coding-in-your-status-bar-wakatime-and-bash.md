+++
date = ""
description = "Tutorial on how to write a script to fetch your coding stats from WakaTime API."
draft = true
images = []
other_blogs = []
tags = []
title = "Displaying the time you spent coding in your status bar - WakaTime and Bash"

+++
# Introduction

WakaTime is an open-source time-tracking dashboard for programmers. It has open-source IDE Plugins for 60 editors, and integrations with popular platforms like Github, Slack etc.

It's straightforward to use. You just make an account and download plugins for all your IDEs. It then automatically records all your timings and groups them according to projects, operating systems, IDEs, etc.

## WakaTime API

WakaTime has a thorough API that can be used for various purposes. Our purpose is very simple today,

# The Script

So, the idea is to use Bash to get the time information from WakaTime's API