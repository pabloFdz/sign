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
   if (!navigator.onLine) {
   	goOffline();
   }
})();