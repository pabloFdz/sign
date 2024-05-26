const TV = "tv";
const NEON = "neon";
const GLOW3D = "glow3d";
const CANDLE = "candle";

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
	  case CANDLE:
	  	extrasCandle();
	  	break;
	  default:
	    break;
	}	
}

//////////////
function extrasTV() {
	toggleBodyClass("extras-tv");
	highlightSelectedIcon(iconExtrasTv);
}
//////////////
function extrasNeon() {
	highlightSelectedIcon(iconExtrasNeon);

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

	let loopLength = textToDisplay.value.length;
	let text = textToDisplay.value;
	let newText = "";

	for(let i = 1; i <= loopLength; i++) {		
		let randomNumber = Math.floor(Math.random() * 10);
		if (randomNumber % 2 === 0) {
			newText+="<span>" + text.slice(0, 1) + "</span>";
		}
		else {
			newText +="<b>" + text.slice(0, 1) + "</b>";
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
	removeHighlightedIcon(iconExtrasNeon);
}
//////////////
function extrasGlow3D() {
	textStatic.style.display = "none";
	textNeon.style.display = "none";
	textGlow3D.style.display = "block";
	highlightSelectedIcon(iconExtrasGlow3D);
}
//////////////
function extrasCandle() {
	let candle = document.getElementById("extras-candle-container");

	if (candle.style.display === "none") {
		candle.style.display = "block"
	}
	else {
		candle.style.display = "none"	
	}
	
	highlightSelectedIcon(iconExtrasCandle);
}








