// ページ読み込み時の設定
$('head').append(
    '<style>body{display:none;}'
);
$(window).on("load", function () {
    $('body').fadeIn("slow");
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
