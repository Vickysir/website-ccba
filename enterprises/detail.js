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

function detaiMain(imgData) {
  const data = getPageDataById(id, imgData);
  if (data) {
    document.querySelector('#enterprises-articleInfo').innerHTML = data.content || data.title;
    document.querySelector('#enterprises-detail-title').innerHTML = data.title;
    document.querySelector('#enterprises-detail-subtitle').href = `/enterprises/detail.html?${data.id}`;
    document.querySelector('#enterprises-detail-subtitle').innerHTML = data.title;

    writeLinkNode(Number(id) - 1, '#enterprises-foot-last', imgData);
    writeLinkNode(Number(id) + 1, '#enterprises-foot-next', imgData);
  }
}

