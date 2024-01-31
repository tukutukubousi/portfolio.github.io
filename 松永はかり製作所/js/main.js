$(window).on('load', function () {
  $("#splash-logo").delay(1200).fadeOut('slow');
  //ロゴを1.2秒でフェードアウト

  $("#splash").delay(1500).fadeOut('slow', function () {//splashエリアを1.5秒でフェードアウト

    $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

  });


});


