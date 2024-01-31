// ページ読み込み時の設定
$('head').append(
  '<style>body{display:none;}'
);
$(window).on("load", function () {
  $('body').fadeIn("slow");
});

// アコーディオンパネルの設定
$(function () {
  $('.accordion_one .ac_header').click(function () {
    $(this).next('.ac_inner').slideToggle();
    $(this).toggleClass("open");
  });
});