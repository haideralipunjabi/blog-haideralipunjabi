+++
date = "2019-07-03T13:30:00+00:00"
draft = true
images = []
other_blogs = []
tags = ["data visualisation", "data", "datviz", "python", "geopandas"]
title = "Country Flag Visualisation -"

+++
Data Visualisation has always interested me, and I am a long time lurker of r/dataisbeautiful. On 1st July 2019, a post about Frequency of Flag Colors by Continent caught the interest of many people.  It's from that post that I got the idea to make this visualisation. 

The idea was simple (execution was not), calculate the ratio of colours of each flag and colour each country on a map using those colours. I had a previous project which used flag colour ratios to make Atom Icons,  so I knew I should be able to do this. Unfortunately, I was wrong, and it took me three attempts to visualise it properly.

Before going into the details of each attempt, here are the sources of data I used.

\-> Map Source: [https://naturalearthdata.com/downloads/](https://naturalearthdata.com/downloads/ "https://naturalearthdata.com/downloads/")

\-> Flags: [https://github.com/hjnilsson/country-flags](https://github.com/hjnilsson/country-flags "https://github.com/hjnilsson/country-flags")

 Attempt 1 (Python + Geopandas):

In my previous visualisations (simple choropleth maps), I have always used Geopandas. It can export high-quality images very easily.

The first thing I worked on was to calculate the colour ratios for each country present in the map. I modified the code from the following StackOverflow Post ([https://stackoverflow.com/a/52879133/4698800](https://stackoverflow.com/a/52879133/4698800 "https://stackoverflow.com/a/52879133/4698800")) to suit my needs.

\`\`\` CODE

The problem in this attempt came when trying to colour the countries. Geopandas can't fill a polygon using multiple colours. For a while, I thought about compromising and fill with the most dominant colour only. Achieving that was also difficult, the nearest possible solution I found was this Github Issue.([https://github.com/geopandas/geopandas/issues/387](https://github.com/geopandas/geopandas/issues/387 "https://github.com/geopandas/geopandas/issues/387"))

I wasn't able to fill the most dominant colour, so I gave up on using Geopandas.

After sitting on it for a while, I remembered that LeafletJS uses CSS to style the maps. So, after saving the flag colours data to a JSON file, I started my second attempt at visualising it, now with LeafletJS.