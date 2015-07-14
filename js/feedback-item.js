window.jQuery(function ($) {
    'use strict';
    var itemId,
        feedbacksContainer = $('#feedbacksContainer'),
        feedbacksCount,
        btnMore = $('#btnMore');

    function log(msg) {
        window.console.log(msg);
    }

    // Загружаем отзывы из feedbacks/itemN.html
    // Номер item'а берем из аттрибута body data-item
    itemId = parseInt($('body').attr('data-item'), 10);
    if (itemId > 0) {
        feedbacksContainer.load('feedbacks/item' + itemId + '.html', function () {
            // Подсчитаем количество отзывов и запишем число в кнопку
            feedbacksCount = feedbacksContainer.find('.item').length;
            if (feedbacksCount > 3) {
                btnMore.css('display', 'inline-block');
                btnMore.find('.feedbacks-left').text(feedbacksCount - 3);
            }
        });
    }

    // Отзывы подгружены, но отображены только первые три (из CSS).
    // Отобразим остальные.
    btnMore.click(function () {
        feedbacksContainer.find('.item').show();
        $(this).hide();
    });
});