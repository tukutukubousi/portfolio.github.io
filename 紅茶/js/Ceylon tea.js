// ページ読み込み時の設定
$('head').append(
    '<style>body{display:none;}'
);
$(window).on("load", function () {
    $('body').fadeIn("slow");
});

// ツールチップの設定
$(function () {
    $('.tooltip').hide();
    $('.ctc').hover(
    function () {
        $(this).children('.tooltip').fadeIn('fast');
    },
    function () {
        $(this).children('.tooltip').fadeOut('fast');
    });
});

tippy('.cap', {
	placement: 'top-start',
	animation: 'shift-toward-subtle',
	theme: 'light-border',
	duration: 200,
}
)