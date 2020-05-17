+++
date = 2020-05-17T12:30:00Z
description = "Use Netlify Outgoing Notifiications with Telegram Bot API to receive notification on Telegram"
draft = true
images = []
other_blogs = []
tags = ["netlify", "telegram", "webhook"]
title = "Receive Netlify Notification on Telegram"

+++
### Introduction

Netlify is one of the worlds largest hosting providers for JAMStack Websites. All of my websites are hosted on it. Some of them use manual deploys as they are deployed via CI. I have disabled auto-publishing for some of the websites because I like to preview them before publishing.  Since a CI is used during deploy, the time taken for the website to deploy on Netlify is random. I wanted to be notified whenever a deploy was ready to be published and I tried many different techniques for it. Initially, I used Outgoing Notifications with IFTTT. With that, I was able to receive a notification on my mobile whenever the deploy was ready.