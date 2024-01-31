// ページ読み込み時の設定
const spHeight = window.innerHeight;
document.documentElement.style.setProperty("--vh", spHeight / 100 + "px");

$(window).on("load", function () {
  $(".js-loader").delay(700).fadeOut(1200);
  $(".js-loader-bg").delay(900).fadeOut(1000);
});
setTimeout("stoploading()", 5000);
function stoploading() {
  $(".js-loader-bg").fadeOut(600);
}