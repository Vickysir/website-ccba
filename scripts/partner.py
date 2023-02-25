import json

from bs4 import BeautifulSoup
import requests

from lxml import html

base_url = 'http://www.ccba.ie'

def get_soup(url):
  res = requests.get(url)
  content = res.text
  soup = BeautifulSoup(content, 'lxml')
  return soup

def get_soup_decode(url):
  res = requests.get(url)
  content = res.text.encode('raw_unicode_escape').decode()
  soup = BeautifulSoup(content, 'lxml')
  return soup

def download_img_by_imgsrc(url, pwd):
  soup = get_soup(url)
  img_tag = soup.find("div", attrs={"class": "logo"})
  if(img_tag):
    src = img_tag.img['src']

    target_url = url + src
    if(src[0] == 'h'):
      target_url = src
    print(target_url)

    res = requests.get(target_url)
    # with open(pwd, 'wb') as f:
    #   f.write(res.content)
  print('======downimg success======')

def write_html(message, pwd):
  f = open(pwd,'w')
  f.write(message)
  f.close()


def get_item_info(item, i):
  text = item.a.string
  href = item.a['href']
  pwd = '/Users/sijiahag/mycode/miniProgram/website-ccba/ECMS_DGSJ/images/partner-' + str(i) + '.png'
  if (href[0] == 'h'):
    print('======downimg======', i)
    if (i != 7):
      download_img_by_imgsrc(href, pwd)
  return {
    "title": text,
    "href": href,
    "imgPwd": './ECMS_DGSJ/images/partner-' + str(i) + '.png',
  }

def get_li_list(url):
  print('------------start------------')
  soup = get_soup_decode(url)
  ul = soup.find("div", attrs={"class": "link_txt"}).ul
  data = []
  i = 1
  for i in range(0, len(ul.find_all('li'))):
    item = ul.find_all('li')[i]
    info = get_item_info(item, i)
    data.append(info)
    i += 1
  return data

def add_id_and_print(data):
  i = 1
  for item in data:
    item['id'] = i
    i += 1
    print(item, ',')
  return data

def main(): 
  url1 = base_url

  data1 = get_li_list(url1)
  print()
  print('-----------------------------')
  add_id_and_print(data1)
  print()
  print('---------------end--------------')



main()