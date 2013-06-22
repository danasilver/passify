Passify
=======
A ridiculously simple password validator.

### What it does

* Change the color password field to indicate password strength.
* Provide easily configurable
	* Strength multipliers
	* Color thresholds
	* Password class names

### What it will do soon

* Check if the password meets YOUR needs
* Check if the password matches the "confirm password" field

### What it doesn't do

* Server side password validation
* P ?= NP

## Installation

1. Download `passify.js` and the latest [jQuery](http://jquery.com/download/) build.
2. Change the CONFIG values
	a. Change `"PASSWORD_CLASS"` and `"PASSWORD_CONFIRM_CLASS"` if your inputs have different class names
	b. Change any other values you deem unfit for your product
3. Include the Javascript files (`passify.js` and jQuery) in your page (i.e. html) along with the form