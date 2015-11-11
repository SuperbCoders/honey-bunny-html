'use strict';
/**
   Объект корзины
   @constructor
   @param {string} selector - селектор DOM-элемента для корзины (например "#cart")
 */
function SidebarCart(selector) {
    var self = this;
    self.pause = 4;
    self.speed = 0.4;

    // Private
    var cart = document.querySelector(selector + ' .wrapper'),
    	overlay = document.querySelector(selector + ' .overlay'),
    	overlayActive = false,
    	content = document.querySelector(selector + ' .content'),
    	closeBtn = document.querySelector(selector + ' .header .close'),
        leaveOpened = false;

    /**
		Инициализация коризны
	 */
    this.init = function() {
        // Инициализируем perfect scrollbar
        Ps.initialize(content);
    };

    /**
		Появление корзины и скрытие через определенное время.
		Остальная страница не блокируется
		@param {number} [speed=0.4] - скорость анимации в секундах
		@param {integer} [pause=4] - время через которое корзина скроется
	 */
    this.show = function() {
        TweenMax.to(cart, self.speed, {
            right: 0,
            onComplete: function() {
                setTimeout(function() {
                    if (!leaveOpened) {
                        self.close(self.speed);
                    }
                }, self.pause * 1000);
            }
        });
        
    };

    /**
		Открытие корзины.
		Остальная страница при этом блокируется
		@param {number} [speed=0.4] - скорость анимации в секундах
		@param {integer} [pause=4] - время через которое корзина скроется
	 */
    this.open = function() {
        TweenMax.to(overlay, self.speed, {
            display: 'block',
            opacity: 1
        });
        TweenMax.to(cart, self.speed, {
            right: 0
        });
        overlayActive = true;
    };

    /**
	   Закрытие корзины
	 */
    this.close = function() {
    	if (overlayActive) {
    		TweenMax.to(overlay, self.speed, {
	    	    display: 'none',
	    	    opacity: 0
	    	});
	    	overlayActive = false;
    	}
    	TweenMax.to(cart, self.speed, {
    	    right: -340
    	});
    };

    // Обработчик клика по кнопке закрытия корзины
    closeBtn.addEventListener('click', function() {
    	self.close();
    });
    // Наводим курсор и удерживаем коризну открытой
    cart.addEventListener('mouseenter', function() {
        leaveOpened = true;
    });
    // Убираем курсор и закрываем корзину через 4 сек
    cart.addEventListener('mouseleave', function() {
        leaveOpened = false;
        setTimeout(function() {
            if (!leaveOpened) {
                self.close(self.speed);
            }
        }, self.pause * 1000);
    });

}

var sidebarCart = new SidebarCart('#sidebar-cart');
sidebarCart.init();