const id = window.location.search.slice(1)

function getPageDataById(id, imgData) {
  if (id < 1) {
    return;
  }
  for (var i = 0; i < imgData.length; i ++) {
    if (imgData[i].id == id) {
      return imgData[i];
    }
  }
}

function writeLinkNode(id, nodeIdString, imgData) {
  var curData = getPageDataById(id, imgData);
  var thisNode = document.querySelector(nodeIdString)
  if (curData) {
    thisNode.href = '/enterprises/detail.html?' + id;
    thisNode.innerHTML = curData.title;
  } else {
    thisNode.parentElement.innerHTML = '';
  }
}

function changeSubNavTitle() {}

function detailMain(imgData) {
  const data = getPageDataById(id, imgData);
  if (data) {
    document.querySelector('head > title').innerHTML = data.title;
    document.querySelector('#enterprises-articleInfo').innerHTML = data.content || data.title;
    document.querySelector('#enterprises-detail-title').innerHTML = data.title;
    // document.querySelector('#enterprises-detail-subtitle').href = `/enterprises/detail.html?${data.id}`;
    // document.querySelector('#enterprises-detail-subtitle').innerHTML = data.title.length > 30 ? data.title.slice(0, 29) + '...' : data.title;;

    writeLinkNode(Number(id) - 1, '#enterprises-foot-last', imgData);
    writeLinkNode(Number(id) + 1, '#enterprises-foot-next', imgData);
  }
}

