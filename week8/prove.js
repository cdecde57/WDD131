// Define our character's attributes
let snortleblat = {
  name: "Snortleblat",
  class: "Swamp Beat Diplomat",
  level: 5,
  health: 100,
  image: "snortleblat.webp",
  attack: function (damage) {
    // Subtract 20 health from the character. If it reaches 0, alert the user of their demise!
    this.health -= damage;

    // Rewrite the HTML
    updateHero(this);

    if (this.health < 0) {
      alert("Your hero has fallen!\nResetting health and level");
      this.level = 5;
      this.health = 100;

      // Rewrite the HTML
      updateHero(this);
    }
  },
  levelUp: function (experience) {
    // Will add 1 level to the character.
    this.level += experience;

    // Rewrite the HTML
    updateHero(this);
  },
};






// Identify the buttons and add event listeners. They will update the stats of our hero
let attackedButton = document.querySelector("#attacked");
let levelUpButton = document.querySelector("#level-up");

// Learned the hard way if you try to define an event within the object through a method, the this pointer will point to the button instead of the object
attackedButton.addEventListener("click", () => {
  snortleblat.attack(20);
});
levelUpButton.addEventListener("click", () => {
  snortleblat.levelUp(1);
});






// After each modification of our hero, we'll need to update the HTML
function updateHero(hero) {
  let stats = document.querySelector(".stats");

  let template = `
        <p><span class="stat-name">Class: </span>${hero.class}</p>
        <p><span class="stat-name">Level: </span>${hero.level}</p>
        <p><span class="stat-name">Health: </span>${hero.health}</p>`;

    stats.innerHTML = template;
}
