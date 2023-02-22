import json

from bs4 import BeautifulSoup
import requests
import time

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

def download_img_by_imgsrc(src, pwd):
  if(src[0] == 'h'):
    return
  pre_img_url = 'http://www.ccba.ie'
  pre_pwd = '/Users/sijiahag/mycode/miniProgram/website-ccba'
  url = pre_img_url + src
  pwd = pre_pwd + pwd

  res = requests.get(url)
  with open(pwd, 'wb') as f:
    f.write(res.content)

def get_desc(data):
  desc = data[0]
  i = 0
  while(len(desc) < 100):
    i+=1
    desc = desc + '''
    ''' + data[i]
  return desc


def get_article_info(url, name):
  soup = get_soup_decode(url)
  articleInfoSoup = soup.find("div", attrs={ "class": "articleInfo" })
  imgs = articleInfoSoup.find_all('img')
  strings = list(articleInfoSoup.stripped_strings)
  i = 0

  if (len(imgs) > 1):
    first_img = imgs[0]
    first_imgPwd = '/uploads/news/' + name + '-1' + '.jpg'

    # 批量下载图片
    for soup in imgs:
      src = soup["src"]
      i += 1
      # 下载不是http开头的
      if (src[0] == '/'):
        new_pwd = '/uploads/news/' + name + '-' + str(i) + '.jpg'
        print('------------', name + '-' + str(i), '------------')
        download_img_by_imgsrc(src, new_pwd)
      # 等于0说明第一张是http开头的资源
      elif(i == 1):
        first_imgPwd = src
        print('无法处理的图片')
        print('------------', name + '-' + str(i + 1), '------------')
      else:
        print('无法处理的图片')
        print('------------', name + '-' + str(i + 1), '------------')
        
    return {
      "desc": get_desc(strings),
      "imgPwd": first_imgPwd,
      "img_src": first_img["src"],
    }

  return {
    "desc": get_desc(strings),
    "imgPwd": "",
    "img_src": "",
  }

  # for child in articleInfoSoup.children:
  #   print(child)
  #   print('-----------------------')

def get_item_info(item, name):
  print('------------', name, '------------')
  time = item.span.string
  text = item.a.string
  href = item.a['href']
  article_info = get_article_info(base_url + href, name)
  return {
    "time": time,
    "title": text,
    "href": href,
    "imgPwd": article_info["imgPwd"],
    "img_src": article_info["img_src"],
    "desc": article_info["desc"],
  }

def get_li_list(url, name):
  print('------------', name, '------------')
  soup = get_soup(url)
  ul = soup.find("div", attrs={"class": "articleList"}).ul
  data = []
  i = 1
  for item in ul.find_all('li'):
    info = get_item_info(item, str(i) + '-' + name)
    data.append(info)
    time.sleep(1)
    i += 1
  return data

def add_id_and_print(data, name):
  pendingData = []
  i = 1
  for item in data:
    item['id'] = str(i)+ '-' + name
    i += 1
    print(item, ',')
  return data

def getp_shdt_data(): 
  url1 = 'http://www.ccba.ie/plus/list.php?tid=12'

  data1 = get_li_list(url1, 'shdt')
  print('-----------------------------')
  print()
  add_id_and_print(data1, 'shdt')
  print()
  print('-----------------------------')

def getp_announcement_data():
  #   Announcement
  url2 = 'http://www.ccba.ie/plus/list.php?tid=13'

  data2 = get_li_list(url2, 'announcement')
  print('-----------------------------')
  print()
  add_id_and_print(data2, 'announcement')
  print()
  print('-----------------------------')

def getp_news_data():
  #   news
  url3 = 'http://www.ccba.ie/plus/list.php?tid=21'

  data3 = get_li_list(url3, 'news')
  print('-----------------------------')
  print()
  add_id_and_print(data3, 'news')
  print('-----------------------------')
  print()

def main():
  getp_news_data()
    
main()