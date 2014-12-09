//tag推荐弹窗


!(function(){
  var currUser={
      userName:"",
      userNick:'',
      userInfo:"",
      desc : '',
      avatar:""
    };
  var prodLogo = "none";
  var $oScriptTag =$("#toolbar-tpl-scriptId");
  var skin =$oScriptTag.attr("skin")=="black"?" csdn-toolbar-skin-black ":"";
  var fixed = $oScriptTag.attr("fixed")=="top"?" navbar-fixed-top ":"";
  var prodIndex= $oScriptTag.attr("domain")?$oScriptTag.attr("domain"):window.location.protocol+"//"+window.location.host;
      prodIndex+='?ref=toolbar_logo';
  var getCookie =function (objName){//获取指定名称的cookie的值
      var arrStr = document.cookie.split("; ");
      for(var i = 0;i < arrStr.length;i ++){
      var temp = arrStr[i].split("=");
      if(temp[0] == objName) return decodeURI(temp[1]);
      }
  }
  var HTMLEncode =function(str) {
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
      return s;
    }
  var AUtoAvatar = function(AU){
    if(!AU||!currUser.userName){
      return false;
    }
    var _AUPath = AU.split("").join("/");
    var userName = currUser.userName&&currUser.userName.toLowerCase();
    return "http://avatar.csdn.net/"+_AUPath+"/2_"+userName+".jpg";
  }
  var hasLogin = false;
  var loginMark ="unlogin";
  function checkLogin(callback) {
          currUser.userNick = getCookie("UserNick") ||currUser.userNick;
          currUser.userName = getCookie("UserName") || currUser.userName;
          currUser.userInfo = getCookie("UserInfo") || currUser.userInfo;
          currUser.avatar = AUtoAvatar(getCookie("AU")) || currUser.avatar;
          currUser.desc = getCookie("UD") || currUser.desc;
          if(getCookie("UD")){
            currUser.desc = HTMLEncode(decodeURIComponent(currUser.desc).replace(/\+/g," "));
          }
          callback(currUser);
    }
  checkLogin(function(currUser){
    if(currUser.userName&&currUser.userInfo){
        hasLogin = true;
    }
    loginMark = hasLogin?"":"unlogin";
  })

  /*
  * init pord logo
  */
  var prodJSON = {
      "blog" : "blog-icon",
      "download" : "down-icon",
      "bbs" : "bbs-icon",
      "my" :"space-icon",
      "code" : "code-icon",
      "share" : "share-icon",
      "tag" : "tag-icon",
      "dashboard":"dashboard-icon",
      "news" : "news-icon",
      "tag" : "tag-icon",
      "ask" : "ask-icon",
      "notify" : "notify-icon"
  }
  if(prodJSON[$oScriptTag.attr("prod")]){
    prodLogo=prodJSON[$oScriptTag.attr("prod")]||$oScriptTag.attr("prod");
  }

  // $( 'head' ).append( '<link rel="stylesheet" href="//csdnimg.cn/public/common/toolbar/css/font-awesome.min.css">' );

  var tpl ='\<div class="csdn-toolbar'+skin+fixed+'">\
        <div class="container row center-block ">\
          <div class="pull-left logo clearfix"></div>\
          <div class="pull-right login-wrap '+loginMark+'">\
            <ul class="btns">\
              <li class="loginlink"></li>\
              <li >\
                <div >\
                  <div >\
                    <div >\
                      <div></div>\
                    </div>\
                  </div>\
                </div>\
              </li>\
              <li class="profile">\
                <div class="icon on-profile-icon">\
                  <div class="wrap clearfix">\
                    <div class="curr-icon-wrap">\
                      <div class="curr-icon"></div>\
                    </div>\
                    <div class="bd">\
                      <dl class="clearfix">\
                        <dt class="pull-left img"></dt>\
                        <dd class="info"></dd>\
                      </dl>\
                    </div>\
                    <div class="ft clearfix"></div>\
                  </div>\
                </div>\
              </li>\
            </ul>\
          </div>\
        </div>\
    </div>';
  $(document.body).append($(tpl));
})();
