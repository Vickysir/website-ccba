
const aboutSubNavMap = new Map([
  ['introduction', 0],
  ['constitution', 1],
  ['architecture', 2],
  ['pinpailicheng', 3],
]);

function addAboutSubnavClassName() {
  const pathname = window.location.pathname.split('/')
  if (pathname.length > 2) {
    const name = pathname[2];
    const lisHTMLCollection = document.querySelector('#subnav').getElementsByTagName('li');
    const curNode = lisHTMLCollection.item(aboutSubNavMap.get(name));
    curNode.setAttribute('class', 'current')

  }
};


