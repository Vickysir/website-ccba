class HomePartnerItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const templatElem = document.getElementById('home-partner-item');
    const content = templatElem.content.cloneNode(true);
    content.querySelector('a').href = this.getAttribute(`${prefix}href`);
    content.querySelector('img').src = this.getAttribute(`${prefix}src`);
    content.querySelector('img').alt = this.getAttribute(`${prefix}title`);
    this.appendChild(content); 
  }
}
window.customElements.define('home-partner-item', HomePartnerItem);


function renderPartnerItem(data) {
  const parentNode = document.querySelector('.partner-wrapper > ul');
  data.forEach(item => {
    const liNode = document.createElement("home-partner-item");
    liNode.setAttribute('data-title', item.title);
    // liNode.setAttribute('data-href', `/enterprises/detail.html?${item.id}`);
    liNode.setAttribute('data-href', item.href);
    liNode.setAttribute('data-src', item.imgPwd);
    liNode.setAttribute('class', "swiper-slide")
    parentNode.appendChild(liNode);
  });
}