$(document).ready(function(){
	var keyPressed = "";
	var keyArrayToPress = "";
	var symbols = "]-=/>";
	var numbers = "1234567890";
	var letters = "аовлыфджэпркгушцщйзхъёенмтсьчбяюи";
	var alphabet = letters;
	var $displayKeysToPress = $('#text');
	var keyArrayToPressLength = 10;
	var rightPress =0;
	var falsePress = 0;
	var colorClasses = ["rightKeyColor", "falseKeyColor", "nextKeyColor"];
	var $counterForRightPress = $('#counterForRight');
	var $counterForFalsePress = $('#counterForWrong');
	var $keyboardFingerColors = $('#keyboardFingerColors');
	var $checkNumbers = $('#checkNumbers');
	var $checkHideKeys = $('#checkHideKeys');
	var $currentLevel = $('#currentLevel');
	var $leftToType = $('#leftToType');
	var currentLevel = 1;
	var maxLevel = 23;

	
	function randomLetters(alphabet, length) {
		var keyArrayToPressLocal = "";

		for (var i = 0; i < length; i++) {

			var randomNumber = Math.floor((Math.random()*alphabet.length)+1)-1;

			keyArrayToPressLocal += alphabet.charAt(randomNumber);
		};
		return keyArrayToPressLocal;
	};

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

	function checkForNextLevel () {
		if (keyArrayToPress === "") {
			checkForRestartLevel();
		};
	}

	function checkForRestartLevel() {
		if (falsePress === 0) {
			increaseLevel();
		} else {
			initialise();
		}
	}

	$displayKeysToPress.keypress(function(event) {
		keyPressed = String.fromCharCode(event.which);

		resetColorOfKeysOnKeyboard(colorClasses);

		if (keyArrayToPress.charAt(0) === keyPressed ) {
			keyArrayToPress = keyArrayToPress.slice(1);
			$displayKeysToPress.attr("value", keyArrayToPress);
			rightPress++;
			$displayKeysToPress.addClass("rightKeyColor");
			setInterval(function() {
				$displayKeysToPress.removeClass("rightKeyColor");
			}, 500);
			checkForNextLevel();
			//setColorOfKeyOnKeyboard(keyPressed, "rightKeyColor");
		} else {
			falsePress++;
			$displayKeysToPress.addClass("falseKeyColor");
			setInterval(function() {
				$displayKeysToPress.removeClass("falseKeyColor");
			}, 500);
			//setColorOfKeyOnKeyboard(keyPressed, "falseKeyColor");
		};
		updateCounterDisplay();
		setColorOfKeyOnKeyboard(keyArrayToPress.charAt(0), "nextKeyColor");
	});

	function updateCounterDisplay() {
		$counterForRightPress.text(rightPress);
		$counterForFalsePress.text(falsePress);
		$leftToType.text(keyArrayToPress.length + ' left');
	}

	$keyboardFingerColors.click(function() {
		$('.letter').toggleClass("keyColor");
		$('#fingerSet').toggle();
	});

	$checkNumbers.click(function() {
		if ( $checkNumbers.is(':checked') ) {
			alphabet = numbers + letters;
		}
		else {
			alphabet = letters;
		}
		initialise();
	});

	$checkHideKeys.click(function() {
		if ( $checkHideKeys.is(':checked') ) {
			$('.letter').addClass('letter--hide');
		}
		else {
			$('.letter').removeClass('letter--hide');
		}
	});

	function updateLevelDisplay() {
		$currentLevel.text('Level ' + currentLevel);
		alphabet = letters.substr(0, currentLevel*2);
	}

	function increaseLevel() {
		if (currentLevel < maxLevel) {
			currentLevel++;
			initialise();
		}
	}

	function decreaseLevel() {
		if (currentLevel > 1) {
			currentLevel--;
			initialise();
		}
	}

	$('#rightArrow').click(function() {
		increaseLevel();
	});

	$('#leftArrow').click(function() {
		decreaseLevel();
	});

	function initialise() {
		rightPress = 0;
		falsePress = 0;

		keyArrayToPress = randomLetters(alphabet, keyArrayToPressLength*currentLevel);
		$displayKeysToPress.attr("value", keyArrayToPress);
		
		$('.letter').removeClass("nextKeyColor");
		setColorOfKeyOnKeyboard(keyArrayToPress.charAt(0), "nextKeyColor");
		$displayKeysToPress.focus();
		
		updateCounterDisplay();
		updateLevelDisplay();
	}
	initialise();
});