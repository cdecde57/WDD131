// Initiate
function init() {
  // Setup an event listener to open / close the menu when the 'menu' button is clicked.
  let menuButton = document.querySelector(".header-menu-button");
  let menuBar = document.querySelector(".navigation-bar");

  menuButton.addEventListener("click", () => {
    menuBar.classList.toggle("display-menu");
  });
}

init();
