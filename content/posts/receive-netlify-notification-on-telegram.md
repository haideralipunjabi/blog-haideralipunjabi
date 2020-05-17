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

[Netlify](https://netlify.com) is one of the worlds largest hosting providers for JAMStack Websites. All of my websites are hosted on it. Some of them use manual deploys as [they are deployed via CI](https://blog.haideralipunjabi.com/posts/using-ci-to-update-static-websites/). I have disabled auto-publishing for some of the websites because I like to preview them before publishing.  Since a CI is used during deploy, the time taken for the website to deploy on Netlify is random. I wanted to be notified whenever a deploy was ready to be published and I tried many different techniques for it. Initially, I used [Outgoing Notifications](https://docs.netlify.com/site-deploys/notifications/) with [IFTTT](https://ifttt.com). With that, I was able to receive a notification on my mobile whenever the deploy was ready. It worked fine, but I wanted to receive a notification on my PC, not my mobile, which will open the deploys page of the website when I click on it.

For a project of mine, I learnt how to make Telegram Bots. With that, I was able to create another bot that messaged me whenever a website was ready to deploy.

### Setup

1. Follow [this tutorial to create the Telegram Bot](https://core.telegram.org/bots/#3-how-do-i-create-a-bot). Note the API Token you receive. In the following steps, it will be referred to by **<token>**
2. The bot will need to know your chat id. To find that, we need to set up a temporary webhook. [Webhook.site](https://webhook.site) is a great service to test webhooks online. Go to [Webhook.site](https://webhook.site) and copy the unique URL. (Referred by **<unique_url>**)
3. Open the following URL in your browser
  		https://api.telegram.org/bot<token>/setWebhook?url=<unique_url>
  	
  
4. Now,  send a message to your bot from your Telegram account. In the [Webhook.site](https://webhook.site) window, you will receive a new request which looks like:

   {{< highlight json >}}

       {
         "update_id": 213123213,
         "message": {
           "message_id": 16,
           "from": {
             "id": 987654321,
             "is_bot": false,
             "first_name": "John",
             "last_name": "Doe",
             "username": "johndoe",
             "language_code": "en"
           },
           "chat": {
             "id": 987654321,		// <----- chat_id
             "first_name": "John",
             "last_name": "Doe",
             "username": "johndoe",
             "type": "private"
           },
           "date": 1589716177,
           "text": "Jd"
         }
       }

   {{</ highlight >}}
5. Note the chat\["id"\] from the previous step. It is the chat id _you need. (_Referred _by_ **<chat___id>**)
6. You can delete the webhook now
       `https://api.telegram.org/bot<token>/deleteWebhook`
  
7. Now, go to your website's settings on Netlify. In Build & Deploy > Deploy Notifications, add a new Outgoing Webhook.
  
8. Select the required event ([Details of all events](https://docs.netlify.com/site-deploys/notifications/)), and the following in URL field.

       `https://api.telegram.org/bot<token>/sendMessage?chat_id=<chat_id>&text=<message>`

   The **<message>** is the message you want to receive. I send the name of the website, event and the link to the website's deploys page.
9. The set up is done. Now, you will receive a Telegram Message whenever a deploy is ready.

### References

* [Netlify Deploy Notifications](https://docs.netlify.com/site-deploys/notifications/)
* [Telegram Bots](https://core.telegram.org/bots/)