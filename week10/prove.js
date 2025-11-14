// Import the recipes object array from prove.mjs
import recipes from './prove.mjs'

// Return a random recipe
function randomRecipe(recipe){

    // Get a random index that is compatible with the recipe array
    const randomRecipei = Math.floor(Math.random()* recipe.length);

    // Return a random recipe
    return recipe[randomRecipei];
}

function recipeTemplate(recipe){

    // Generate some dynamic HTML for the tags since each recipe has a different number of tags
    let tagList = "";
    for(let i = 0; i < recipe.tags.length; ++i){
        tagList += `<p class="tag">${recipe.tags[i]}</p>\n`;
    }

    // Generate more HTML specifically for the number of stars the recipe has
    let ratingList = "";
    ratingList += '<span aria-hidden="true" class="icon-star">⭐</span>\n'.repeat(recipe.rating);
    ratingList += '<span aria-hidden="true" class="icon-star">☆</span>\n'.repeat(Math.ceil(5 - recipe.rating)); // I do a ceiling round to account for half stars

    // Return / generate the actual recipe in HTML form
    return `
        <article class="recipe">
        <img
          class="recipe-img"
          src="${recipe.image}"
          alt="Recipe end result"
        />

        <article class="recipe-content">
          <section class="tag-list">
            ${tagList}
          </section>

          <p class="recipe-name">${recipe.name}</p>

          <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
            ${ratingList}
          </span>
          <br>

          <p class="recipe-description">
            ${recipe.description}
          </p>
        </article>
      </article>`
}

// Render a list of recipes
function renderRecipes(recipeList) {
	// get the element we will output the recipes into
    let recipeLocation = document.querySelector(".all-recipes");

    // For each recipe within the list, create HTML for it
    let recipeHTML = "";
    for(let i = 0; i < recipeList.length; ++i){
        // Use our recipeTemplate function to generate the HTML for each recipe
        recipeHTML += recipeTemplate(recipeList[i]);
    }

	// Set the HTML strings as the innerHTML of our output element.
    recipeLocation.innerHTML = `${recipeHTML}`;

}

// Callback function to search for recipes and send them to be rendered
function performSearch(e){

    // Get the text that the user is using to search.
    const searchedText = document.querySelector("#search-value").value.toLowerCase();

    // This is a callback for the filter below. We define the function within this current one so we can reference the 'searchedText' variable easily
    // The function will return recipes that contain the word the user searched for
    function filterRecipes(recipe){

        // Return all recipes that contain the searched text within the name, description, tag list, or ingredients list. Return 1 if the value exists.
        if(recipe.name.toLowerCase().includes(searchedText) || recipe.description.toLowerCase().includes(searchedText)){
            return 1;
        }

        for(let tag of recipe.tags){
            if(tag.toLowerCase().includes(searchedText)){
                return 1;
            }
        }

        for(let ingredient of recipe.recipeIngredient){
            if(ingredient.toLowerCase().includes(searchedText)){
                return 1;
            }
        }

    }

    // The filter function will call the above function for each item in the array. Identify all matching recipes the user searched for 
    let discoveredRecipes = recipes.filter(filterRecipes)
    
    // Sort all the recipes we found from the search
    // I use the sort function here to sort the recipes by the first character in the name. Check notes on details on how the sort function works for details why we did this
    discoveredRecipes.sort((a, b)=>{
        if(a.name.toLowerCase()[0] > b.name.toLowerCase()[0]){
            return 1;
        }
        else if(a.name.toLowerCase()[0] < b.name.toLowerCase()[0]){
            return -1;
        }
        else {
            return 0;
        }

    });

    // Render all recipes that were discovered from the search
    renderRecipes(discoveredRecipes);
}

// Load the page with a single random recipe 
function init() {
  // get a random recipe
  let displayRecipe = randomRecipe(recipes);

  // render the recipe with renderRecipes. We pass an array with just the one item so we can use this function with an array of recipes later on
  renderRecipes([displayRecipe]);
}

// Setup an event listener on the search bar when clicked
document.querySelector("#search-recipe").addEventListener("click", performSearch);

// Initialize the website
init();