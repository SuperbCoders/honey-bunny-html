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

    // Открываем popup'ы
    $('.open-feedback-done').magnificPopup({
        type: 'inline',
        midClick: true
    });
    
    // Item Feedback Pop

    // RateYo
    $("#rating").rateYo({
        rating: 0,
        fullStar: true,
        starWidth: "32px",
        spacing: "10px",
        onSet: function (rating, rateYoInstance) {
            log("Rating is set to: " + rating);
        }
    });
    // Нажатие на кнопку
    $('#popupPop .btn').click(function(){
        $('#popupPop').find('.step1').hide();
        $('#popupPop').find('.step2').show();
    });

    // Масштабирует (k) svg-иконку звездочки, чтобы можно было подогнать под плагин RateYo
//    function getPoints(k) {
//        var points = '8 12 3.29771798 14.472136 4.19577393 9.23606798 0.39154787 5.52786405 5.64885899 4.76393202 8 0 10.351141 4.76393202 15.6084521 5.52786405 11.8042261 9.23606798 12.702282 14.472136'.split(' ');
//        return points.map(function (p) {
//            return p * k;
//        }).join(' ');
//    }
});