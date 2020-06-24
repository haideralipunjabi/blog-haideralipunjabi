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