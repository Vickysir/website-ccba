import json

from bs4 import BeautifulSoup
import requests

from lxml import html

def get_ul_tag_list_by_url(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'lxml')
    ul_list = soup.body.find(id = 'right_con').find('ul')
    return ul_list

def get_img_info_obj(ul):
    pre_img_url = 'http://www.ccba.ie'
    pre_pwd = '/Users/sijiahag/mycode/miniProgram/website-ccba'
    img_list = ul.find_all('img')
    a_list = ul.find_all('a')
    link_list = []
    for i in range(0, len(a_list), 2):
        link_list.append(a_list[i]['href'])

    img_info_list = []
    for i in range(0, len(img_list)):
        img = img_list[i]
        link = link_list[i]
        src = img['src']
        img_url = pre_img_url + src
        img_split_src = src.split('/')
        img_name = img_split_src.pop().split('.')[0] 
        img_pwd = pre_pwd + '/'.join(img_split_src)
        content = get_content(pre_img_url + link)
        img_info = {
            'url': img_url,
            'name': img_name,
            'title': img['alt'],
            'pwd': img_pwd + '/' + img_name + '.jpg',
            'link': pre_img_url + link,
            'content': content,
        }
        img_info_list.append(img_info)
    return img_info_list


def download_img(img):
    res = requests.get(img['url'])
    with open(img['pwd'], 'wb') as f:
        f.write(res.content)
    # text = '------------' + str(i) + '--------------'
    # i = i + 1
    # if ( i % 10 == 0):
    #     print(text)

def get_li_ele():
    # ele = "        <li class="col-xs-6 col-sm-3">
    #       <a href="/a/team/189.html" title="TT Glass">
    #         <p class="pro-img"><img src="/uploads/allimg/201110/1-201110224H10-L.jpg" alt="TT Glass"></p>
    #         <p class="pro-text">TT Glass</p>
    #       </a>
    #     </li>"
    soup = BeautifulSoup(open('./enterprises/index.html'), 'lxml')
    new_tag = soup.new_tag("a", href="http://www.example.com")
    soup.body.append(new_tag)
    
def get_page_img_list_by_url(url):
    ul_list = get_ul_tag_list_by_url(url)
    img_obj = get_img_info_obj(ul_list)
    return img_obj

def get_content(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'lxml')
    content = soup.body.find(id = 'right_con').find('div', class_="articleInfo")
    if (content.string is None):
        return content.string
    return content.string.strip()  
    


def main():
    base_url = 'http://www.ccba.ie/plus/list.php?tid=5&TotalResult=65&PageNo='
    total_img = []
    for i in range(1, 6):
        print('-------------page', i, '----------------')
        data_list = get_page_img_list_by_url(base_url + str(i))
        total_img += data_list

    # pwd = '/Users/sijiahag/mycode/miniProgram/website-ccba/img.json'
    # j = json.dumps({ 'data': 123 })
    # with open(pwd, 'wb') as f:
    #     json.dump({ 'data': 123 }, f, indent=2)
    # print(type(j))

    i = 1
    data = []
    for img in total_img:
        d = {
            'id': i,
            'title': img['title'],
            'url': img['url'],
            'link': img['link'],
            'content': img['content'],
        }
        data.append(d)
        i = i+1
    print(data)
    
main()

# print(get_content('http://www.ccba.ie/a/team/189.html'))