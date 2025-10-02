// 1. An event for when the button is pressed
// 2. When pressed we will display an error, or we will display a success message. The credit card must be: 1234123412341234


// Identify the credit card form and setup a listener to catch submissions
let creditForm = document.querySelector(".card-form");
creditForm.addEventListener("submit", processCard);

// Identify the credit card number inserted
let creditCard = document.querySelector(".card-number input");

// The error box if needed
let errorBox = document.querySelector(".error");


// Handle the submission events
function processCard(e){
    
    // Ensure the page isn't reloaded
    e.preventDefault();

    // Check if the credit card is accurate. If it is display a success message, otherwise share an error.
    if(creditCard.value === "1234123412341234"){
        creditForm.innerHTML = "<h1>Successful Transaction</h1>"
        errorBox.classList.add("hide");
    }
    else{
        errorBox.innerHTML = "<p>The credit card number you entered is invalid!</p>";
        errorBox.classList.remove("hide");
    }

}