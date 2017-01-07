// Configuration
var config = require('./config.js');
var link_base = config.link_base;
var pages = config.pages_to_crawl;

// Libraries
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");

// Init blank links array
var links = [];


function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var path = response.request.headers.referer;
    // Load response body into Cheerio
    var $ = cheerio.load(body);

    // Find authors box and all H2 links in it
    $(config.html_link_selector).each(function() {
      links.push('\n\'' + config.host + $(this).attr('href') + '\'');
    });

    // Where we at?
    console.log("Loading articles from " + path);
    console.log(links.length);

    writeToFile();
  }
}

// Recursively write to our data file because we don't really
// know when each page is going to return its response
function writeToFile() {
  fs.writeFile('extracted_links.py', 'links = [' + links + ']');
}


for (i = 1; i < pages + 1; i++) {
  var url = link_base + '?page=' + i;
  request({url: url}, callback);
}
