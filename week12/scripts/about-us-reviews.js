import userComments from "./about-us-reviews.mjs";

let COMMENTS = [...userComments];
let CURRENT_REVIEW = 0;

// Generates a random number
function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function updateFeaturedComment(entry) {
  // Extract the comment values from the object sent
  let fullName = entry.fullName;
  let reviewCount = entry.reviews;
  let image = entry.profileImage;
  let comment = entry.comment;

  // We need to calculate the number of stars to display based on the number of reviews given
  let stars = "";
  for (let i = 0; i < reviewCount; ++i) {
    stars += "⭐";
  }

  // Paint a new featured comment
  
  // Update the image source and alt value
  let reviewImage = document.querySelector("#review-image");
  reviewImage.setAttribute("src", image);
  reviewImage.setAttribute("alt", `Highlight image of ${fullName}`);

  //Update the full name
  let reviewName = document.querySelector("#widget-full-name");
  reviewName.textContent = `Name: ${fullName}`;

  //Update the review
  let reviewStars = document.querySelector("#widget-reviews");
  reviewStars.textContent = `Reviews: ${stars}`;

  //Update the review's comment
  let reviewComment = document.querySelector(".widget-review");
  reviewComment.textContent = comment;

}

function evaluateLeft() {
  // Move the 'current review' index to the left
  switch (CURRENT_REVIEW) {
    case 0:
      CURRENT_REVIEW = 2;
      break;
    case 1:
      CURRENT_REVIEW = 0;
      break;
    case 2:
      CURRENT_REVIEW = 1;
      break;
    default:
      CURRENT_REVIEW = 0;
  }

  // Re-paint the HTML
  updateFeaturedComment(COMMENTS[CURRENT_REVIEW]);
  return;
}

function evaluateRight() {
  // Move the 'current review' index to the left
  switch (CURRENT_REVIEW) {
    case 0:
      CURRENT_REVIEW = 1;
      break;
    case 1:
      CURRENT_REVIEW = 2;
      break;
    case 2:
      CURRENT_REVIEW = 0;
      break;
    default:
      CURRENT_REVIEW = 0;
  }

  // Re-paint the HTML
  updateFeaturedComment(COMMENTS[CURRENT_REVIEW]);
  return;
}

function init() {
  // Add a random comment into the featured comments section.
  CURRENT_REVIEW = randomNum(3);
  updateFeaturedComment(COMMENTS[CURRENT_REVIEW]);

  // Setup a listener for when the user uses the right or left arrows so the featured comment changes.
  let leftArrow = document.querySelector("#widget-review-left");
  leftArrow.addEventListener("click", evaluateLeft);

  let rightArrow = document.querySelector("#widget-review-right");
  rightArrow.addEventListener("click", evaluateRight);
}

init();

/**
 * My Current Pseudo Code
 * 0. Import  user comments / information into the comments section and for the featured comments
 * 1. Load a random profile in as the featured comment. Every 8 seconds move 1 to the right (positive index). (I don't think I'll add this one, may cause a bad user experience if it collides with their clicking of the reviews)
 * 2. When one of the arrows is pressed, it will go through the list of user comments and render them
 * 3. Make sure to render all of the user comments
 * 4. add a new user comment when someone presses the submit comment button. I'll gather the information similar to the buget tool.
 */
