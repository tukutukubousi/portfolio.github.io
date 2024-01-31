// ページ読み込み時の設定
const spHeight = window.innerHeight;
document.documentElement.style.setProperty("--vh", spHeight / 100 + "px");

$(window).on("load", function () {
  $(".js-loader").delay(300).fadeOut(600);
  $(".js-loader-bg").delay(700).fadeOut(600);
});
setTimeout("stoploading()", 5000);
function stoploading() {
  $(".js-loader-bg").fadeOut(600);
}