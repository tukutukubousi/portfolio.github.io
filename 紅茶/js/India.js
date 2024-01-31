// ページ読み込み時の設定
$('head').append(
    '<style>body{display:none;}'
);
$(window).on("load", function () {
    $('body').fadeIn("slow");
});

// 画像アニメーションの設定
function fadeAnime() {

    $('.resizeimage').each(function () {
        var elemPos = $(this).offset().top - 50;
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

// モーダルウィンドウの設定
$(".info").modaal({
    overlay_close: true,
    before_open: function () {
        $('html').css('overflow-y', 'hidden');
    },
    after_close: function () {
        $('html').css('overflow-y', 'scroll');
    }
});

