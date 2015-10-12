$(document).ready(function(){
	var keyPressed = "";
	var keyArrayToPress = "";
	var alphabet = "]1234567890-=йцукенгшщзхъфывапролджэёячсмитьбю";
	var $displayKeysToPress = $('#text');
	var keyArrayToPressLength = 40;
	var rightPress =0;
	var falsePress= 0;
	var colorClasses = ["rightKeyColor", "falseKeyColor", "nextKeyColor"];
	var counterForRightPress = $('#counterForRight');
	var counterForFalsePress = $('#counterForWrong');	
	
	function randomLetters(alphabet, length) {
		var keyArrayToPressLocal = "";

		for (var i = 0; i < length; i++) {

			var randomNumber = Math.floor((Math.random()*alphabet.length)+1);

			keyArrayToPressLocal += alphabet.charAt(randomNumber);
		};
		return keyArrayToPressLocal;
	};

	keyArrayToPress = randomLetters(alphabet, keyArrayToPressLength);

	$displayKeysToPress.attr("value", keyArrayToPress);

	function setColorOfKeyOnKeyboard(key, classToAdd) {
		$('.letter').each( function() {
			var $letter = $(this);

			if ($letter.text() === key) {
				$letter.addClass(classToAdd);
			}
		});
	};

	function resetColorOfKeysOnKeyboard(colorClasses) {
		$('.letter').each(function(){
			var $letter = $(this);

			colorClasses.forEach(function(colorClass){
				$letter.removeClass(colorClass);
			});
		});
	}

	$displayKeysToPress.keypress(function(event) {
		keyPressed = String.fromCharCode(event.which);

		resetColorOfKeysOnKeyboard(colorClasses);

		if (keyArrayToPress.charAt(0) === keyPressed ) {
			keyArrayToPress = keyArrayToPress.slice(1);
			$displayKeysToPress.attr("value", keyArrayToPress);
			rightPress++;
			counterForRightPress.text(rightPress);
			$displayKeysToPress.addClass("rightKeyColor");
			setInterval(function() {
				$displayKeysToPress.removeClass("rightKeyColor");
			}, 200);
			//setColorOfKeyOnKeyboard(keyPressed, "rightKeyColor");
		} else {
			falsePress++;
			counterForFalsePress.text(falsePress);
			$displayKeysToPress.addClass("falseKeyColor");
			setInterval(function() {
				$displayKeysToPress.removeClass("falseKeyColor");
			}, 200);
			//setColorOfKeyOnKeyboard(keyPressed, "falseKeyColor");
		};
		setColorOfKeyOnKeyboard(keyArrayToPress.charAt(0), "nextKeyColor");
	});
	setColorOfKeyOnKeyboard(keyArrayToPress.charAt(0), "nextKeyColor");
	$displayKeysToPress.focus();
});