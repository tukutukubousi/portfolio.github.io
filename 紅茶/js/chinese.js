// ページ読み込み時の設定
$('head').append(
    '<style>body{display:none;}'
);
$(window).on("load", function () {
    $('body').fadeIn("slow");
});

// 画像アニメーションの設定
function fadeAnime() {

    $('.img').each(function () {
        var elemPos = $(this).offset().top - 20;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('fadeUp');
        }
    });
}

$(window).scroll(function () {
    fadeAnime();
});