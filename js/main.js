//let buttonDisplay = document.getElementById("display");
const mainSettings = document.getElementById("main-settings");
const textToDisplay = document.getElementById("text-to-display");
const textStatic = document.getElementById("text-static");
const textNeon = document.getElementById("text-neon");
const textGlow3D = document.getElementById("text-glow3d");

const textToDisplayContainer = document.getElementById("text-to-display-container");
const changeFontFamilyContainer = document.getElementById("font-selector-container");
const fontsFamily = document.querySelectorAll('[attr-font]');
const inputFontColor = document.getElementById("font-color-to-display");
const inputBackgroundColor = document.getElementById("background-color-to-display");
const blur = document.getElementById("blur");

const iconMainSettings = document.getElementById("icon-main-settings");
const iconTextStatic = document.getElementById("text-movement");
const iconBlinkText = document.getElementById("blink");
const iconBlinkFull = document.getElementById("blink-full");
const iconFontFamily = document.getElementById("font-selector");

let body = document.body;
const typed = document.getElementById("typed");

let settingsItems = document.querySelectorAll(".setting-option:not(.unselectable)");
/*const displayedText = document.querySelectorAll('.displayed-text');*/

const colorPicker = document.getElementById("color-picker-panel-container");

const iconColorPickerFont = document.getElementById('font-color');
const iconColorPickerBackground = document.getElementById('background-color');

const iconExtrasTv = document.getElementById('extras-tv');
const iconExtrasNeon = document.getElementById('extras-neon');
const iconExtrasGlow3D = document.getElementById('extras-glow3d');
const iconExtrasCandle = document.getElementById('extras-candle');
const iconExtrasSparks = document.getElementById('extras-sparks');
const iconExtrasSky = document.getElementById('extras-sky');
const iconExtrasXbox = document.getElementById('extras-xbox');

const settingsTop = document.getElementById('settings-top');
const settingsBottom = document.getElementById('settings-bottom');
const hideSettings = document.getElementById('hide-settings');

let currentFont = "Led Bus"
let currentFontColor = "#8B949A";
let currentBackgroundColor = "#1F232A";

let fontSize = 700;
let enableBlink = true;
let blink = true;
let settingsHidden = false;
let element = textStatic;
let moveCount = 100;

function writeAction() {
	if (textToDisplayContainer.style.display === "none") {
		textToDisplayContainer.style.display = "block";
		blur.style.display = "block";
		document.getElementById("text-to-display").focus();
	}
	else {
		textToDisplayContainer.style.display = "none";
		blur.style.display = "none";
	}

	highlightSelectedIcon(iconFontFamily);
}

function toggleMainSettings() {
	if (mainSettings.style.display === "none") {
		mainSettings.style.display = "block";
		blur.style.display = "block";
	}
	else {
		mainSettings.style.display = "none";
		blur.style.display = "none";
	}
}

/* Blink */
let blinkInterval;

function toggleBlinkText() {
	if (enableBlink) {
		enableBlink = false;
		blinkInterval = setInterval(startBlinkText, 200);
		iconBlinkFull.setAttribute("onclick", "");
	}
	else {
		enableBlink = true;
		clearInterval(blinkInterval);
		changeColor();
		iconBlinkFull.setAttribute("onclick", "toggleBlinkFull()");
	}
}
function startBlinkText() {
    if (blink) {
        element.style.color = currentFontColor;
        blink = false;
    }
    else {
       	element.style.color = "transparent";
        blink = true;
    }
}

function toggleBlinkFull() {
	if (enableBlink) {
		enableBlink = false;
		blinkInterval = setInterval(startBlinkFull, 200);
		iconBlinkText.setAttribute("onclick", "");
	}
	else {
		enableBlink = true;
		clearInterval(blinkInterval);
		changeColor();
		iconBlinkText.setAttribute("onclick", "toggleBlinkText()");
	}
}
function startBlinkFull() {
    if (blink) {
    	body.style.backgroundColor = currentBackgroundColor;
        element.style.color = currentFontColor;
        blink = false;
    }
    else {
       	body.style.backgroundColor = currentFontColor;
       	element.style.color = currentBackgroundColor;
        blink = true;
    }
}


/* Text */
function display(element) {
	chooseElement(element);

	element.innerHTML = textToDisplay.value;

	//getFontColor();
	//getBackgroundColor();
}
function enableStatic(force = false) {
	textMovementWidth = textStatic.offsetWidth * (-1);
	bodyClass = "text-movement";

	if (body.classList.contains(bodyClass) || force) {
		moveTextStop();
	}
	else {
		moveTextStart();
	}
}
let textMovementInterval;
function moveTextStart() {
	//textMovementInterval = setInterval(moveText, 20);
	body.classList.add(bodyClass);
	textStatic.classList.add('track');
	iconTextStatic.innerHTML = "stop_circle";
	textStatic.classList.add("movement");
}
function moveTextStop() {
	//clearInterval(textMovementInterval);
	body.classList.remove(bodyClass);
	textStatic.classList.remove('track');
	textStatic.style.left = "";
	iconTextStatic.innerHTML = "play_circle";
	textStatic.classList.remove("movement");
}

function moveText() {
    textStatic.style.left = moveCount+"%";
    currentLeftPosition = window.getComputedStyle(textStatic).getPropertyValue("left").replace("px", "");
    if (currentLeftPosition <= textMovementWidth) {
        moveCount = 100
    }
    else {
        moveCount--;
    }
}

/* Font size */
function fontMagnify() {
	fontSize += 100;
	fontChangeSize();
}
function fontReduce() {
	if (fontSize === 100) return;
	fontSize -= 100;
	fontChangeSize();
}
function fontChangeSize() {
	const displayedTexts = document.getElementsByClassName("displayed-text");
	for (let i = 0; i < displayedTexts.length; i++) {
	  displayedTexts[i].style.fontSize = fontSize + "%";
	}
}
function fontFamilyChange() {
	if (changeFontFamilyContainer.style.display === "none") {
		changeFontFamilyContainer.style.display = "block";
		blur.style.display = "block";
	}
	else {
		changeFontFamilyContainer.style.display = "none";
		blur.style.display = "none";
	}

	highlightSelectedIcon(iconFontFamily);
	
}

/* Colors */
firstTime = true;
function showColorPicker() {
	if (colorPicker.style.display === "none") {
		colorPicker.style.display = "block";
		blur.style.display = "block";
	}
	else {
		colorPicker.style.display = "none";
		blur.style.display = "none";
	}
	
	if (firstTime) {
		new ColorPicker();
		firstTime = false;
	}
}
function getFontColor() {
	currentFontColor = inputFontColor.value;
	rgb = toRGB(currentFontColor);
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
	changeColor();
}
function getBackgroundColor() {
	currentBackgroundColor = inputBackgroundColor.value;
	changeColor();
}
function changeColor() {
	chooseElement();
	element.style.color = currentFontColor;

	const displayedTexts = document.getElementsByClassName("display-text");
	for (let i = 0; i < displayedTexts.length; i++) {
	  displayedTexts[i].style.color = currentFontColor;
	}
	
	body.style.backgroundColor = currentBackgroundColor;
	//iconColorPickerBackground.style.backgroundColor = currentBackgroundColor;
}

function invertColor(rgb) {
	rgb = toRGB(rgb);
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 

    invertedR = rgb[1] * -1 + 255;
	invertedG = rgb[2] * -1 + 255;
	invertedB = rgb[3] * -1 + 255;

	hideSettings.style.color = "rgb(" + invertedR + ", " + invertedG + ", " + invertedB + ")";
} 
const toRGB = (color) => {
    const { style } = new Option();
    style.color = color;
    return style.color;
}
function hideSettingsBar() {
	if (settingsHidden) {
		//invertColor(currentBackgroundColor);
		settingsTop.classList.remove("hidden");
		settingsBottom.classList.remove("hidden");
		settingsHidden = false;
		hideSettings.classList.remove('settings-hidden');
		hideSettings.style.color = "#8B949A";
	}
	else {
		invertColor(currentBackgroundColor);
		settingsTop.classList.add("hidden");
		settingsBottom.classList.add("hidden");
		hideSettings.classList.add('settings-hidden');
		settingsHidden = true;
	}
}

let fontBodyClass;
/* LISTENERS */
textToDisplay.addEventListener("input",(event)=>{
	display(element);
	const displayedTexts = document.getElementsByClassName("display-text");
	for (let i = 0; i < displayedTexts.length; i++) {
	  displayedTexts[i].innerHTML = textToDisplay.value;
	}
});
fontsFamily.forEach((fontFamilyOption) => {
	fontFamilyOption.addEventListener("click",(event)=>{
		fontBodyClass = fontFamilyOption.getAttribute('attr-font');
		document.body.setAttribute("class", fontBodyClass);

		fontFamilyChange();
	});
});


settingsItems.forEach(element => {
  element.addEventListener('click', () => {
    highlightSelectedIcon(element);
  });
});

/* REVIEWED OK */
blur.addEventListener("click",(event)=>{
	if (colorPicker.style.display !== "none" || changeFontFamilyContainer.style.display !== "none" || mainSettings.style.display !== "none" || textToDisplayContainer.style.display !== "none") {
		colorPicker.style.display = "none";
		blur.style.display = "none";
		changeFontFamilyContainer.style.display = "none";
		mainSettings.style.display = "none";
		textToDisplayContainer.style.display = "none";
	}
});
iconColorPickerFont.addEventListener("click",(event)=>{
	showColorPicker();
	elementToChange = "font";
});
iconColorPickerBackground.addEventListener("click",(event)=>{
	showColorPicker();
	elementToChange = "background";
});

