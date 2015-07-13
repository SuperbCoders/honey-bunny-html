window.jQuery(function ($) {
    'use strict';
    var menu = $('.page-header-top .navbar .items'),
        items = menu.find('.collapsable').not('.first'),
        firstItem = menu.find('.collapsable.first'),
        cart = $('.page-header-top .cart'),
        cartPinned = false,
        win = $(window),
        navbar = $('header .navbar .navbar-cnt');

    // Разворачивание буковок меню
    function unfoldLetters() {
        menu.removeClass('collapsed');
        // Чтобы не было видно перенесенных вниз букв ссылок меню в начале анимации
        //        navbar.css('overflow', 'hidden');
        //        var timer,
        //            i = 1;
        //        timer = setInterval(function () {
        //            if (i > 9) {
        //                clearInterval(timer);
        //                navbar.css('overflow', 'visible');
        //            } else {
        //                items.css('margin-left', (i * 25 / 9));
        //                items.css('letter-spacing', (i - 9));
        //                firstItem.css('letter-spacing', (i - 9));
        //                i = i + 1;
        //            }
        //        }, 30);
    }

    // Сворачивание буковок меню
    function foldLetters() {
        //        navbar.css('overflow', 'hidden');
        //        var timer,
        //            i = 9;
        //        timer = setInterval(function () {
        //            if (i < 0) {
        //                menu.addClass('collapsed');
        //                clearInterval(timer);
        //            } else {
        //                items.css('margin-left', (i * 25 / 9));
        //                items.css('letter-spacing', (i - 9));
        //                firstItem.css('letter-spacing', (i - 9));
        //                i = i - 1;
        //            }
        //        }, 30);
        menu.addClass('collapsed');
    }

    // Нажатие на кнопку "Купить" сворачивает меню
    $('.btn.btn-orn').click(foldLetters);
    // Клик по точкам в меню восстанавливает свернутое меню
    menu.find('.item.dots').click(unfoldLetters);

    // При скроллинге вниз добавим заливку корзине
    win.scroll(function () {
        if (win.scrollTop() > 75 && !cartPinned) {
            cart.addClass('bg-filled');
            cartPinned = true;
        } else if (win.scrollTop() < 76 && cartPinned) {
            cart.removeClass('bg-filled');
            cartPinned = false;
        }
    });
});