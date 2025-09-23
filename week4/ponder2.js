
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    
    // Identify the image that was clicked / identify the source it is pointing to
    targetImage = e.target.getAttribute("src");

    // Depending on the image that was clicked, load a different image.
    if(targetImage === "images/book-sm.jpg"){
        modalImage.setAttribute("src", "images/book-full.jpg");
    }else if(targetImage === "images/couch-sm.jpg"){
        modalImage.setAttribute("src", "images/couch-full.jpg");
    }else if(targetImage === "images/desk-sm.jpg"){
        modalImage.setAttribute("src", "images/desk-full.jpg");
    }else if(targetImage === "images/keyboard-sm.jpg"){
        modalImage.setAttribute("src", "images/keyboard-full.jpg");
    }else if(targetImage === "images/phone-sm.jpg"){
        modalImage.setAttribute("src", "images/phone-full.jpg");
    }else if(targetImage === "images/sit-sm.jpg"){
        modalImage.setAttribute("src", "images/sit-full.jpg");
    }

    // Show the modal 
    modal.showModal();


    
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          