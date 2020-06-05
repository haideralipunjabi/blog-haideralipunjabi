+++
date = 2020-06-05T13:30:00Z
description = "Tutorial / Blog Post explaining PWA Testing on mobile devices using two methods, Chrome Port Forwarding & Netlify Dev"
draft = true
images = ["/uploads/blog12.jpg"]
other_blogs = []
tags = ["android", "pwa", "webdev"]
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

   ![](/uploads/screenshot_20200605-114625_settings-2.png)
3. Note the IP Address and Port shown under ADB over Network
4. Install [ADB]() on your computer
5. Go to your command-line / command prompt and enter

       adb connect <ip-address>:<port>

   Use the IP Address and Port from Step 3
6. When connecting for the first time, you will need to authorize the connection on your phone.
7. Your device should be connected to your PC over WiFi.

### Using Chrome Port Forwarding

1. Make sure your development server is running on your PC
2. Go to [`chrome://inspect/#devices`](chrome://inspect/#devices). You should see your device along with a Connected status indicator

   ![](/uploads/maim-1591337796.png)
3. Enable Port Forwarding
4. Click Add Rule
5. In the Device Port, enter the port number on which you want to access the site on your device
6. In the Local Address field, enter the address and port of your development server. (e.g, localhost:1313)
7. Click Add

   ![](/uploads/maim-1591337806.png)

Port Forwarding should be setup and you will be able to access your server on your Android Device on localhost:port (which you set in Step 5.)

[More Detailed Tutorial](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server)

### Pros vs Cons

**Pros:**

* Faster Deployment and Testing
* Already using ADB and Chrome, which will also be used if you want to use the Dev Tools on your mobile device

**Cons:**

* Can only be used for Android Devices
* The devices need to be on the same network

## Netlify Dev

[Netlify Dev](https://www.netlify.com/products/dev/) is part of the [netlify-cli](https://docs.netlify.com/cli/get-started), and is a great choice if you are already using netlify-cli, or need to showcase your work live without deploying it to production. Netlify Dev also allows you to use many features from the Netlify Ecosystem like Netlify Functions, Custom Headers, etc.

### Setup

First of all, you will need to setup netlify-cli and authorize it. You will need an account on Netlify for it.

[Here's a link to a detailed tutorial]()

1. Install netlify-cli

       npm install netlify-cli -g
2. Authenticate

       netlify login

   Authorize it in the browser window that opens.
3. Setup your repository using

   a. Automated Setup (if your repository is on Github)

       netlify init

   b. Manual (for other Git Providers, or if you wise to do it like this)

       netlify init --manual

   You can do a lot of stuff with this cli, but I will skip directly to Netlify Dev
4. To start a Netlify Dev server, you can use `netlify dev` , but since we want to Start a Public Live Session, we will use

       netlify dev --live
5. You will get a URL that looks like `https://clever-cray-2aa156-6639f3.netlify.live/`. This URL will be accessible by everyone on internet.

netlify-cli has many more features you should read about in the [documentation](https://docs.netlify.com/cli/get-started/#netlify-dev).

## Testing your PWA on your mobile

Now that you can access the PWA on your mobile, you need to find a way to test it properly. The Dev Tools available in PC Browsers help in debugging and testing, but unfortunately, I have yet to find a similar feature on phone. Fortunately, Chrome provides a solution by allowing us access to the Dev Tools for a page on mobile devices using ADB.

1. Setup ADB, as shown in the Chrome Port Forwarding
2. In [`chrome://inspect/#devices`](chrome://inspect/#devices), you will see a list of all pages opened on your mobile device.

   ![](/uploads/maim-1591337816.png)
3. Click on the inspect button to launch the Dev Tools for that page

## References

* [Progressive Web Apps -Mozilla]()
* [Netlify Dev](https://www.netlify.com/products/dev/)
* [Access Local Servers - Google Tools for Web Developers](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server)
* [Remote Debugging WebView](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/webviews)