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