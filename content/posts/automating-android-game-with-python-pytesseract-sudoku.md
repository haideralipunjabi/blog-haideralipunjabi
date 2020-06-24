+++
date = 2020-06-24T13:30:00Z
description = "Tutorial / Blog Post demonstrating Android Game Automation using Python. The game used is Sudoku, and also uses Pytesseract (OCR) to get the Sudoku game from Android to your Python Code. The solved game is then input to the device using ADB (pure-python-adb)."
draft = true
images = []
other_blogs = []
tags = ["python", "android"]
title = "Automating Android Game with Python & Pytesseract: Sudoku"

+++
### Introduction

I made a Python Script to Automate a Sudoku Game on Android after watching [Engineer Man's Videos on Youtube](https://www.youtube.com/channel/UCrUL8K81R4VBzm-KOYwrcxQ) doing the same for different games.

The script can be divided into 5 parts

1. Connecting to an Android device using ADB, and getting the screenshot of the game from it
2. Using Pillow to process the screenshot for Pytesseract
3. Using Pytesseract to extract the Sudoku Game Grid to a 2D List in Python.
4. Solving the Sudoku Game
5. Sending the solved input to your Android Device using Python

Out of the 5, I will be focusing mostly on 2,3 & 5 as 1 & 4 are topics that have been extensively covered.

The complete code is available on the following repository:

You can also watch the script in action on:

### Tutorial

#### 1 (a). Using ADB to Connect to your Device

Most of the tutorials on internet use Wired ADB, which discourages many people from using this method. I will be using Wireless ADB, which isn't very difficult to setup.

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

#### 1 (b). Using ADB with Python (pure-python-adb)

You can define the following function to connect to  the first ADB device connected to you computer using Python

We will be using this function later to return an instance of `ppadb.device.Device` which will be used to take screenshot, and send input to your device.