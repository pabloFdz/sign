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
function removeHighlightedIcon(element) {
	element.classList.remove("selected");
}
function chooseElement(element) {
	element = document.getElementById(element);
}