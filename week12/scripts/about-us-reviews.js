import userComments from "./about-us-reviews.mjs";

// Global variables
const IMPORTED_COMMENTS = [...userComments]; // A constant variable for all imported comments
let CURRENT_REVIEW = 0; // A variable used to track the current featured review
let COMMENT_COUNT = 0; // Tracks the number of user comments. We use this to create dynamic IDs
let COMMENTS = []; // Tracks all new user comments. We use this to help track what should be stored in local storage.

// Generates a random number
function randomNum(max) {
  return Math.floor(Math.random() * max);
}

// Update the featured review that's shown to the user
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

// For the left button by the featured review
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
  updateFeaturedComment(IMPORTED_COMMENTS[CURRENT_REVIEW]);
  return;
}

// For the right button by the featured review
function evaluateRight() {
  // Move the 'current review' index to the right
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
  updateFeaturedComment(IMPORTED_COMMENTS[CURRENT_REVIEW]);
  return;
}

// Create a new user comment. 'doSave' will ensure the comment is stored in local storage. Important if it is a new comment. Important to use 'false' if we're passing imported or previously stored comments
function addComment(comment, doSave = true) {
  // We'll identify the name and content either from the user adding a new comment, or from a 'comment' object being passed.
  let name = "";
  let content = "";

  // If we get an event object, we know it was a submitted comment
  if (comment.constructor.name === "PointerEvent") {
    name = document.querySelector(".comments-form-name").value;
    content = document.querySelector(".comments-form-comment").value;
  } else {
    // If it is not a submission event then we'll add a new comment assuming the passed argument is a comment object.
    name = comment.fullName;
    content = comment.comment;
  }

  // If the user didn't provide a valid name or comment content, then we'll just return.
  if (
    name === "" ||
    content === "" ||
    name === undefined ||
    content === undefined
  ) {
    return;
  }

  // Create a comment template
  let commentSection = document.querySelector(".comments-section");
  let newComment = `
        <article class="comments-section-comment">
          <img
            src="./images/user.webp"
            alt="Default user image"
            class="comment-section-image"
          />
          <b class="comment-section-name" id="comment_name_${COMMENT_COUNT}">Name:</b>
          <p class="comment-section-comment" id="comment_content_${COMMENT_COUNT}">
          </p>
        </article>
    `;

  // Add the comment template into the site. Once done here we can modify the username and actual comment
  commentSection.innerHTML += newComment;

  // We find the new comment template's name and comment values. I use dynamic IDs to keep track. This way I can use textContent instead of innerHTML which prevents XSS
  let newCommentName = document.querySelector(`#comment_name_${COMMENT_COUNT}`);
  let newCommentValue = document.querySelector(
    `#comment_content_${COMMENT_COUNT}`
  );

  // Update the name and content of the comment template
  newCommentName.textContent = `Name: ${name}`;
  newCommentValue.textContent = content;

  // We'll increase the comment count by 1 so we can continue tracking comment IDs appropriately and add the record into our global variable
  COMMENT_COUNT++;

  // If we're adding a new comment and want to save, then we'll store it in local storage
  if (doSave) {
    // We'll track the new comment in the global variables if we're saving it locally as well, otherwise we don't reference it again so there's no need.
    COMMENTS.push({
      fullName: name,
      reviews: 0,
      profileImage: "#",
      comment: content,
    });

    // Update local storage to continue tracking the comments
    localStorageInit(true);
  }
}

// Initiate the local storage : doOverride will cause local storage to be updated to reflect the current global variables
function localStorageInit(doOverride = false) {
  // If we haven't stored things previously, store the global variable 'comments' which will be empty, but now ready for use
  if (localStorage.getItem("comments") === null || doOverride) {
    localStorage.setItem("comments", JSON.stringify(COMMENTS));
  }
}

// Will set the global variables to match our local storage
function globalVarInit() {
  // If there's a comment stored in local storage previously, we'll be able to use it again
  COMMENTS = JSON.parse(localStorage.getItem("comments"));
}

// Used to initiate imported or previously stored comments
function commentInit(value) {
  // Add the comment. Ensure we don't store it because otherwise we'll duplicate comments
  addComment(value, false);
}

function init() {
  // Setup the local storage initially if it isn't already
  localStorageInit();

  // Initiate the global variables after local storage is initiated (if local storage had something, they'll update, otherwise they'll stay as default values)
  globalVarInit();

  // Add a random comment into the featured comments section.
  CURRENT_REVIEW = randomNum(3);
  updateFeaturedComment(IMPORTED_COMMENTS[CURRENT_REVIEW]);

  // Setup a listener for when the user uses the right or left arrows so the featured comment changes.
  let leftArrow = document.querySelector("#widget-review-left");
  leftArrow.addEventListener("click", evaluateLeft);

  let rightArrow = document.querySelector("#widget-review-right");
  rightArrow.addEventListener("click", evaluateRight);

  // Setup a listener for when the user submits a new comment
  let submitComment = document.querySelector(".comments-form-submit");
  submitComment.addEventListener("click", addComment);

  // Add the default comments and any in local storage
  let importedComments = IMPORTED_COMMENTS.slice(3, 6); // Specific imported user comments
  let storedComments = JSON.parse(localStorage.getItem("comments"));
  importedComments.map(commentInit);
  storedComments.map(commentInit);
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
