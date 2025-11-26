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
  let highlight = document.querySelector(".widget-review-highlight");

  let highlightHTML = `

    <section class="widget-review-slide-section">
        <button class="widget-reivew-arrow" id="widget-review-left">
        <img src="./images/left-arrow.png" alt="Left Arrow" />
        </button>

        <div class="widget-review-image">
        <img src="${image}" alt="Highlight image of ${fullName}" id="review-image"/>
        </div>

        <button class="widget-reivew-arrow" id="widget-review-right">
        <img src="./images/right-arrow.png" alt="Right Arrow" />
        </button>
    </section>
    <section class="widget-review-details">
        <p>Name: ${fullName}</p>
        <p>Reviews: ${stars}</p>
        <em class="widget-review">
        ${comment}
        </em>
    </section>

    `;

  highlight.innerHTML = highlightHTML;
}

function init() {

  // Add a random comment into the featured comments section.
  CURRENT_REVIEW = randomNum(3)
  updateFeaturedComment(COMMENTS[CURRENT_REVIEW]);

  // Setup a listener for when the user uses the right or left arrows so the featured comment changes.

}

init();

/**
 * My Current Pseudo Code
 * 0. Import  user comments / information into the comments section and for the featured comments
 * 1. Load a random profile in as the featured comment. Every 8 seconds move 1 to the right (positive index).
 * 2. When one of the arrows is pressed, it will go through the list of user comments and render them
 * 3. Make sure to render all of the user comments
 * 4. add a new user comment when someone presses the submit comment button. I'll gather the information similar to the buget tool.
 */
