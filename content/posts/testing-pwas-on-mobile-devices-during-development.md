+++
date = 2020-06-05T13:30:00Z
description = "Tutorial / Blog Post explaining PWA Testing on mobile devices using two methods, Chrome Port Forwarding & Netlify Dev"
draft = true
images = []
other_blogs = []
tags = []
title = "Testing PWAs on mobile devices during development"

+++
## PWA? What is that?

Progressive Web Applications (PWAs) are web applications (duh!) that use emerging web APIs and modern technologies to make the web app behave similar to a native application on any platform / operating system. They can be installed on your phone or PC, and even be distributed through App Stores.

I will link some articles related to PWAs at the end.

The capability to be installed on a mobile device is very important for a PWA, and to test those mobile-specific features even more important. PWAs can only be served over [Secure Contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS)). It isn't a big deal today due to services like [Let's Encrypt](https://letsencrypt.org/), which provide free SSL Certificates. The HTTPS restriction isn't a problem but makes testing the PWA difficult. Most browsers treat localhost as a Secure Context, and testing PWA on your own machine isn't a problem. The problem arises when you access your web app from your phone (over local network), and it won't work because usually, you won't have an SSL Certificate for debugging on your own machine. One of the solutions to this problem is to get an SSL certificate, but it can be a complicated process for those not having experience with such stuff.

In this blog post, I will explain two methods which will help you test your PWAs on your phone.

## Chrome Port Forwarding

Host a site on your machine, access the content from an Android Device (over Android Debugging Bridge). By using Port Forwarding, the browser on your mobile will be able to access the site on its own localhost, thus in a Secure Context.

Most of the tutorials on internet use Wired ADB, which discourages many people from using this method. I will be using Wireless ADB, which isn't very difficult to setup.

### ADB over Network

1. Go to your Phone Settings > System > Developer Options (This might vary in different phones, so if it is not the same in your's, look it up on the internet)
2. Turn on Android Debugging and ADB over Network.
3. Note the IP Address and Port shown under ADB over Network
4. Install [ADB]() on your computer
5. Go to your command-line / command prompt and enter

       adb connect <ip-address>:<port>

   Use the IP Address and Port from Step 3
6. When connecting for the first time, you will need to authorize the connection on your phone.
7. Your device should be connected to your PC over WiFi.

### Using Chrome Port Forwarding

1. Make sure your development server is running on your PC
2. Go to Chrome > Dev Tools > Inspect Devices. In the left-hand menu, you should see your device along with a Connected status indicator
3. Enable Port Forwarding
4. Click Add Rule
5. In the Device Port, enter the port number on which you want to access the site on your device
6. In the Local Address field, enter the address and port of your development server. (e.g, localhost:1313)
7. Click Add

Port Forwarding should be setup and you will be able to access your server on your Android Device on localhost:port (which you set in Step 5.)