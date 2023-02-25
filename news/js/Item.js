const prefix = 'data-';
class NewsItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const templatElem = document.getElementById('news-item');
    const content = templatElem.content.cloneNode(true);
    content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    content.querySelector('a').title = this.getAttribute(`${prefix}title`);
    content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    content.querySelector('h3').textContent = this.getAttribute(`${prefix}title`);
    content.querySelector('span').textContent = this.getAttribute(`${prefix}time`);
    content.querySelector('.desc').textContent = this.getAttribute(`${prefix}desc`);

    this.appendChild(content); 
  }
}
window.customElements.define('news-item', NewsItem);


function renderItems(data, step) {
  const pageNo = window.location.search.slice(1);
  let start = 0;
  let end = step;
  if (Number(pageNo)) {
    start = (pageNo - 1) * step;
    end = pageNo * step;
  }
  const parentNode = document.querySelector('#newscenter-list');
  data.slice(start, end).forEach(item => {
    const liNode = document.createElement("news-item");
    liNode.setAttribute('data-title', item.title);
    liNode.setAttribute('data-href', `/news/detail.html?${item.id}`);
    liNode.setAttribute('data-time', item.time);
    liNode.setAttribute('data-desc', item.desc);
    liNode.setAttribute('data-src', item.imgPwd);
    parentNode.appendChild(liNode);
  });
}


function addNewsSubnavClassName(map) {
  const pathname = window.location.pathname.split('/');
  if (!!pathname[2]) {
    const name = pathname[2].split('.html')[0];
    const lisHTMLCollection = document.querySelector('#news-subnav').getElementsByTagName('li');
    const curNode = lisHTMLCollection.item(map.get(name));
    curNode.setAttribute('class', 'current')
  }
}
