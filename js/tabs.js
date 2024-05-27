// Get all the tabs
const tabs = document.querySelectorAll('.tab');

tabs.forEach(clickedTab => {
    // Add onClick event listener on each tab
    clickedTab.addEventListener('click', () => {
        // Remove the active class from all the tabs (this acts as a "hard" reset)
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Add the active class on the clicked tab
        clickedTab.classList.add('active');
    const clickedTabBGColor = clickedTab.getAttribute('data-color');
    document.getElementById("main-settings").setAttribute("class", "");
    document.getElementById("main-settings").classList.add(clickedTabBGColor);
    });
});