import json

from bs4 import BeautifulSoup
import requests

from lxml import html

def get_soup(url):
  res = requests.get(url)
  soup = BeautifulSoup(res.text, 'lxml')
  return soup


def get_item_info(item):
  time = item.span.string
  text = item.a.string
  return {
    "time": time,
    "name": text.split(' ')[0],
    "job": text.split(' ')[1],
  }

def get_li_list(url):
  soup = get_soup(url)
  ul = soup.find("div", attrs={"class": "articleList"}).ul
  data = []
  for item in ul.find_all('li'):
    info = get_item_info(item)
    data.append(info)
  return data

def add_id_for_data(data):
  i = 1
  pendingData = []
  for item in data:
    item['id'] = i
    i += 1
    print(item)
  return data

def get_all_data():
  url1 = 'http://www.ccba.ie/plus/list.php?tid=18'
  url2 = 'http://www.ccba.ie/plus/list.php?tid=18&TotalResult=49&PageNo=2'
  url3 = 'http://www.ccba.ie/plus/list.php?tid=18&TotalResult=49&PageNo=3'

  data1 = get_li_list(url1)
  data2 = get_li_list(url2)
  data3 = get_li_list(url3)

  data = add_id_for_data(data1 + data2 + data3)

  return data

    

def main():
    
    data = get_all_data()
    # for i in range(1, 6):
    #     print('-------------page', i, '----------------')
    #     data_list = get_page_img_list_by_url(base_url + str(i))
    #     total_img += data_list

    # i = 1
    # data = []
    # for img in total_img:
    #     d = {
    #         'id': i,
    #         'title': img['title'],
    #         'url': img['url'],
    #         'link': img['link'],
    #         'content': img['content'],
    #     }
    #     data.append(d)
    #     i = i+1
    # print(data)
    
main()

# print(get_content('http://www.ccba.ie/a/team/189.html'))