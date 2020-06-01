+++
date = 2020-06-01T13:30:00Z
description = "Graphs and WordCloud based analysis of Most Occurring Words in Harry Potter Books and popular Fanfiction Stories"
draft = true
images = []
other_blogs = []
tags = []
title = "Harry Potter Books & Fanfiction - An Analysis of Words"

+++
### Background

On 28th May, [a post on r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/comments/gs4me1/oc_word_cloud_comparison_between_user_comments_on/) inspired me to learn how to make Word Clouds myself. Being a huge Harry Potter fan, the data I was going to use was obvious. Using the Books seemed too simple so I decided to scrape 250 stories from [Fanfiction.net](http://fanfiction.net/) , and make a Word Cloud from that data. I posted [my first attempt on r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/comments/gtxzx8/oc_frequently_occurring_words_in_top_250_harry/), and based on the feedback I received, I decided to write this blog.

[The entire source code (except the data files & output files) is available here](https://github.com/haideralipunjabi/harrypotter-analysis)

### Attempt 1

There are many approaches I could have taken to prepare the data. I decided to download the stories first and then do the processing on the local files due to my slow & unreliable internet.

![Word Cloud from Attempt 1](/uploads/out_final1.png "Word Cloud from Attempt 1")

#### Scraping Fanfiction

I used simple Python + BeautifulSoup combination to scrape the stories form  [Fanfiction.net](http://fanfiction.net/). I sorted the stories based on their Favorite Count, and filtered them to stories having more than 100k words. ([Link to the URL](https://www.fanfiction.net/book/Harry-Potter/?&srt=4&r=10&len=100&p=1)). I scraped first 10 pages, (each page has 25 stories) resulting in 250 stories. It took me a total of 10 hours (7 on one day, and 3 on the next) to scrape all the stories.

#### Processing the Data

Taking hints from the [original post](), I used nltk to tokenize the stories, and removed the common words from the nltk English Stopwords Corpus. This was my first attempt at doing anything like this, and the process was taking 3-4 minutes per story initially. After some optimization, I was able to reduce the time to 1-2 minutes per story. I talked to a friend about the problem, and he suggested me to try multiprocessing. After adding multiprocessing, I had the idea of distributing the load over two CPUs (my laptop and a Raspberry Pi 4B). I copied the script and 25% of the stories over to the Pi and started the job.

_Additional Tip:_ [_screen_](https://www.geeksforgeeks.org/screen-command-in-linux-with-examples/) _is a good utility to do long jobs over SSH_

It took me an hour to the processing. I didn't want to do the processing again if I needed to remove some more words so I decided to store the word frequency data into json files. (Really helpful in future)

#### Making the Word Cloud

I took a look at [wordcloud Python Package](https://github.com/amueller/word_cloud) and copied the code from its examples to generate the word cloud.

To make the mask image, I downloaded some images from the Internet and used Inkscape to fix them.

#### Feedback

After posting the first attempt over at Reddit & Twitter, I received a lot of feedback. Common among them were the queries about why is Daphne more frequent and why is Ron less frequent (I will answer both later), suggestions to remove more words to focus it more on Harry Potter related words, and to show some other visualisations, especially ones comparing the books and fanfiction.

### Attempt 2

#### Finding more stopwords

In my first attempt, I used the nltk English stopwords corpus, which is just 179 words. I searched for a bigger list and ended up using a customised 20,000 most common words list from [google-10000-english repository](). What were the customisations? I had to remove some words (like magic, magical, wand, wards, vampire, etc) and some names (Harry, Ron, Fred, Arthur, etc) from the 20k list so that they aren't removed from my analysis. Storing the results of the processing from my first attempt into json files saved me from spending another hour of processing. I just removed the necessary keys from each data file.

#### Harry Potter Canon Books

I also downloaded the text versions of the 7 books from somewhere on the Internet, sanitised them a bit, and applied the same process as the fanfiction stories to generate their data. Using that data, I was able to compare the occurrence of some words in fanfiction vs canon. Since I had the data and the code, I decided to make their corresponding word clouds as well.

### Visualisations from Attempt 2:

#### Frequently Occurring Words in Top 250 Fanfictions

![Frequently Occurring Words in Top 250 Fanfictions](/uploads/fics.png "Frequently Occurring Words in Top 250 Fanfictions")

#### Average Frequency of Occurrence of Words per book or story

1. Top 20 Most Occurring Words in Fanfiction Stories

   ![](/uploads/graph1.png)
2. Top 20 Most Occurring Words in Harry Potter Books (excluding Top 20 from Fanfiction Stories)

   ![](/uploads/graph2.png)

### Important Results

#### Who is Daphne? Why is she so popular in Fanfiction?

> Hermione’s name was called. Trembling, she left the 
>
> chamber with Anthony Goldstein, Gregory Goyle, and 
>
> **Daphne Greengrass**. Students who had already been 
>
> tested did not return afterward, so Harry and Ron 
>
> had no idea how Hermione had done.
>
> \-> Harry Potter and the Order of the Phoenix

Daphne Greengrass is an almost non-entity in canon, and a blank slate for fanfiction writers. In canon & most fanfictions, she is the sister of Astoria Greengrass (another almost non-entity) who becomes the wife of Draco Malfoy. In fanfictions, she is usually a Slytherin due to her ambitions & cunningness & not because of being a Pureblood Supermasict. Her family is depicted as Light or Grey, and support "Lord Potter". She is a popular pairing in Independent Harry stories.

Her being a blank slate character-wise is a boon for writers who want to write an OC without explicitly mentioning it.

[Video explaining Daphne Greengrass and her popularity](https://www.youtube.com/watch?v=4mSD-GAmz1I)

#### What happened to Ron?

Ron is an almost opposite of Daphne. JKR wrote Ron in such a beautiful manner that many fanfiction writers are unable to write a good Ron. In canon, Ron is flawed but is also very funny, brave and loyal to his friends. In fanfictions, especially where Harry is very different to canon (Independent, Super-Powered, Lord Potter, etc), Harry usually ignores Ron (if diverging before Hogwarts) or the author does a lot of Ron bashing to justify Harry breaking up their friendship.

### Bonus Visualisations

#### The 7 Canon Books:

1. **Philosopher's Stone**

   ![](/uploads/book1.png)

   I tried to use an image of 9 3/4 . The word Quirrell and Griphook are frequent in this book and will lose their frequency in future books.
2. **Chamber of Secrets**

   ![](/uploads/book2.png)

   I used an image of Dobby the Free Elf. You will words like Dobby, Lockhart (I hate that guy), Polyjuice, Parseltongue, Mandrakes, Mudbloods making an appearance in this book.
3. **Prisoner of Azkaban**

   ![](/uploads/book3.png)

   I used an image of Prongs (James' Marauder Nickname, and Animagus form. Harry's Patronus) for this book. Words like Lupin, Sirius, Pettigrew, dementors, Crookshanks, Patronus start appearing.
4. **Goblet of Fire**

   ![](/uploads/book4.png)

   I tried to use an Image of the Triwizard Trophy. Words like Cedric, Beauxbatons, Crouch,  Durmstrang start appearing.
5. **Order of the Phoenix**

   ![](/uploads/book5.png)

   Tried to use an image of a Phoenix. Umbridge is very popular in this book.
6. **Half Blood Prince**

   ![](/uploads/book6.png)

   I used an image of the Half Blood Prince for this book. Apart from the usual, Slughorn is the most common word in this book.

    
7. **Deathly Hallows**

   ![](/uploads/book7.png)

   I used an image of the Deathly Hallows for this. You will see "wand" becomes very used due to "Elder wand". Hallows, Cloak, Wandmaker appear. Also, Griphook is back.

### Reference:

1. [wordcloud Python Package]()
2. [nltk](https://www.nltk.org/)
3. [r/HPFanfiction](https://www.reddit.com/r/HPfanfiction)
4. [Snape, Snape, Severus Snape - Music Video](https://www.youtube.com/watch?v=4Rp5bdBBEeM)