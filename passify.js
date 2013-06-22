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
	var strength = countOccurances("alphaLow", password)*Strength.alphaLow;
	strength += countOccurances("alphaUp", password)*Strength.alphaUp;
	strength += countOccurances("nums", password)*Strength.nums;
	strength += countOccurances("special", password)*Strength.special;

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
function countOccurances (pattern, password) {
	var count = 0,
		patternArray = [];
	for (key in Patterns) {
		if (key.toString() === pattern) {
			patternArray = Patterns[key.toString()].split("");
		}
	}
	for (var i=0; i < password.length; i++) {
		if (jQuery.inArray(password.charAt(i), patternArray) != -1) {
			count ++;
		}
	}
	return count;
}

/** Check for a single occurance of a pattern **/
function anyAlphaLows (password) {
	return countOccurances("alphaLow", password) != 0;
}

function anyAlphaUps (password) {
	return countOccurances("alphaUp", password) != 0;
}

function anyNums (password) {
	return countOccurances("nums", password) != 0;
}

function anySpecials (password) {
	return countOccurances("special", password) != 0;
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