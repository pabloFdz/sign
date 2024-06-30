const TV = "tv";
const NEON = "neon";
const GLOW3D = "glow3d";
const CANDLE = "candle";
const SPARKS = "sparks";
const SKY = "sky";
const XBOX = "xbox";
const LED = "led";
const RAIN = "rain";
const PORTAL = "portal";

let statusNeon = false;

function extras(type) {
	switch (type) {
	  case TV:
	    extrasTV();
	    break;
	  case NEON:
	  	extrasNeon();
	  	break;
	  case GLOW3D:
	  	extrasGlow3D();
	  	break;
	  case CANDLE:
	  	extrasCandle();
	  	break;
	  case SPARKS:
	  	extrasSparks();
	  	break;
	  case SKY:
	  	extrasSky();
	  	break;
	  case XBOX:
	  	extrasXbox();
	  	break;
	  case LED:
	  	extrasLed();
	  	break;
	  case RAIN:
	  	extrasRain();
	  	break;
	  case PORTAL:
	  	extrasPortal();
	  	break;

	  default:
	    break;
	}	
}

//////////////
function extrasTV() {
	toggleBodyClass("extras-tv");
}
//////////////
function extrasNeon() {
	if (statusNeon) {
		extrasNeonDisable();
		return;
	}

	statusNeon = true;
	textStatic.style.display = "none";
	textNeon.style.display = "block";
	textGlow3D.style.display = "none";
	chooseElement("text-neon");

	let newText = "";
	let text = textToDisplay.value;
	let loopLength = textToDisplay.value.length;

	for(let i = 1; i <= loopLength; i++) {		
		let randomNumber = Math.floor(Math.random() * 10);
		if (randomNumber % 2 === 0) {
			newText += "<span>" + text.slice(0, 1) + "</span>";
		}
		else {
			newText += "<b>" + text.slice(0, 1) + "</b>";
		}
		
		text = text.substring(1);
	}

	textNeon.innerHTML = newText;

	toggleBodyClass('extras-neon');
}
function extrasNeonDisable() {
	textStatic.style.display = "block";
	textNeon.style.display = "none";
	textGlow3D.style.display = "none";
	statusNeon = false;
}
//////////////
function extrasGlow3D() {
	let glow3d = document.getElementById("text-glow3d");

	if (glow3d.style.display === "none") {
		textStatic.style.display = "none";
		textNeon.style.display = "none";
		textGlow3D.style.display = "block";
	}
	else {
		textStatic.style.display = "block";
		textNeon.style.display = "block";
		textGlow3D.style.display = "none";
	}	
	
	toggleBodyClass('extras-glow3d');
}
//////////////
function extrasCandle() {
	let candle = document.getElementById("extras-candle-container");

	if (candle.style.display === "none") {
		candle.style.display = "block";
	}
	else {
		candle.style.display = "none";
	}	
}
//////////////
function extrasSparks() {
	let sparks = document.getElementById("extras-sparks-container");

	if (sparks.style.display === "none") {
		sparks.style.display = "block";
		sparksObject.createSparks();
	}
	else {
		sparks.style.display = "none";
		sparksObject.destroySparks();
	}
}
//////////////
function extrasSky() {
	let bodyClass = "extras-sky";
	let sky = document.getElementById("extras-sky-container");

	if (body.classList.contains(bodyClass)) {
		body.classList.remove(bodyClass);
		sky.style.display = "none";
	}
	else {
		body.classList.add(bodyClass);
		sky.style.display = "block";
	}
}
//////////////
function extrasXbox() {
	let xbox = document.getElementById("extras-xbox-container");

	if (xbox.style.display === "none") {
		xbox.style.display = "block";
		textStatic.style.display = "none";
	}
	else {
		xbox.style.display = "none";
		textStatic.style.display = "block";
	}
}
//////////////
function extrasLed() {
	let led = document.getElementById("extras-led-container");

	if (led.style.display === "none") {
		led.style.display = "block";
		sizeInputHandler();
	}
	else {
		led.style.display = "none";
	}
}
//////////////
function extrasRain() {
	let rain = document.getElementById("extras-rain-container");

	if (rain.style.display === "none") {
		rain.style.display = "block";
	}
	else {
		rain.style.display = "none";
	}
}
//////////////
function extrasPortal() {
	let portal = document.getElementById("extras-portal-container");

	if (portal.style.display === "none") {
		portal.style.display = "block";
		textStatic.style.display = "none";
	}
	else {
		portal.style.display = "none";
		textStatic.style.display = "block";
	}
}








