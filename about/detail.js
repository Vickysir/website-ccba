const id = Number(window.location.search.slice(1)) > 1 ? Number(window.location.search.slice(1)) : 1;

function getPageDataById(id, data) {
  if (id < 1) {
    return;
  }
  for (var i = 0; i < data.length; i ++) {
    if (data[i].id == id) {
      return data[i];
    }
  }
}

function writeLinkNode(id, nodeIdString, data) {
  var curData = getPageDataById(id, data);
  var thisNode = document.querySelector(nodeIdString)
  if (curData) {
    thisNode.href = '/about/membership/detail.html?' + id;
    thisNode.innerHTML = curData.name;
  } else {
    thisNode.parentElement.innerHTML = '';
  }
}

function changeSubNavTitle() {}

function detailMain(sourceData) {
  const data = getPageDataById(id, sourceData);
  if (data) {
    document.querySelector('#membership-articleInfo').innerHTML = data.job || data.name;
    document.querySelector('#membership-detail-title').innerHTML = data.name;
    document.querySelector('#membership-detail-subtitle').href = `/about/membership/detail.html?${data.id}`;
    document.querySelector('#membership-detail-subtitle').innerHTML = data.name;

    writeLinkNode(Number(id) - 1, '#membership-foot-last', sourceData);
    writeLinkNode(Number(id) + 1, '#membership-foot-next', sourceData);
  }
}

