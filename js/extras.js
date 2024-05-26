const TV = "tv";
const NEON = "neon";

let statusNeon = false;

function extras(type) {
	switch (type) {
	  case TV:
	    extrasTV();
	    break;
	  case NEON:
	  	extrasNeon();
	  	break;
	  default:
	    break;
	}	
}

function extrasTV() {
	toggleBodyClass("extras-tv");
	highlightSelectedIcon(iconExtrasTv);
}
function extrasNeon() {
	highlightSelectedIcon(iconExtrasNeon);

	if (statusNeon) {
		textStatic.style.display = "block";
		textNeon.style.display = "none";
		statusNeon = false;
		return;
	}

	statusNeon = true;
	enableStatic();
	textStatic.style.display = "none";
	textNeon.style.display = "block";
	chooseElement("text-neon");

	let loopLength = textToDisplay.value.length;
	let text = textToDisplay.value;
	let newText = "";

	for(let i = 1; i <= loopLength; i++) {
		console.log(newText)
		
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









