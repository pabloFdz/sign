function toggleBodyClass(bodyClass) {
	if (body.classList.contains(bodyClass)) {
		body.classList.remove(bodyClass);
	}
	else {
		body.classList.add(bodyClass);
	}
}
function highlightSelectedIcon(element) {
	if (element.classList.contains("selected")) {
		element.classList.remove("selected");
	}
	else {
		element.classList.add("selected");
	}
}
function chooseElement(element) {
	element = document.getElementById(element);
}

const rgbToHue = (r,g,b) => Math.round(
  Math.atan2(
    Math.sqrt(3) * (g - b),
    2 * r - g - b,
  ) * 180 / Math.PI
);



