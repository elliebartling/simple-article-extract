import csv
import html
import json
import datetime
import newspaper
from newspaper import Article
from extracted_links import links
articles = []
csv_articles = []

# Defile HTML escape options
html_escape_table = {
   '"': "&quot;",
   "'": "&apos;"
   }

# Open a JSON file
output = open('exports/export.json', 'w')

# Open a CSV file & create CSV writer
# outfile = open('exports/export.csv', 'w')
# writer = csv.writer(outfile, delimiter=',', quotechar='"')

for link in links:
    article = Article(link, language='en', keep_article_html=True)
    article.download()
    article.parse()
    article.nlp()
    print("Downloading... " + article.title)

    html = article.article_html.replace('<img src="', '<img src="http://fee.org')
    title = '<h1>' + article.title + '</h1>'

    # tree = html.fromstring(article)

    subtitle = '<h2>' + article.meta_description + '</h2>'
    content = title + subtitle + html


    date = article.publish_date.isoformat() + '+00:00'
    data = {
        "date" : date,
        "originalURL": link,
        "title": article.title,
        "subtitle": subtitle,
        "summary": article.summary,
        "plainText": article.text,
        "keywords": article.keywords,
        # "articleHTML": html.escape(article.article_html, html_escape_table)
        "articleHTML": content
        }

    # csvData = [date, link, article.title, article.summary, article.text, article.keywords, html.escape(article.article_html, html_escape_table)]
    articles.append(data)
    # csv_articles.append(csvData)


# Write to JSON file
json.dump(articles, output)

# Write to CSV file & close CSV file
# writer.writerows(csv_articles)
# outfile.close()
