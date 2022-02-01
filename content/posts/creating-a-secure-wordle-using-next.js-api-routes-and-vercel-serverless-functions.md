+++
date = ""
description = "Tutorial on how a secure Wordle game can be created using Next.js API Routes and Vercel Serverless Functions"
draft = true
images = []
other_blogs = []
tags = []
title = "Creating a secure Wordle using Serverless Functions"

+++
## Introduction

## What's wrong with Wordle?

I won't say anything is wrong with Wordle. It's just a choice that its developer made. I am sure if Josh Wardle wanted, he could have made it more secure, and if I was in his shoes, I would have also made it as he has.

Why? Because using API Routes and Serverless Functions is costly if the traffic is too much.

Robert Reichel wrote a good article on Reverse Engineering Wordle which explains how Josh Wardle's Wordle determines the words on the client-side.

> At this point, we've done enough digging to know how Wordle is choosing the word of the day. We know that Wordle uses a client-side date-based algorithm to determine which word to use from a static wordlist. Each day is predictable so long as we have all of the code pieced together
>
> \-- Reverse Engineering Wordle | Robert Reichel

## What do I mean by secure?

By "secure", I mean that no one would be able to know what tomorrow's (or the day after, or any day in the future) word is. One can always know what today's word is by playing the game once, seeing the word and playing it again in a different browser. Or if you know how to, you can send a request to the API and it will tell you today's word. What will this do? This will prevent bots like "[The Wordlinator](https://www.thegamer.com/wordle-twitter-bot-the-wordlinator-spoler/)" that spoil the game for others.

Also, another advantage of using this method is. No matter where in the world you are playing from, everyone will get the new word at the same time because the selection will be based on the clock of the server, and not of the client. Many Wordle games have this issue where some people start getting the new word earlier than the rest of the world because it is 12:00 am of the new day for them, and the rest of the world is still on the previous day.

## How to do it?

I won't write about how to make the entire Wordle game, but just the API  / Serverless Functions Part.  It can be deployed on any platform you like. I deployed mine on Next.js and Vercel.

### Requirements:

* A list of words from which each day's word will be chosen. It's better if this is a subset of a larger list of words that decide which word is accepted and which isn't. The word acceptance logic and the large list can be client-side. (It would be better as it will reduce the load on API and may save money). The smaller list of words is never loaded on the client.

### Logic:

The logic for it is pretty simple. We will make an API Route that:

1. Loads the list of words from which we select a word each day
2. Calculates the number of days since some fixed data (e.g, the day the app/game is launched).
3. Selecting and responding with the word from the list of words using the calculated difference.

### Code:

{{< highlight js >}}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction  
import { DateTime } from 'luxon';  
import type { NextApiRequest, NextApiResponse } from 'next'  
import { GameData } from '../../lib/interfaces';  
import gameWords from "../../data/selected.json";

function getIndex():number {  
    let start = DateTime.fromFormat("31/01/2022","dd/mm/yyyy").setZone("UTC+5:30").startOf("day")  
    let today = DateTime.now().setZone("UTC+5:30").startOf("day")  
    return today.diff(start,'days').get('days');  
}

export default function handler(req: NextApiRequest,res: NextApiResponse<GameData>) {  
    let id = getIndex();  
    res.status(200).json({  
        id: id,  
        word: gameWords\[id\]  
    });  
}

{{</ highlight >}}

Also, if you want, you can make another API Endpoint that returns the time left for next word.

{{< highlight js >}}

import { NextApiRequest, NextApiResponse } from "next/types";  
import {DateTime} from "luxon";

export default function handler(  
    req: NextApiRequest,  
    res: NextApiResponse<number>  
  ) {  
    let t = DateTime.now().setZone("UTC+5:30").startOf('day').plus({days:1}).valueOf()  
    res.status(200).send(t)  
  }

{{</ highlight >}}