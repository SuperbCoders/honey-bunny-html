'use strict';
/**
   Объект корзины
   @constructor
   @param {string} selector - селектор DOM-элемента для корзины (например "#cart")
 */
function SidebarCart(selector) {
    // Public
    this.show = show;
    this.open = open;
    this.close = close;
    this.init = init;

    // Private
    var cart = document.querySelector('#sidebar-cart .wrapper'),
    	overlay = document.querySelector('#sidebar-cart .overlay'),
    	overlayActive = false,
    	content = document.querySelector('#sidebar-cart .content'),
    	closeBtn = document.querySelector('#sidebar-cart .header .close');

    /**
		Инициализация коризны
	 */
    function init() {
        // Инициализируем perfect scrollbar
        Ps.initialize(content);
    }

    /**
		Появление корзины и скрытие через определенное время.
		Остальная страница не блокируется
		@param {number} [speed=0.4] - скорость анимации в секундах
		@param {integer} [pause=3] - время через которое корзина скроется
	 */
    function show(speed, pause) {
        speed = speed ? speed : 0.4;
        pause = pause ? pause : 3;
        TweenMax.to(cart, speed, {
            right: 0
        });
        TweenMax.to(cart, speed, {
            right: -340,
            delay: pause
        });
    }

    /**
		Открытие корзины.
		Остальная страница при этом блокируется
		@param {number} [speed=0.4] - скорость анимации в секундах
		@param {integer} [pause=3] - время через которое корзина скроется
	 */
    function open(speed, pause) {
    	speed = speed ? speed : 0.4;
        pause = pause ? pause : 3;
        TweenMax.to(overlay, speed, {
            display: 'block',
            opacity: 1
        });
        TweenMax.to(cart, speed, {
            right: 0
        });
        overlayActive = true;
    }

    /**
	   Закрытие корзины
	 */
    function close(speed, pause) {
    	speed = speed ? speed : 0.4;
        pause = pause ? pause : 3;
    	if (overlayActive) {
    		TweenMax.to(overlay, speed, {
	    	    display: 'none',
	    	    opacity: 0
	    	});
	    	overlayActive = false;
    	}
    	TweenMax.to(cart, speed, {
    	    right: -340
    	});
    }

    // Обработчик клика по кнопке закрытия корзины
    closeBtn.addEventListener('click', function() {
    	close();
    });

}

var sidebarCart = new SidebarCart('#sidebar-cart');
sidebarCart.init();