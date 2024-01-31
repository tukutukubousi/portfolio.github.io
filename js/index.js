// ローディング画面の動き
$(window).on('load', function () {
  $("#splash").delay(2000).fadeOut('slow');
  $("#splash_logo").delay(1500).fadeOut('slow');
});ß

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime() {

  //ふわっと動くきっかけのクラス名と動きのクラス名の設定
  $('.fadeUpTrigger').each(function () { //fadeInUpTriggerというクラス名が
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height()
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp');
      // 画面内に入ったらfadeInというクラス名を追記
    } else {
      $(this).removeClass('fadeUp');
      // 画面外に出たらfadeInというクラス名を外す
    }
  });
}

