/**
  * passify.js by Dana Silver (@DanaRSilver)
  * MIT License
**/  

/** CONFIG **/
var PASSWORD_CLASS = ".password";
var PASSWORD_CONFIRM_CLASS = ".password-confirm";

var Strength = {
	alphaLow: .1,
	alphaUp: .15,
	nums: .2,
	special: .25
}

var Patterns = {
	alphaLow: "abcdefghijklmnopqrstuvwxyz",
	alphaUp: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	nums: "0123456789",
	special: "~`!@#$%^&*-_+={}[]|\\:;'<>,./\"?"
}

var Thresholds = {
	dark_red: .25,
	red: .50,
	dark_green: .75,
	green: 1
}
/** END CONFIG **/

function checkPasswordStrength (password) {
	var strength = computeStrength(password),
		dark_red = Thresholds.dark_red,
		red = Thresholds.red,
		dark_green = Thresholds.dark_green,
		green = Thresholds.green;

	if ((strength >= 0) && (strength <= dark_red)) {
		changeColor(PASSWORD_CLASS, "dark_red");
	}
	if ((strength > Thresholds.dark_red) && (strength <= red)) {
		changeColor(PASSWORD_CLASS, "red");
	}
	if ((strength > red) && (strength <= dark_green)) {
		changeColor(PASSWORD_CLASS, "dark_green");
	}
	if ((strength > dark_green) && (strength <= green)) {
		changeColor(PASSWORD_CLASS, "green");
	}
}

function computeStrength (password) {
	var calcStrength = 0,
		maxStrength = totalPatterns(password) / 4;
	for (key in Patterns) {
		calcStrength += Strength[key]*countOccurances(key.toString(), password);
	}
	return Math.min(calcStrength, maxStrength);
}

function countOccurances (pattern, password) {
	var count = 0,
		patternArray = [];
	for (key in Patterns) {
		if (key.toString() === pattern) {
			patternArray = Patterns[key].split("");
		}
	}
	for (var i=0; i < password.length; i++) {
		if (jQuery.inArray(password.charAt(i), patternArray) != -1) {
			count ++;
		}
	}
	return count;
}

function totalPatterns (password) {
	var count = 0;
	for (key in Patterns) {
		if (countOccurances(key.toString(), password) != 0) {
			count ++;
		}
	}
	return count;
}

function changeColor(pickClass, color) {
	if (color === "dark_red") {
		$(pickClass).css({backgroundColor: "rgba(153, 0, 0, .4)", border: "1px solid rgba(153, 0, 0, 1)"});
	}
	else if (color === "red") {
		$(pickClass).css({backgroundColor: "rgba(208, 0, 0, .4)", border: "1px solid rgba(208, 0, 0, 1)"});
	}
	else if (color === "green") {
		$(pickClass).css({backgroundColor: "rgba(41, 245, 34, .4)", border: "1px solid rgba(41, 245, 34, 1)"});
	}
	else if (color === "dark_green") {
		$(pickClass).css({backgroundColor: "rgba(1, 223, 1, .4)", border: "1px solid rgba(1, 223, 1, 1)"});
	}
}

$(document).ready(function () {
	$(PASSWORD_CLASS).keyup(function() {
		checkPasswordStrength($(PASSWORD_CLASS).val());
	});
});