import budgetWidgetEntries from "./index.mjs";

// Global variable for default widget entries
let WIDGET_ENTRIES = [...budgetWidgetEntries];

// Will update the HTML of the 'entry section' - used in 'paintEntries'
function paintHTML() {
  // Identify the location of the 'entry section' in the HTML
  let widgetSection = document.querySelector(".widget-entry-section");

  //  /!\  Future note   /!\
  // Because I am using innerHTML with user supplied input, XSS is very easy to perform here. I changed this in the about-us section to textContent, but haven't implemented it here since it takes a lot of time, but HTML templates are faster and easier, just insecure.

  // Generate the dynamic HTML elements
  let widgetSectionHTML = "";
  WIDGET_ENTRIES.forEach((entry, index, array) => {
    widgetSectionHTML += `
        <div class="widget-entry">
            <p>#${index + 1}</p>
            <p>${entry.entryType}</p>
            <p>${entry.entryName}</p>
            <p>${entry.entryAmount}</p>
        </div>
          `;
  });

  // Paint the new HTML onto the page
  widgetSection.innerHTML = widgetSectionHTML;
}

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

// Update the HTML on the page to show the budget entries
function paintEntries() {
  // Start by sorting the entries
  WIDGET_ENTRIES = WIDGET_ENTRIES.sort(sortEntries);

  // Paint the HTML itself for the entries
  paintHTML();
}

// Read the HTML inputs and get the values the user wants to add
function addEntry() {
  // Get the information within the budget widget's inputs
  let entryType = document.querySelector("#item-type").value;
  let entryName = document.querySelector("#item-name").value;
  let entryAmount = document.querySelector("#item-amount").value;

  // If the user didn't enter valid data then don't add a new item to the vector
  if (
    entryType === "" ||
    entryName === "" ||
    entryAmount === "" ||
    entryType === undefined ||
    entryName === undefined ||
    entryAmount === undefined
  ) {
    return;
  } else {
    WIDGET_ENTRIES.push({ entryType, entryName, entryAmount });
    paintEntries();
  }
}

// Remove the last item within the widget entries vector
function removeEntry() {
  WIDGET_ENTRIES.pop();
  paintEntries();
}

// Will ensure the number returned is a negative if the entry being analyzed is an expenditure or a positive number if it's income
function convertNumber(budgetEntry) {
  if (budgetEntry.entryType.toLowerCase() === "expenditure") {
    return Number(-1 * budgetEntry.entryAmount);
  } else {
    return Number(budgetEntry.entryAmount);
  }
}

// Analyze the results of the user's actions and give feedback
function analyzeBudget() {
  // Calculate the user's profit from their budget if any
  let profit = WIDGET_ENTRIES.reduce((total, item) => {
    // If the previous item is still the object, we need to convert it
    if (total.entryAmount != undefined) {
      total = convertNumber(total);
    }

    // Add all values together
    return (total += convertNumber(item));
  });

  // Return the profit of the user's budget if any
  return Math.round(profit * 100) / 100;
}

// Generates a random number
function randomNum(max) {
  return Math.floor(Math.random() * max);
}

// Give the user feedback based on their budget
function giveFeedback() {
  // Found on stack overflow that '(Math.round(var * 100) / 100)' will ensure it's rounded to the second decimal place
  let profit = analyzeBudget();

  // Tip and congratulation messages depending on how the user budgets
  let helpMessages = [
    "Use the 24-hour rule before making purchases over $50 to avoid impulse buying.",
    "Live below your means so you always have money left over at the end of the month.",
    "Prioritize needs over wants to ensure your essentials are always covered first.",
  ];
  let congratzMessages = [
    "Great job staying on track with your budget!",
    "You're doing an excellent job managing your money wisely!",
    "Keep up the fantastic work with your spending habits!",
  ];

  let feedback = "";
  // Evelaute which message / piece of feedback to give
  if (profit <= 0) {
    feedback = helpMessages[randomNum(helpMessages.length)];
  } else {
    feedback = congratzMessages[randomNum(congratzMessages.length)];
  }

  document.querySelector(
    "#widget-feedback"
  ).textContent = `Feedback: You'll end with $${profit}. ${feedback}`;
}

// Initiate general page dynamics
function init() {
  // Setup an event listener when the user clicks the 'add entry' button
  let addEntryButton = document.querySelector(".add-widget-item");
  addEntryButton.addEventListener("click", addEntry);

  // Setup an event listener for when the user clicks the 'remove entry' button
  let removeEntryButton = document.querySelector(".remove-widget-item");
  removeEntryButton.addEventListener("click", removeEntry);

  // Setup an event listener for when the user clicks the 'analyze' button
  let analyzeButton = document.querySelector(".evaluate-widget-item");
  analyzeButton.addEventListener("click", giveFeedback);

  // Paint the budget widget entries
  paintEntries();
}

init();

/**
 * My current Pseudo Code 
 * 
0. Draw upon an EJS module to get default data, sort it, and store it in the 'entry' vector (nevermind - only doing local storage on comments page since it doesn't seem realistic to place it in a demo)
1. On page load - populate the budgeter with the 'entry' vector			            -/
2. Add New Item - Add entry information into the 'entry' vector and add HTML	  -|Share an 'add item' function
3. Remove Last Item - Pop the last item from the vector and re-paint the widget	-\
4. Analyze - Add income, subtract expenditures. If positive then give a congratz, if negative give a budgeting tip in the 'feedback' row.



 */
