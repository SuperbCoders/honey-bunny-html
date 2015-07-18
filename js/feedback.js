window.jQuery(function ($) {
    'use strict';
    $('.case-products .rates-text').click(function (e) {
        $('.webui-popover').hide();
        var $this = $(this),
            id;
        if ($this.attr('data-pp-opened') === 'false') {
            id = $this.attr('data-id');
            if (!id) {
                window.console.log('data-id attribute must be set in', this, ' for me to be able to load feedbacks');
                return;
            }
            // Открываем выскакивалку
            $this.webuiPopover({
                placement: 'auto',
                animation: 'pop',
                width: 487,
                height: 596,
                trigger: 'manual',
                type: 'async',
                url: 'feedbacks/' + id + '.html',
                content: function (data) {
                    return data;
                }
            });
            $this.webuiPopover('show');
            // Инициализируем perfect scrollbar
            window.Ps.initialize($('.webui-popover-content')[0]);
            $this.attr('data-pp-opened', 'true');
        } else {
            //$('#' + $this.attr('data-target')).hide();
            $('.webui-popover').hide();
            $this.attr('data-pp-opened', 'false');
        }
        e.stopPropagation();
    });
    $(document).click(function () {
        $('.case-products .rates-text').each(function (i, el) {
            if ($(el).attr('data-pp-opened') === 'true') {
                //$('#' + $(el).attr('data-target')).hide();
                $('.webui-popover').hide();
                $(el).attr('data-pp-opened', 'false');
            }
        });
    });
});