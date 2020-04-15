import requests
from bs4 import BeautifulSoup
import re
import csv
import json
import random
# run in terminal to avoid encoding errors for accents:
# export PYTHONIOENCODING=UTF-8

# remove label before colon in string
def val(input_string):
    return input_string.text.split(":",1)[1].strip()

# take a string describing coordinates of latitude and longitude and extract coords as floats to a list
def coords_to_floats(input_string):
    lat_string = input_string.split(",",1)[0].strip()
    lat_list = []
    for s in re.split('N|S|E|W|°|\'|\"', lat_string):
        # print(s)
        try:
            float(s)
            lat_list.append(float(s))
        except ValueError:
            continue
    # print(lat_list)
    lat = (lat_list[0] + lat_list[1]/60 + lat_list[2]/3600)
    if lat_string[0] == 'S': lat = -lat

    lon_string = input_string.split(",",1)[1].strip()
    lon_list = []
    for s in re.split('N|S|E|W|°|\'|\"', lon_string):
        try:
            float(s)
            lon_list.append(float(s))
        except ValueError:
            continue
    lon = (lon_list[0] + lon_list[1]/60 + lon_list[2]/3600)
    if lon_string[0] == 'W': lon = -lon

    return [lat, lon]

# take a string describing dimensions and extract floats to a list
def dims_to_list(input_string):
    dims_list = []
    for s in re.split('m|~|ha|sq| ', input_string):
        # print(s)
        try:
            float(s)
            dims_list.append(float(s))
        except ValueError:
            continue
    return dims_list

urls = []

# random selection of urls
# n = 2
# with open('i_url.csv', mode = 'r', encoding = 'utf8') as csvinput:
#     reader = csv.reader(csvinput)
#     lines = [line for line in reader]
#     for i in range(n):
#         url = random.choice(lines)[1]
#         print(url)
#         urls.append(url)

# specific problem urls
# urls.append('https://www.spomenikdatabase.org/medeno-polje')
# urls.append('https://www.spomenikdatabase.org/jabuka')

# all urls
# with open('i_url.csv', mode = 'r', encoding = 'utf8') as csvinput:
#     reader = csv.reader(csvinput)
#     for row in reader:
#         if row[1] == 'URL': continue
#         # print(row[1])
#         urls.append(row[1])

print()

# prepare data structure for JSON dump
data = {}
data['spomeniks'] = []

try_coords = [
'N44°45\'44.1\", E16°41\'02.2\"',
'N42°53\'45.3\", E20°51\'36.4\"',
'N45°26\'46.4\", E17°28\'36.4\"',
'N43°43\'47.7\", E20°41\'30.6\"',
]
for c in try_coords:
    print(coords_to_floats(c))

for url in urls:

    # find url, parse
    request = requests.get(url)
    soup = BeautifulSoup(request.text, features='lxml')

    # extract title
    title = ''
    try: title = soup.find_all(attrs = {'class' : 'txtNew'})[7].text.strip()
    except: title = None
    print(title)

    # search for text files to then find details
    search_text = soup.find_all(attrs = {'class' : 'txtNew'})

    # extract details based on length of text file div
    info = []
    for i in range(len(search_text)):
        # print(f' text {i} has length {len(search_text[i])}')
        if len(search_text[i]) > 8:
            info = search_text[i].find_all('p')
            # print(f'length of list: {len(info)}')
            break;

    # output info block to scrape
    # file = open('scrape.html', 'w', encoding = 'utf8')
    # for i in range(len(info)):
    #     file.write(f'{info[i].text}\n')

    # extract long name
    name = val(info[1])
    # print(name)

    # extract location string, then split for country and city
    location = val(info[2])
    city = ''
    country = ''
    # print(location)
    try:
        loc_list = [s.strip() for s in re.split(',', location)]
        country = loc_list[len(loc_list)-1].split("(",1)[0]
        city = loc_list[len(loc_list)-2]
        # print(city)
        # print(country)
    except:
        city = None
        country = None

    # extract year and convert to int
    year = ''
    try: year = [int(s) for s in re.split(',| |s', val(info[3])) if s.isdigit()][0]
    except: year = None
    # print(info[3].text)
    # print(year)

    # extract designer, remove parentheses message
    designer = val(info[4]).split("(",1)[0].strip()
    # print(designer)

    # extract coordinates, remove parentheses message, convert to floats
    coords = val(info[5]).split("(",1)[0]
    # print(coords)
    try: [lat, lon] = coords_to_floats(coords)
    except: [lat, lon] = [None, None]
    # print([lat, lon])

    # extract dimension string, convert to list of floats
    dims = val(info[6])
    dims_list = ''
    # print(dims)
    try: dims_list = dims_to_list(dims)
    except: dims_list = dims
    # print(dims_list)

    # extract materials string, convert to list of materials
    materials = [s.lower().strip() for s in re.split(',|and', val(info[7]))]
    # print(materials)

    # extract conditions string, convert to list of descriptors
    condition = [s.lower().strip().split("(",1)[0] for s in re.split(',|and', val(info[8]))]
    # print(condition)

    # append to data to dump in JSON
    data['spomeniks'].append({
        'url' : url,
        'title' : title,
        'name' : name,
        'location' : location,
        'country' : country,
        'city' : city,
        'year' : year,
        'designer' : designer,
        'coords' : [lat, lon],
        'dimensions' : dims_list,
        'materials' : materials,
        'condition' : condition
    })
    # print()

# print(data)
# dump data
with open('data.json', 'w', encoding = 'utf8') as jsonoutput:
    json.dump(data, jsonoutput, ensure_ascii=False)
