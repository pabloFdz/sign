window.addEventListener("offline", (e) => {
  goOffline();
});

window.addEventListener("online", (e) => {
  goOnline();
});


function goOnline() {
	let settingOptions = document.querySelectorAll('.no-offline');
	settingOptions.forEach((settingOption) => {
		settingOption.disabled = false;
	});
}
function goOffline() {
	let settingOptions = document.querySelectorAll('.no-offline');
	settingOptions.forEach((settingOption) => {
		settingOption.disabled = true;
	});
}

(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const paramFrom = urlParams.get('from')

	if (paramFrom !== "pwa") {
		//window.location.href = "links.txt"; // Uncomment when on production
	}

	if (!navigator.onLine) {
		goOffline();
   	}
})();