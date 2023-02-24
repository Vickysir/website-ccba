function initailPages(pageNo, totalPage, name) {
  const pageParentNode = document.querySelector('.pages').querySelector('ul');
  const spanNode = document.createElement('span');
  spanNode.innerText = pageNo;

  const replaceNode = pageParentNode.querySelector(`#page${pageNo}`);
  const replaceParentNode = replaceNode.parentNode;

  replaceParentNode.replaceChild(spanNode, replaceNode);
  replaceParentNode.setAttribute('class', 'thisclass');

  pageParentNode.querySelector('#prePage').setAttribute('href',`/${name}?${pageNo-1}`);
  pageParentNode.querySelector('#nextPage').setAttribute('href',`/${name}?${pageNo + 1}`);

  if (pageNo == 1) {
    pageParentNode.removeChild(pageParentNode.querySelector('#firstPage').parentNode);
    pageParentNode.removeChild(pageParentNode.querySelector('#prePage').parentNode);
  }

  if (pageNo == totalPage) {
    pageParentNode.removeChild(pageParentNode.querySelector('#nextPage').parentNode);
    pageParentNode.removeChild(pageParentNode.querySelector('#tailPage').parentNode);
  }
}

function getPgaeNo() {
  const pageNo = Number(window.location.search.slice(1)) > 0 ? Number(window.location.search.slice(1)) : 1;
  return pageNo;
}