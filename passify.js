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
	num: .2,
	special: .25
}

var Patterns = {
	alphaLow: "abcdefghijklmnopqrstuvwxyz",
	alphaUp: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	nums: "0123456789",
	special: "~`!@#$%^&*-_+={}[]|\\:;'<>,./?"
}

var Thresholds = {
	dark_red: .19,
	red: .39,
	yellow: .59,
	green: .79,
	dark_green: 1
}

// Count with one function, determine which pattern here
// function whichPattern () {

// }

function checkPasswordStrength (password) {
	if (computeStrength(password) <= Thresholds.dark_red) {
		changeColor(PASSWORD_CLASS, "dark_red");
	}
	else if (computeStrength(password) <= Thresholds.red) {
		changeColor(PASSWORD_CLASS, "red");
	}
	else if (computeStrength(password) <= Thresholds.yellow) {
		changeColor(PASSWORD_CLASS, "yellow");
	}
	else if (computeStrength(password) <= Thresholds.green) {
		changeColor(PASSWORD_CLASS, "green");
	}
	else {
		changeColor(PASSWORD_CLASS, "dark_green");
	}
}

/** Compute Strength **/
function computeStrength (password) {
	var strength = countAlphaLows(password)*Strength.alphaLow;
	strength += countAlphaUps(password)*Strength.alphaUp;
	strength += countNums(password)*Strength.num;
	strength += countSpecials(password)*Strength.special;

	if (!anyAlphaLows(password) && !anyAlphaUps(password) && !anyNums(password) && !anySpecials(password)) {
		return strength;
	}
	else if ((anyAlphaLows(password) || anyAlphaUps(password)) && (!anyNums(password) && !anySpecials(password))) {
		if (strength < .4) {
			return strength;
		}
		else {
			return .39;
		}
	}
	else if ((anyAlphaLows(password) || anyAlphaUps(password)) && (anyNums(password) && !anySpecials(password))) {
		if (strength < .6) {
			return strength;
		}
		else {
			return .59;
		}
	}
	else if ((anyAlphaLows(password) || anyAlphaUps(password)) && (anyNums(password) && anySpecials(password))) {
		if (strength <= 1) {
			return strength;
		}
		else {
			return 1;
		}
	}
}

/** Count Occurances of Patterns **/
function countAlphaLows (password) {
	var count = 0,
		alphaLowArray = Patterns.alphaLow.split("");
	for (var i=0; i < password.length; i++) {
		if (jQuery.inArray(password.charAt(i), alphaLowArray) != -1) {
			count ++;
		}
	}
	return count;
}

function countAlphaUps (password) {
	var count = 0,
		alphaUpArray = Patterns.alphaUp.split("");
	for (var i=0; i < password.length; i++) {
		if (jQuery.inArray(password.charAt(i), alphaUpArray) != -1) {
			count ++;
		}
	}
	return count;
}

function countNums (password) {
	var count = 0,
		numArray = Patterns.nums.split("");
	for (var i=0; i < password.length; i++) {
		if (jQuery.inArray(password.charAt(i), numArray) != -1) {
			count ++;
		}
	}
	return count;
}

function countSpecials (password) {
	var count = 0,
		specialArray = Patterns.special.split("");
	for (var i=0; i < password.length; i++) {
		if (jQuery.inArray(password.charAt(i), specialArray) != -1) {
			count ++;
		}
	}
	return count;
}

/** Check for a single occurance of a pattern **/
function anyAlphaLows (password) {
	return countAlphaLows(password) != 0;
}

function anyAlphaUps (password) {
	return countAlphaUps(password) != 0;
}

function anyNums (password) {
	return countNums(password) != 0;
}

function anySpecials (password) {
	return countSpecials(password) != 0;
}

/** Update Color **/
function changeColor(pickClass, color) {
	if (color === "dark_red") {
		$(pickClass).css({backgroundColor: "rgba(153, 0, 0, .4)", border: "1px solid rgba(153, 0, 0, 1)"});
	}
	else if (color === "red") {
		$(pickClass).css({backgroundColor: "rgba(208, 0, 0, .4)", border: "1px solid rgba(208, 0, 0, 1)"});
	}
	else if (color === "green") {
		$(pickClass).css({backgroundColor: "rgba(153, 0, 0, .4)", border: "1px solid rgba(153, 0, 0, 1)"});
	}
	else if (color === "dark_green") {
		$(pickClass).css({backgroundColor: "rgba(1, 223, 1, .4)", border: "1px solid rgba(1, 223, 1, 1)"});
	}
	else if (color === "yellow") {
		$(pickClass).css({backgroundColor: "rgba(255, 255, 0, .4)", border: "1px solid rgba(255, 255, 0, 1)"});
	}
}

$(document).ready(function () {
	$(PASSWORD_CLASS).keyup(function() {
		checkPasswordStrength($(PASSWORD_CLASS).val());
	});
});