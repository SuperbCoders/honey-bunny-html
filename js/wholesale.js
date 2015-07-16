window.jQuery(function ($) {
    'use strict';

    // Открываем popup'ы
    $('.open-feedback-done').each(function () {
        $(this).magnificPopup({
            type: 'inline',
            midClick: true
        });
    });

    // Переключение вкладок в табличке с заказами
    if ($('.table-zippy').length > 0) {
        $('.table-zippy tr.heading').click(function () {
            var closestTable = $(this).closest('table');
            closestTable.siblings().removeClass('active');
            if (closestTable.hasClass('active')) {
                closestTable.removeClass('active');
            } else {
                closestTable.addClass('active');
            }
        });
    }

});
