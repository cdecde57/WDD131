
var menuButton = document.querySelector(".menu-btn");
var navBar = document.querySelector("header nav")

menuButton.addEventListener("click", function(){



    // Add the changeNav class to the nav-bar. This will target the anchor tags and the menu itself that was previously hidden
    navBar.classList.toggle("changeNav");

    // If the menu button has already been pressed we will add a 'change-back' animation and remove the old one
    if(menuButton.classList.contains("change")){

        menuButton.classList.add("change-back");
        menuButton.classList.remove("change");
    }
    else{
        // If the button has not been pressed yet, ensure there are no other animations on it, and add the change animation
        menuButton.classList.remove("change-back");
        menuButton.classList.toggle("change");
    }

});


