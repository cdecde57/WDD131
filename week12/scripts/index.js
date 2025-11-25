import budgetWidgetEntries from "./index.mjs";

let WIDGET_ENTRIES = [...budgetWidgetEntries];

// Will sort 'a' and 'b' as strings - used in 'paintEntries'
function sortEntries(a, b) {
  a = a.entryName.toLowerCase();
  b = b.entryName.toLowerCase();

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

function paintHTML(){

}

// Update the HTML on the page to show the budget entries
function paintEntries() {

  // Start by sorting the entries
  WIDGET_ENTRIES = WIDGET_ENTRIES.sort(sortEntries);

  // Paint the HTML itself for the entries
  painHTML();

}

// Initiate general page dynamics
function init() {
  // Open / close the menu when the 'menu' button is clicked.
  let menuButton = document.querySelector(".header-menu-button");
  let menuBar = document.querySelector(".navigation-bar");

  menuButton.addEventListener("click", () => {
    menuBar.classList.toggle("display-menu");
  });

  /**
   * I need to add code to work with the local storage!
   */

  // Paint the budget widget entries
  paintEntries();
}

init();

/**
 * My current Pseudo Code 
 * 
0. Draw upon an EJS module to get default data, sort it, and store it in the 'entry' vector
1. On page load - populate the budgeter with the 'entry' vector			-/
2. Add New Item - Add entry information into the 'entry' vector and add HTML	-|Share an 'add item' function
3. Remove Last Item - Pop the last item from the vector and re-paint the widget	-\
4. Analyze - Add income, subtract expenditures. If positive then give a congratz, if negative give a budgeting tip in the 'feedback' row.



 */
