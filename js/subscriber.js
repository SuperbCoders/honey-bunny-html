// Требует jQuery, GreenSock libs
// Верстка должна быть сохранена в первозданном виде

function Subscriber (id) {

	var subscriber = $(id),
		wasClicked = false,
		buble = subscriber.find('.subscriber-buble'),
		kolobokCnt = subscriber.find('.kolobok-cnt'),
		kolobokWink = kolobokCnt.find('.kolobok-wink'),
		btnClose = $('#subscriber-close'),
		timelineShowMe = new TimelineLite({paused: true}),
		jumpTween = new TimelineMax({
			paused: true,
			repeat: 1
		}),
		jumpInterval;
		window.jumpTween = jumpTween,
		emailConfirmEl = $('#subscriber-email-confirm');

	/*
	 * Анимашки
	 */

	// Первое появление (после загрузки страницы)
	timelineShowMe
		.fromTo(subscriber, 0.5, {y:85}, {y:0, ease:Back.easeOut})
		.fromTo(buble, 0.5, {rotationY:90}, {
			rotationY:0, 
			transformOrigin:'right', 
			onComplete: function() { timelineShowMe.kill() }
		})

	// Подпрыгивание
	jumpTween
		.to(kolobokCnt, 0.2, {y:-30, ease:Power2.easeOut})
		.to(kolobokCnt, 0.4, {y:0, ease:Bounce.easeOut, onComplete: function() {
			if (wasClicked) {
				stopJumping();
				jumpTween.kill();
			}
		}});

	/*
	 * Обработчики
	 */

	// Через 2.5 секунды после создания показываемся
	setTimeout(function() {
		timelineShowMe.play(0)
	}, 2500);

	// Пусть колобок иногда подпрыгивает, пока на него не обратят внимание
	jumpInterval = setInterval(function () {
		if (!wasClicked) jumpTween.play(0)
	}, 5000);

	function stopJumping () {
		wasClicked = true;
		clearInterval(jumpInterval);
		subscriber.addClass('clicked');
		// Пригодится после закрытия окошка
		subscriber.removeClass('closed');
		// Если анимация в движении, пусть тогда остановится уже после проигрывания
		// в onComplete()
		if (jumpTween.progress() === 1) jumpTween.kill();
	}

	// Перестаем прыгать после клика где-нибудь в контейнере
	subscriber.click(function(e) {
		if (e.target == buble[0] || e.target ==  kolobokWink[0]) stopJumping()
	});

	// Кнопка закрытия
	btnClose.click(function() {
		subscriber.removeClass('clicked').addClass('closed')
	});

	// Показываем финальный экранчик (подтверждение подписки)
	function showFinal () {
		subscriber.removeClass('clicked').addClass('subscribed')
		var timer = setTimeout(function () {
			subscriber.removeClass('subscribed').addClass('closed')
			clearInterval(timer);
		}, 5000);
	}

	subscriber.find('.subscribe-button').click(showFinal);

	// Отображение введенной почты в финальном экранчике
	subscriber.find('.subscriber-email').keyup(function(e) {
		emailConfirmEl.text(e.target.value);
	});

}

// Обьект занимается анимациями и переключением окошек
var subscriber = new Subscriber("#subscriber");
