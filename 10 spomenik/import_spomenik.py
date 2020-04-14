# Import libraries
import requests
# import urllib.request
import csv # for reading csv spomenik data
import unidecode # for decoding accents from names in csv
# import time
# from bs4 import BeautifulSoup
# import pandas as pd

with open('spomenik_source.csv', mode = 'r', encoding = 'utf8') as csvinput, open('output.csv', mode = 'w', encoding = 'utf8') as csvoutput:
    reader = csv.reader(csvinput)
    writer = csv.writer(csvoutput, lineterminator='\n')

    all = []

    row = next(reader)
    row.append('URL')
    all.append(row)

    for row in reader:
        cityname = unidecode.unidecode(row[0])
        url = 'https://www.spomenikdatabase.org/' + cityname.lower().replace(' ', '-')
        # urls[cityname] = url
        print(f'city is {cityname} and to search {url}')

        request = requests.head(url)
        if request.status_code < 400:
            print('  site exists!')
            row.append(url)
        else:
            print('  site does not exist.')
            row.append('')
        all.append(row)

    writer.writerows(all)


# pandas implementation
# csv_input = pd.read_csv('spomenik_source.csv')
# csv_input['url'] = 'https://www.spomenikdatabase.org/' + unidecode.unidecode(csv_input['Spomenik City']).lower().replace(' ', '-')
# csv_input.to_csv('output.csv', index=False)
