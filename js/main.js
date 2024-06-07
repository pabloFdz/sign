//let buttonDisplay = document.getElementById("display");
const mainSettings = document.getElementById("main-settings");
const textToDisplay = document.getElementById("text-to-display");
const textStatic = document.getElementById("text-static");
const textNeon = document.getElementById("text-neon");
const textGlow3D = document.getElementById("text-glow3d");
let textMarquee = document.getElementById("text-marquee");

const changeFontFamilyContainer = document.getElementById("font-selector-container");
const fontsFamily = document.querySelectorAll('[attr-font]');
const inputFontColor = document.getElementById("font-color-to-display");
const inputBackgroundColor = document.getElementById("background-color-to-display");
const blur = document.getElementById("blur");

const iconMainSettings = document.getElementById("icon-main-settings");
const iconTextStatic = document.getElementById("enable-static");
const iconTextMarquee = document.getElementById("enable-marquee");
const iconBlinkText = document.getElementById("blink");
const iconBlinkFull = document.getElementById("blink-full");
const iconFontFamily = document.getElementById("font-selector");

let body = document.body;
const typed = document.getElementById("typed");

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


let slidingText = false; // false Static | true Marquee

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
	highlightSelectedIcon(iconBlinkText);
}
function startBlinkText() {
    if (blink) {
        element.style.color = currentFontColor;
        blink = false;
    }
    else {
       	element.style.color = currentBackgroundColor;
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
	highlightSelectedIcon(iconBlinkFull);
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
function enableStatic() {
	if (document.getElementById("text-marquee") != null) {
	  document.getElementById("text-marquee").remove();
	  textStatic.style.display = "block";
	  iconTextStatic.classList.add("stopped");
	  iconTextMarquee.classList.remove("playing");
	}
}
function enableMarquee() {
	bodyClass="extras-neon";
	if (body.classList.contains(bodyClass)) {
		body.classList.remove(bodyClass);
		extrasNeonDisable();
	}

	textStatic.style.display = "none";
	addMarquee();
	display("text-marquee");
	chooseElement("text-marquee");
}
function addMarquee() {
	let marquee = document.createElement("marquee");
	marquee.setAttribute("id", "text-marquee");
	marquee.setAttribute("class", "displayed-text");
	marquee.setAttribute("scrollamount", "15");
	marquee.setAttribute("direction", "left");
	marquee.style.display = "block";
	marquee.style.color = currentFontColor;
	marquee.innerHTML = textToDisplay.value;
	typed.appendChild(marquee);

	slidingText = true;
	iconTextStatic.classList.remove("stopped");
	iconTextMarquee.classList.add("playing");
}
function resetMarquee() {
	document.getElementById("text-marquee").remove();
	addMarquee();
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
	// if (slidingText) {
	// 	resetMarquee();
	// 	element = document.getElementById("text-marquee");
	// }
	// else {
	// 	element = textStatic;
	// }

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




/* REVIEWED OK */
blur.addEventListener("click",(event)=>{
	if (colorPicker.style.display !== "none" || changeFontFamilyContainer.style.display !== "none" || mainSettings.style.display !== "none") {
		colorPicker.style.display = "none";
		blur.style.display = "none";
		changeFontFamilyContainer.style.display = "none";
		mainSettings.style.display = "none";
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


