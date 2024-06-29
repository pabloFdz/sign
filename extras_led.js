const SIZE = 16;
let moveStep = SIZE;
const MAGNETIC_DEGS = [];

sizeInput.oninput = (e) => sizeInputHandler();
canvaSizeInput.oninput = (e) => canvaSizeInputHandler();
// canvaColorInput.oninput = (e) => canvaColorInputHandler();

function canvaColorInputHandler() {
	const v = canvaColorInput.value;

	canva.setAttribute("flood-color", v);
	resetFilter();
}

function canvaSizeInputHandler() {
	const v = magnetic(MAGNETIC_DEGS, parseInt(canvaSizeInput.value));

	movableDiv.style.setProperty("width", v + "px");
}
async function sizeInputHandler() {
	//const x = magnetic(MAGNETIC_DEGS, parseInt(sizeInput.value));
	let fontSize = window.getComputedStyle(textStatic).getPropertyValue("font-size").replace("px", "");
	fontSize = fontSize * 1 / 15
	//const x = magnetic(MAGNETIC_DEGS, parseInt(fontSize));
	const x = magnetic(MAGNETIC_DEGS, 4);
	sizeInput.value = x;

	changeSize(x);

	// window.dispatchEvent(new Event('resize'));
	resetFilter();
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function resetFilter() {
	movableDiv.style.setProperty("backdrop-filter", "none");
	await sleep(10);
	movableDiv.style.setProperty("backdrop-filter", "url(#led-screen)");
}

//
//
//

const filterPxl = document.querySelector("#filterPxl");
const filterCs = document.querySelector("#filterCs");
const filterCsImg = document.querySelector("#filterCsImg");
const filterCsImg2 = document.querySelector("#filterCsImg2");
const filterMorph = document.querySelector("#filterMorph");

function changeSize(size) {
	const pxl = size % 2 == 0 ? 2 : 1;
	const shift = (size - pxl) / 2;
	console.clear();
	console.log(size, pxl, shift);

	filterMorph.setAttribute("radius", (shift - size * 0.04).toString());

	filterPxl.setAttribute("x", shift.toString());
	filterPxl.setAttribute("y", shift.toString());
	filterPxl.setAttribute("width", pxl.toString());
	filterPxl.setAttribute("height", pxl.toString());

	filterCs.setAttribute("width", size.toString());
	filterCs.setAttribute("height", size.toString());

	filterCsImg.setAttribute("width", size.toString());
	filterCsImg.setAttribute("height", size.toString());
	// filterCsImg2.setAttribute("width", size.toString());
	// filterCsImg2.setAttribute("height", size.toString());

	moveStep = size;

}

changeSize(SIZE);

function magnetic(array, value, range = 10) {
	for (let i = 0; i < array.length; i++) {
		const magnetValue = array[i];
		const magnetMax = magnetValue + range;
		const magnetMin = magnetValue - range;

		if (value < magnetMax && value > magnetMin) return magnetValue;
	}

	return value;
}
