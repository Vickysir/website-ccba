const language = localStorage.getItem('language');


function initial() {
  if (language == 'EN') {
    $(".switch-language a").eq(1).addClass("language-red");
  } else {
    $(".switch-language a").eq(0).addClass("language-red");
  }

  if (language && language === 'EN') {
    enSelect();
  } else {
    cnSelect();
  }

  $('.switch-language a').eq(0).on('click', function () {
    cnSelect();
  });
  
  $('.switch-language a').eq(1).on('click', function () {
    enSelect();
  });

  $('.mobile-language-cn').eq(0).on('click', function () {
    cnSelect();
    $('.mobile-language-cn').hide();
    $('.mobile-language-en').show();
  });
  
  $('.mobile-language-en').eq(0).on('click', function () {
    enSelect();
    $('.mobile-language-en').hide();
    $('.mobile-language-cn').show();
  });
}

function cnSelect() {
  $(".switch-language a").eq(1).removeClass("language-red");
  $(".switch-language a").eq(0).addClass("language-red");
  localStorage.setItem('language', 'CN');
  getlanguageJson('../language/index_cn.json', translateIndexPages);
}

function enSelect() {
  $(".switch-language a").eq(0).removeClass("language-red");
  $(".switch-language a").eq(1).addClass("language-red");
  localStorage.setItem('language', 'EN');
  getlanguageJson('../language/index_en.json', translateIndexPages);
}

function flatArray(arr) {
  let peddingArr = [];
  arr.forEach(item => {
    peddingArr = peddingArr.concat(item);
  });

  return peddingArr;
}

function getlanguageJson(url, translatePages) {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    async: false,
    success: function (data) {
      translatePages(data);
    },
  });
}

function translateTitle(data) {
  $('title').text(data);
};

function translateHeadAndFoot(data) {
  let navArr = data.nav;
  let subNavArr = flatArray(data.subnav);
  $('.header-nav li h3 a').each(function (index) {
    $(this).text(navArr[index]);
  });

  $('.header-nav li .sub-nav a').each(function (index) {
    $(this).text(subNavArr[index]);
  });

  $('#footnav li a').each(function (index) {
    $(this).text(navArr[index]);
  });
}

function translateIndexPages(data) {
  if (data) {
    // #### nav
    translateHeadAndFoot(data);
    translateTabPages(data);
    const more = data.more;
    const enterprises = data.enterprises;

    $('.index-more a').each(function () {
      $(this).text(more);
    });

    $('.enterprises-tab a').each(function (index) {
      $(this).text(enterprises[index]);
    });

    $('.par-content h2').each(function () {
      $(this).text(data.about);
    });
    
  } else {
    console.error('error;', 'index翻译配置文件未获取到...');
  }
}

function translateMenu(data) {
  $('.menu a').each(function(index) {
    $(this).text(data[index]);
  })
}

function translateContact(data) {
  const { title, contact,contactValue, message} = data;
  $('.clumb-title h3').each(function (index) {
    $(this).text(title[index])
  });
  $('.infor h3').eq(0).text(contact[0]);

  $('.infor p').each(function (index) {
    $(this).find('.name').text(contact[index + 1])
  })
  $('.infor p').each(function (index) {
    $(this).find('.text').text(contactValue[index + 1])
  })

  $('.Comprepair span').each(function (index) {
    $(this).text(message[index])
  })

  $('.lisubmit input').attr('value', message[message.length - 1]);
  
}

function translateTabPages(data) {
  const pathNameList = window.location.pathname.split('/');
  const path = pathNameList[pathNameList.length -2];

  switch(path) {
    case "about":
      translateMenu(data.subnav[0]);
      translateTitle(data.nav[1] + ' - ' + data.title);
      break;
    case "enterprises":
      translateTitle(data.nav[2] + ' - ' + data.title);
      break;
    case "news":
      translateMenu(data.subnav[1]);
      translateTitle(data.nav[3] + ' - ' + data.title);
      break;
    case "chineseSchool":
      $('.clumb-title h3').each(function (index) {
        $(this).text(data.nav[5]);
      });
      translateTitle(data.nav[4] + ' - ' + data.title);
      break;
    case "contact":
      translateContact(data.contact);
      translateTitle(data.nav[5] + ' - ' + data.title);
      break;
    default:
      translateTitle(data.title);
  }
}

$(function() {
  initial();
})
