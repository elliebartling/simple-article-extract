module.exports = {
  // Where is a list of links you want to collect?
  "link_base": "http://fee.org/people/daniel-bier/",
  "host": "http://fee.org",

  // Cheerio uses this selector to find the urls
  "html_link_selector": ".member-post-box .article h2 a",

  // In our case, the author page is paginated, so we want to
  // pass a parameter to the request that crawls each paginated page
  "pages_to_crawl": 5,
}
