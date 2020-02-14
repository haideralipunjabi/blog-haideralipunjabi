+++
date = 2020-02-14T12:30:00Z
draft = true
images = []
other_blogs = []
tags = ["javascript", "hugo", "JAMstack", "web"]
title = "Adding View Count to your JAMstack Website with JavaScript and Google Analytics"

+++
## Introduction

As [JAMStack](https://jamstack.org/) is becoming more and more popular,  many people (especially developers) are shifting their websites (and blogs) to [JAMStack](https://jamstack.org/) and use some [Static Site Generator](https://www.staticgen.com/) (Jekyll, Hugo, Nuxt, Next, Gatsby, etc).

My blog is based on [Hugo](https://gohugo.io/) and hosted on [Netlify](https://www.netlify.com/). My previous post got more views than I expected and I spent the next two days checking my [Analytics App](https://analytics.google.com/analytics/web/) to keep track of the views. Then it occurred to me that I should try and add a view counter to my blog. I post all my articles simultaneously to [dev.to](https://dev.to/) and [Medium](https://medium.com/), and both of them tell me how many views my article has got.

It took me around 4 hours to add the views counter, but it won’t take you as much time because I experimented with lots of stuff.

My only goal was to have a counter with good accuracy which updates the values without rebuilding the entire site.

After searching for a while, I concluded that using [Google Analytics](https://analytics.google.com/analytics/web/) data instead of adding a new mechanism would be best.

I spent around two hours messing with [Google Core Reporting API v3](https://developers.google.com/analytics/devguides/reporting/core/v3/reference) because I wanted to avoid the  [Google Analytics Reporting API v4’s](https://developers.google.com/analytics/devguides/reporting/core/v4/) API KEY requirement. When I was almost finishing up the changes, I read somewhere that v3 API would stop functioning this year.

After wasting 2 hours on v3, I knew I had no choice other than using v4. While looking up stuff related to v4, I came across [Google Analytics Spreadsheet Add-on](https://developers.google.com/analytics/solutions/google-analytics-spreadsheet-add-on), which allows you to export [Google Analytics](https://analytics.google.com/analytics/web/) data to a Google Spreadsheet. After a lot of experimenting, following multiple tutorials and numerous visits to [Stack Overflow](https://stackoverflow.com/), I was able to export my Analytics Data to  [Google Sheets](https://docs.google.com/spreadsheets/u/0/).

Then I had to figure out how to get this data to my website. I decided on using Hugo’s inbuilt functions and variables to achieve this (a very bad decision in hindsight). I spent another hour meddling through Hugo’s documentation to show the page view data on my website. After everything was done, and I was about to commit the changes, I decided to check the size of the data I was loading from [Google Sheets](https://docs.google.com/spreadsheets/u/0/). To my  surprise and shock, I couldn’t find the entry for the CSV file in my browsers Network tab. Then it occurred to me that the data is being fetched during build, something which I wanted to avoid. Scraping all the changes, I decided to use JavaScript to make this work. Since my website doesn’t have jQuery, and I didn’t want to add it for such a small task, I wrote all the code in vanilla JavaScript (which I could have written better) and had it working finally. 

The following tutorial would only cover getting the data from [Analytics](https://analytics.google.com/analytics/web/#/) to [Google Sheets](https://docs.google.com/spreadsheets/u/0/) and fetching that data in vanilla JavaScript. I won’t show how to add that to your website as every website structure is different.

----

## Tutorial

### Part a) Setting Up Google Sheets + Analytics Add-On



1. Follow [this guide]( https://developers.google.com/analytics/solutions/google-analytics-spreadsheet-add-on) to install the add-on to your Google Sheets.

2. Select "Add-ons" > "Google Analytics" > "Create a New Report" from the menu bar.

3. Name it something, and select your Analytics View.

4. Under configuration options, choose Pageviews (ga:pageviews) as your metric.

5. The Dimensions will depend on the structure of your website. Page Path Level 1 will only return the data for Pages and Folders in the root of your website. Page Path Level 2 will return data for Pages and Folders in some folder in your root. Use the following table to decide your dimension.

   | **URL Pattern**                                     | Page Path Level   |
| --------------------------------------------------- | ----------------- |
   | https://example.com/blog-post-example               | Page Path Level 1 |
   | https://example.com/posts/blog-post-example         | Page Path Level 2 |
   | https://example.com/posts/2020/blog-post-example    | Page Path Level 3 |
   | https://example.com/posts/2020/02/blog-post-example | Page Path Level 4 |
   
   My blog posts are present in the posts/  directory, so I decided to use both  Page Path Level 1 &  Page Path Level 2 dimensions.  By using both 1 & 2, I get both posts/ & my blog post URL.
   
   If you use the Page dimension instead of Page Path n, your data will also include Query Strings and the data would be divided for every unique URL.
   
6. Under Segments, I selected All Users. but you could also use New Users to get unique views only.

7. Create the Report and you will see your Configuration Sheet will be generated.

8. Change the Start Date to a date before your first blog post (in YYYY/MM/DD format), and change the End Date to 'today'

9. You should remove the 1000 limit if you want to get the data for more than 1000 posts.

10. Create another empty sheet which will act as output. Share this sheet with Edit Permission enabled. Copy the Share Link.

11. Paste the copied Share Link into the Configuration Sheet in the Spreadsheet URL Row.

12. Select "Add-ons" > "Google Analytics" > "Run reports" from the menu bar.

13. It will show you a Report Status Popup, which should tell you that your report completed successfully.

14. Select "Add-ons" > "Google Analytics" > "Schedule Reports" from the menu bar.

15. Select "Enable Reports to run automatically" and run it "every hour", and save it.

16. Go back to your output sheet and go to "File" > "Publish to Web"

17. Under "Published content & settings", select you Sheet Name and check "Automatically republish when changes are made". Then click "Start Publishing".

18. Choose "Comma-separated values (.csv) as output format and copy the given link"



### Part b) Getting the data on your blog

1. On the page where you want to show the view data, add a JavaScript file (or edit an existing JavaScript File for that page).

2. Use Fetch API to get the CSV data and parse it using CSVToArray function from this [StackOverflow Answer](https://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data/1293163#1293163)

  {{< highlight js >}}
  ```
   url  = "The link you copied in Step 18 of Part a"
   fetch(url).then((response)=>{
       return response.text()
   }).then((text)=>{
       data = CSVToArray(text)
       viewMap = {}
       for(let i = 15; i < data.length; i++){
           viewMap[window.location.href + data[i][0].slice(1,-1) + data[i][1]] = parseInt(data[i][2])
       }
     }
   })
   ```
	{{ </ hightlight >}}
*You might need to adjust the code according to your needs*

3. You will have a dictionary with your Post URLs as Key and their Views as values.
4. Use them according to your website structure. (You can look at my [blog's code](https://github.com/haideralipunjabi/blog-haideralipunjabi) if you need more help)



------

### Resources

- [Google Analytics Spreadsheet Add-on](https://developers.google.com/analytics/solutions/google-analytics-spreadsheet-add-on)
- [StaticGen - A List of Static Site Generators for JAMstack Sites](https://www.staticgen.com/)
- [Google Analytics Reporting API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/)

----

### Read This On

- Haider Ali Punjabi's Blog
- Medium
- Dev.to