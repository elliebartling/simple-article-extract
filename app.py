import csv
import html
import json
import datetime
import newspaper
from newspaper import Article
from extracted_links import links
articles = []
csv_articles = []

html_escape_table = {
   '"': "&quot;",
   "'": "&apos;"
   }

output = open('exports/export.json', 'w')
outfile = open('exports/export.csv', 'w')
writer = csv.writer(outfile, delimiter=',', quotechar='"')

for link in links:
    article = Article(link, language='en', keep_article_html=True)
    article.download()
    article.parse()
    article.nlp()
    print("Downloading... " + article.title)
    date = article.publish_date.isoformat()
    data = {
        "date" : date,
        "originalURL": link,
        "title": article.title,
        "summary": article.summary,
        "plainText": article.text,
        "keywords": article.keywords,
        "articleHTML": html.escape(article.article_html, html_escape_table)
        }
    csvData = [date, link, article.title, article.summary, article.text, article.keywords, html.escape(article.article_html, html_escape_table)]
    articles.append(data)
    csv_articles.append(csvData)


json.dump(articles, output)
writer.writerows(csv_articles)
outfile.close()
