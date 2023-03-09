
const aboutSubNavMap = new Map([
  ['introduction', 0],
  ['membership', 1],
  // ['architecture', 2],
  // ['pinpailicheng', 3],
]);

function addAboutSubnavClassName() {
  const pathname = window.location.pathname.split('/');
  const name = pathname[pathname.length -1].split('.');
  const lisHTMLCollection = document.querySelector('#subnav').getElementsByTagName('li');
  const curNode = lisHTMLCollection.item(aboutSubNavMap.get(name[0]));
  curNode.setAttribute('class', 'current')
};


