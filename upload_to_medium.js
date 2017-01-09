require('dotenv').config()

const medium = require('medium-sdk')
const open = require('open')
const fs = require('fs')
const colors = require('colors')
const config = require('./config.js')
var data = require('./exports/export.json')


const token = process.env.TOKEN;
const redirectUrl = 'http://ellenbartling.com/callback/medium';
const client = new medium.MediumClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
})

client.setAccessToken(token)

const articles = require('./exports/export_test.json');

function uploadArticles (articles) {

  client.getUser((err, user) => {
    if (err) {
      throw new Error(err)
    }

    console.log(('Medium API: Authenticated successfully as ' + user.username).blue)


    // Initiate loop
    for (a = 0; a < articles.length; a++) {

      var title = articles[a].title;
      var canonicalUrl = articles[a].originalURL;
      var content = articles[a].articleHTML;
      var date = articles[a].date;
      var tags = '';

      console.log('Uploading... ' + title);

      client.createPost({
        userId: user.id,
        title: title,
        content: content,
        canonicalUrl: canonicalUrl,
        contentFormat: medium.PostContentFormat.HTML,
        publishStatus: medium.PostPublishStatus.DRAFT,
        publishedAt: date
      }, (err, post) => {
        if (err) {
          throw new Error(err)
        }

        console.log('Draft post ' + title + ' published to Medium.com'.green)

        open(post.url)
      })
    }
    // End for loop
  });
}

uploadArticles(articles);
