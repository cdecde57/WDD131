// When they select dark theme, apply the dark class and update the image. Remove the class when light theme is used and update the image.


// Add an event to the dropdown menu
var themeSel = document.querySelector("#theme-selector");
themeSel.addEventListener("change", updateTheme);


// A function called when the theme selector drop-down menu is used
function updateTheme(event){

    // Identify the selected value
    var selectedTheme = event.target.value;

    // Obtain the elements we'll modify
    var pageContent = document.querySelector(".page-contents");
    var pageBody = document.querySelector("body");
    var byuLogo = document.querySelector("#byui-logo img")
    var missionStatement = document.querySelector(".mission-statement h2");
    var subtitle = document.querySelector(".mission-statement p");

    if (selectedTheme === "dark"){

        // Add the dark class to the application and update the image
        pageContent.classList.add("dark-text");
        pageBody.classList.add("dark-background");
        byuLogo.setAttribute("src","prove-dark.png");
        missionStatement.classList.add("dark-header");
        subtitle.classList.remove("subtitle");
        subtitle.classList.add("subtitle-dark");
    }

    else if (selectedTheme === "light"){
        // remove the dark class to the application and update the image
        pageContent.classList.remove("dark-text");
        pageBody.classList.remove("dark-background");
        byuLogo.setAttribute("src","prove.png");
        subtitle.classList.remove("subtitle-dark");
        subtitle.classList.add("subtitle");
    }
    else{
        console.log("I guess if I wanted another theme, or a default one I could add one. For now I will just send this message - Hello, World!");
    }

}