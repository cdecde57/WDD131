import userComments from "./about-us-reviews.mjs";

let COMMENTS = [...userComments];
let CURRENT_REVIEW = 0;
let COMMENT_COUNT = 0;

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

function addComment(comment) {
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
  if (name === undefined || content === undefined) {
    return;
  }

  // We find the new comment template's name and comment values. I use dynamic IDs to keep track. This way I can use textContent instead of innerHTML which prevents XSS
  let newCommentName = document.querySelector(`#comment_name_${COMMENT_COUNT}`);
  let newCommentValue = document.querySelector(
    `#comment_content_${COMMENT_COUNT}`
  );

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

  // Update the name and content of the comment template
  newCommentName.textContent = `Name: ${name}`;
  newCommentValue.textContent = content;

  // We'll increase the comment count by 1 so we can continue tracking appropriately
  COMMENT_COUNT++;
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

  // Setup a listener for when the user submits a new comment
  let submitComment = document.querySelector(".comments-form-submit");
  submitComment.addEventListener("click", addComment);

  addComment(COMMENTS[3]);
  addComment(COMMENTS[4]);
  addComment(COMMENTS[5]);
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
