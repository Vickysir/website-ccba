const prefix = 'data-';
class Card extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const templatElem = document.getElementById('enterprisesCardTemplate');
    const content = templatElem.content.cloneNode(true);
    const url = this.getAttribute(`${prefix}src`);

    content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    content.querySelector('a').title = this.getAttribute(`${prefix}title`);
    // content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    // content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    content.querySelector('.pro-img').style.height = '150px';
    // content.querySelector('.pro-img').style.width = '275px';
    content.querySelector('.pro-img').style.backgroundImage = `url('${url}')`;
    content.querySelector('.pro-img').style.backgroundSize = 'cover';
    content.querySelector('.pro-img').style.backgroundPosition =
      'center center';
    content.querySelector('.pro-text').textContent = this.getAttribute(
      `${prefix}title`
    );
    this.appendChild(content);
  }
}
window.customElements.define('enterprises-card', Card);

function renderItem(data, step) {
  const pageNo = window.location.search.slice(1);
  let start = 0;
  let end = step ? step : data.length;
  if (step && Number(pageNo)) {
    start = (pageNo - 1) * step;
    end = pageNo * step;
  }

  const parentNode = document.querySelector('#productlist');
  data.slice(start, end).forEach((img) => {
    const liNode = document.createElement('enterprises-card', {
      'data-title': img.title,
    });
    liNode.setAttribute('data-title', img.title);
    // liNode.setAttribute('data-href', `/enterprises/detail.html?${img.id}`);
    // 禁用跳转
    liNode.setAttribute('data-href', 'javascript:;');
    liNode.setAttribute('data-src', img.url);
    parentNode.appendChild(liNode);
  });
}

function initailPages(name, totalPage) {
  const pageno =
    Number(window.location.search.slice(1)) > 0
      ? Number(window.location.search.slice(1))
      : 1;
  const pageParentNode = document.querySelector('.pages').querySelector('ul');
  const spanNode = document.createElement('span');
  spanNode.innerText = pageno;

  const replaceNode = pageParentNode.querySelector(`#page${pageno}`);
  const replaceParentNode = replaceNode.parentNode;

  replaceParentNode.replaceChild(spanNode, replaceNode);
  replaceParentNode.setAttribute('class', 'thisclass');

  // pageParentNode.querySelector('#prePage').setAttribute('href',`/${name}?${pageno-1}`);
  // pageParentNode.querySelector('#nextPage').setAttribute('href',`/${name}?${pageno + 1}`);

  // if (pageno == 1) {
  //   pageParentNode.removeChild(pageParentNode.querySelector('#firstPage').parentNode);
  //   pageParentNode.removeChild(pageParentNode.querySelector('#prePage').parentNode);
  // }

  // if (pageno == totalPage) {
  //   pageParentNode.removeChild(pageParentNode.querySelector('#nextPage').parentNode);
  //   pageParentNode.removeChild(pageParentNode.querySelector('#tailPage').parentNode);
  // }
}

function addEnterprisesSubnavClassName(map) {
  const pathname = window.location.pathname.split('/');
  const name = pathname[pathname.length - 1].split('.html')[0];
  const lisHTMLCollection = document
    .querySelector('#news-subnav')
    .getElementsByTagName('li');
  const curNode = lisHTMLCollection.item(map.get(name));
  curNode.setAttribute('class', 'current');
}
