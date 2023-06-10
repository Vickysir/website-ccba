const prefix = 'data-';
class HomeNewsItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const templatElem = document.getElementById('home-news-item');
    const content = templatElem.content.cloneNode(true);
    const url = this.getAttribute(`${prefix}src`);
    content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    content.querySelector('a').title = this.getAttribute(`${prefix}title`);
    content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    content.querySelector('.text').textContent = this.getAttribute(`${prefix}title`);
    content.querySelector('span').textContent = this.getAttribute(`${prefix}time`);
  
    content.querySelector('.pro-img').style.backgroundImage = `url('${url}')`;
    content.querySelector('.pro-img').style.backgroundSize = 'cover';
    content.querySelector('.pro-img').style.backgroundPosition =
      'center center';
    this.appendChild(content); 
  }
}
window.customElements.define('home-news-item', HomeNewsItem);

class HomeEnterprisesItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const templatElem = document.getElementById('home-enterprises-item');
    const content = templatElem.content.cloneNode(true);
    // content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    // content.querySelector('a').title = this.getAttribute(`${prefix}title`);
    content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    content.querySelector('h3').textContent = this.getAttribute(`${prefix}title`);
  
    this.appendChild(content); 
  }
}
window.customElements.define('home-enterprises-item', HomeEnterprisesItem);


function renderItems(data) {
  const parentNode = document.querySelector('#inxnews-list1 > ul');
  data.slice(0, 4).filter((item, index) => !!item.img_src ).forEach(item => {
    const liNode = document.createElement("home-news-item");
    liNode.setAttribute('data-title', item.title);
    liNode.setAttribute('data-href', `./news/detail.html?${item.id}`);
    liNode.setAttribute('data-time', item.time);
    liNode.setAttribute('data-src', item.imgPwd);
    liNode.setAttribute('class', "swiper-slide wow animated")
    parentNode.appendChild(liNode);
  });

  const parentNode2 = document.querySelector('#inxnews-list2 > ul');
  data.slice(4, 8).filter((item, index) => !!item.img_src ).forEach(item => {
    const liNode = document.createElement("home-news-item");
    liNode.setAttribute('data-title', item.title);
    liNode.setAttribute('data-href', `./news/detail.html?${item.id}`);
    liNode.setAttribute('data-time', item.time);
    liNode.setAttribute('data-src', item.imgPwd);
    liNode.setAttribute('class', "swiper-slide wow animated")
    parentNode2.appendChild(liNode);
  });
}

function renderEnterprisesItem(data) {
  const parentNode = document.querySelector('#inxenterprises-list1 > ul');
  data.slice(0, 3).forEach((item, index) => {
    const liNode = document.createElement("home-enterprises-item");
    liNode.setAttribute('data-title', item.title);
    // liNode.setAttribute('data-href', `/enterprises/detail.html?${item.id}`);
    liNode.setAttribute('data-href', 'javascrit:;');
    liNode.setAttribute('data-src', item.url);
    if (index == 0 || index == 2) {
      liNode.setAttribute('class', "swiper-slide wow fadeInUp")
    } else if(index == 1) {
      liNode.setAttribute('class', "swiper-slide wow fadeInDown")
    } else {
      liNode.setAttribute('class', "swiper-slide")
    }
    parentNode.appendChild(liNode);
  });

  const parentNode2 = document.querySelector('#inxenterprises-list2 > ul');
  data.slice(3, 6).forEach((item, index) => {
    const liNode = document.createElement("home-enterprises-item");
    liNode.setAttribute('data-title', item.title);
    // liNode.setAttribute('data-href', `/enterprises/detail.html?${item.id}`);
    liNode.setAttribute('data-href', 'javascrit:;');
    liNode.setAttribute('data-src', item.url);
    if (index == 0 || index == 2) {
      liNode.setAttribute('class', "swiper-slide wow fadeInUp")
    } else if(index == 1) {
      liNode.setAttribute('class', "swiper-slide wow fadeInDown")
    } else {
      liNode.setAttribute('class', "swiper-slide")
    }
    parentNode2.appendChild(liNode);
  });
}
