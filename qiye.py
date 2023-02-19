from bs4 import BeautifulSoup
import requests

from lxml import html
# url='https://movie.douban.com/' #需要爬数据的网址

# tree=html.fromstring(page.text) 
# result=tree.xpath('//td[@class="title"]//a/text()')

def get_img_tag_list_by_url(url):
    res =requests.get(url)
    soup = BeautifulSoup(res.text, 'lxml')
    img_list = soup.body.find(id = 'right_con').find('ul').find_all('img')
    return img_list


def main():
    url = 'http://www.ccba.ie/plus/list.php?tid=5'
    pre_img_url = 'http://www.ccba.ie'
    img_list = get_img_tag_list_by_url(url)
    print(img_list)