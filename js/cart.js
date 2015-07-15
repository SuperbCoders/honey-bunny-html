window.jQuery(function ($) {
    'use strict';
    // Переключение методов оплаты для мобильного варианта корзины
    $('.payment-method .method').click(function () {
        $(this).add($(this).siblings()).removeClass('current');
        $(this).addClass('current');
    });
});