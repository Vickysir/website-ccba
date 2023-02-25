// [类型， 数据总数]
const NewsDetailMap = new Map([
  ['shdt', 12],
  ['announcement', 4],
  ['news', 11],
]);

function getNewsDetailPageData(data, params) {
  if (!params) {
    return;
  }
  for (let i = 0; i < data.length; i ++) {
    if (data[i].id == params) {
      return data[i];
    }
  }
}

function getNextLinkParams() {
  const search = window.location.search.slice(1);
  const [type, id] = search.split('-');
  const maxNum = NewsDetailMap.get(type);
  let peddingParams = 1;
  if (Number(id) == maxNum) {
    switch(type) {
      case 'shdt':
        peddingParams = 'announcement-1';
      case 'announcement':
        peddingParams = 'news-1';
      default:
        peddingParams = ''
    }
  } else {
    peddingParams = type + '-' + String(Number(id) + 1);
  }
  return peddingParams;
}

function getPreLinkParams() {
  const search = window.location.search.slice(1);
  const [type, id] = search.split('-');
  let peddingParams = 1;
  if (Number(id) == 1) {
    switch(type) {
      case 'news':
        peddingParams = 'announcement-1';
      case 'announcement':
        peddingParams = 'shdt-1';
      default:
        peddingParams = ''
    }
  } else {
    peddingParams = type + '-' + String(Number(id) - 1);
  }
  return peddingParams;
}

function writeLinkNode(data) {
  const preParams = getPreLinkParams();
  const nextParams = getNextLinkParams();
  const preNode = document.querySelector('#news-foot-pre');
  const nextNode = document.querySelector('#news-foot-next');

  if (!preParams) {
    preNode.parentElement.innerHTML = '';
  } else {
    const curData = getNewsDetailPageData(data, preParams);
    preNode.href = '/news/detail.html?' + preParams;
    preNode.innerHTML = curData.title;
  }

  if (!nextParams) {
    nextNode.parentElement.innerHTML = '';
  } else {
    const curData = getNewsDetailPageData(data, nextParams);
    nextNode.href = '/news/detail.html?' + nextParams;
    nextNode.innerHTML = curData.title;
  }
}

function renderNewsDetail(data) {
  const search = window.location.search.slice(1);
  const matchData = getNewsDetailPageData(data, search);
  if (matchData) {
    document.querySelector('head > title').innerHTML = matchData.title;
    document.querySelector('#news-detail-title').innerHTML = matchData.title;
    document.querySelector('#news-detail-time').innerHTML = matchData.time;
    // document.querySelector('#news-detail-subtitle').href = `/news/detail.html?${matchData.id}`;
    // document.querySelector('#news-detail-subtitle').innerHTML = matchData.title.length > 16 ? matchData.title.slice(0, 15) + '...' : matchData.title;
    writeLinkNode(data)
  }
}

function getArticlePwd() {
  const search = window.location.search.slice(1);
  let pwd = './' + search.split('-').join('/') + '.html'
  if (!search) {
    pwd =  "./shdt/1.html";
  }
  return pwd;

}

