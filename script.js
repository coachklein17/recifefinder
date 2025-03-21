document.getElementById("searchButton").addEventListener("click", getRecipes);

async function getRecipes() {
  const ingredient = document.getElementById("ingredientInput").value;
  const apiKey = "b7821da79a2045bb868259a9077e1e0e";
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    displayRecipes(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert("Sorry, something went wrong while fetching recipes.");
  }
}

function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipeResults");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (recipes.length === 0) {
    resultsContainer.innerHTML = "<p>No recipes found. Try a different search!</p>";
  } else {
    recipes.forEach(recipe => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      recipeDiv.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>Used Ingredients: ${recipe.usedIngredients.map(ing => ing.name).join(", ")}</p>
        <p>Missed Ingredients: ${recipe.missedIngredients.map(ing => ing.name).join(", ")}</p>
        <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-").toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
      `;

      resultsContainer.appendChild(recipeDiv);
    });
  }
}
