module.exports = {
  // Where is a list of links you want to collect?
  "link_base": "[url-to-paginated-author-archive]",
  "host": "[base-url.org]",

  // Cheerio uses this selector to find the urls
  "html_link_selector": "jquery-style-html-selector",

  // In our case, the author page is paginated, so we want to
  // pass a parameter to the request that crawls each paginated page
  "pages_to_crawl": 5,

  "medium_user": "elliembartling"

}
