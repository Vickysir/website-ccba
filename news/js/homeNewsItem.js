const prefix = 'data-';
class HomeNewsItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const templatElem = document.getElementById('home-news-item');
    const content = templatElem.content.cloneNode(true);
    content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    content.querySelector('a').title = this.getAttribute(`${prefix}title`);
    content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    content.querySelector('.text').textContent = this.getAttribute(`${prefix}title`);
    content.querySelector('span').textContent = this.getAttribute(`${prefix}time`);
  
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
    content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    content.querySelector('a').title = this.getAttribute(`${prefix}title`);
    content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    content.querySelector('h3').textContent = this.getAttribute(`${prefix}title`);
  
    this.appendChild(content); 
  }
}
window.customElements.define('home-enterprises-item', HomeEnterprisesItem);


function renderItems(data) {
  const parentNode = document.querySelector('.inxnews-list > ul');
  data.slice(2).filter((item, index) => !!item.img_src && index != 1).forEach(item => {
    const liNode = document.createElement("home-news-item");
    liNode.setAttribute('data-title', item.title);
    liNode.setAttribute('data-href', `/news/detail.html?${item.id}`);
    liNode.setAttribute('data-time', item.time);
    liNode.setAttribute('data-src', item.imgPwd);
    liNode.setAttribute('class', "swiper-slide wow animated")
    parentNode.appendChild(liNode);
  });
}

function renderEnterprisesItem(data) {
  const parentNode = document.querySelector('.arrivalsp-min > ul');
  data.forEach(item => {
    const liNode = document.createElement("home-enterprises-item");
    liNode.setAttribute('data-title', item.title);
    liNode.setAttribute('data-href', `/enterprises/detail.html?${item.id}`);
    liNode.setAttribute('data-src', item.url);
    liNode.setAttribute('class', "swiper-slide wow")
    parentNode.appendChild(liNode);
  });
}
