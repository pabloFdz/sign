//let buttonDisplay = document.getElementById("display");
const textToDisplay = document.getElementById("text-to-display");
const textStatic = document.getElementById("text-static");
let textMarquee = document.getElementById("text-marquee");

const inputFontFamily = document.getElementById("font-selector");
const inputFontColor = document.getElementById("font-color-to-display");
const inputBackgroundColor = document.getElementById("background-color-to-display");

let body = document.body;
const typed = document.getElementById("typed");

const displayedText = document.querySelectorAll('.displayed-text');
const colorPickerFont = document.getElementById('font-color');
const colorPickerBackground = document.getElementById('background-color');

const settingsTop = document.getElementById('settings-top');
const settingsBottom = document.getElementById('settings-bottom');
const hideSettings = document.getElementById('hide-settings');

let currentFont = "Led Bus"
let currentFontColor = "#000";
let currentBackgroundColor = "#fff";

let fontSize = 700;
let enableBlink = true;
let blink = true;
let settingsHidden = false;
let element = textStatic;

let slidingText = false; // false Static | true Marquee

function chooseElement() {
	if (slidingText) {
		element = document.getElementById("text-marquee");
	}
	else {
		element = textStatic;
	}
}
/* Blink */
let blinkInterval;

function toggleBlinkText() {
	if (enableBlink) {
		enableBlink = false;
		blinkInterval = setInterval(startBlinkText, 200);
	}
	else {
		enableBlink = true;
		clearInterval(blinkInterval);
		changeColor();
	}
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
function toggleBlink() {
	if (enableBlink) {
		enableBlink = false;
		blinkInterval = setInterval(startBlink, 200);
	}
	else {
		enableBlink = true;
		clearInterval(blinkInterval);
		changeColor();
	}
}
function startBlink() {
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
function display() {
	chooseElement();

	element.innerHTML = textToDisplay.value;
	
	getFontColor();
	getBackgroundColor();
}
function enableStatic() {
	document.getElementById("text-marquee").remove();
	textStatic.style.display = "block";
}
function enableMarquee() {
	textStatic.style.display = "none";
	addMarquee();
	display();
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
	fontSize -= 100;
	fontChangeSize();
}
function fontChangeSize() {
	if (slidingText) {
		resetMarquee();
		element = document.getElementById("text-marquee");
	}
	else {
		element = textStatic;
	}
	
	element.style.fontSize = fontSize + "%";
}
function fontChangeFamily() {
	if (slidingText) {
		resetMarquee();
		element = document.getElementById("text-marquee");
	}
	else {
		element = textStatic;
	}
	element.style.fontFamily = currentFont;
}

/* Colors */
function getFontColor() {
	currentFontColor = inputFontColor.value;
	changeColor();
}
function getBackgroundColor() {
	currentBackgroundColor = inputBackgroundColor.value;
	changeColor();
}
function changeColor() {
	chooseElement();
	element.style.color = currentFontColor;
	body.style.backgroundColor = currentBackgroundColor;
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
		invertColor(currentBackgroundColor);
		settingsTop.classList.remove("hidden");
		settingsBottom.classList.remove("hidden");
		settingsHidden = false;
		hideSettings.style.color = "initial";
	}
	else {
		invertColor(currentBackgroundColor);
		settingsTop.classList.add("hidden");
		settingsBottom.classList.add("hidden");
		settingsHidden = true;
	}
}

let fontBodyClass;
/* LISTENERS */
textToDisplay.addEventListener("input",(event)=>{
	display();
});
inputFontFamily.addEventListener("input",(event)=>{
	currentFont = inputFontFamily.value;
	fontBodyClass = inputFontFamily.options[inputFontFamily.selectedIndex].getAttribute('attr-font')
	document.body.setAttribute("class", fontBodyClass);

	//fontChangeFamily();
});
inputFontColor.addEventListener("input",(event)=>{
	getFontColor();
});
inputBackgroundColor.addEventListener("input",(event)=>{
	getBackgroundColor();
});
colorPickerFont.addEventListener("click",(event)=>{
	document.getElementById('font-color-to-display').click();
});
colorPickerBackground.addEventListener("click",(event)=>{
	document.getElementById('background-color-to-display').click();
});


