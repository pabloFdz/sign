const TV = "tv";
const NEON = "neon";
const GLOW3D = "glow3d";
const CANDLE = "candle";
const SPARKS = "sparks";
const SKY = "sky";
const XBOX = "xbox";

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
	enableStatic();
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
	textStatic.style.display = "none";
	textNeon.style.display = "none";
	textGlow3D.style.display = "block";
	
}
//////////////
function extrasCandle() {
	let candle = document.getElementById("extras-candle-container");

	if (candle.style.display === "none") {
		enableStatic();
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
		enableStatic();
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
		enableStatic();
		xbox.style.display = "block";
	}
	else {
		xbox.style.display = "none";
	}
	
	
}








