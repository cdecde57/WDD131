// An event listener to trigger the drop-down menu when the 'menu' button is clicked.
const fullMenu = document.querySelector(".full-menu");
const smallMenu = document.querySelector("#small-menu");

smallMenu.addEventListener("click", (e) => {
  fullMenu.classList.toggle("display-menu");
});

// An event listener to operate a modal when an image is clicked.
const modalBox = document.querySelector("dialog");
const modalImage = modalBox.querySelector("img");
const imageGallery = document.querySelector(".image-content");

imageGallery.addEventListener("click", (e) => {
  // Find the image that was selected
  var targetImage = e.target.getAttribute("src");

  // Display the image selected within the modal
  modalImage.setAttribute("src", targetImage);

  modalBox.showModal();
});

// Add an event listener to close the modal when the 'X' button is pressed
const modalClose = modalBox.querySelector(".modal-close");

modalClose.addEventListener("click", (e) => {
  modalBox.close();
});

// If anywhere besides the image is clicked, close the modal
modalBox.addEventListener("click", (e) => {
  if (e.target === modalBox) {
    modalBox.close();
  }
});
