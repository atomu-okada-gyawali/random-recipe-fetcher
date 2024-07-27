export async function fiveRecipes() {
  let output = [];
  let recipe = {};
  for (let i = 0; i < 5; i++) {
    console.log("fetching recipe: "+(i+1));
    await singleRecipe().then((response)=> {recipe = response});
    recipe.id = i;
    output[i] = recipe;
  }
  return output;
}

export async function singleRecipe() {
  function ingToMsrMapper(ingArr, msrArr) {
    let output = {};
    for (let i = 0; i < ingArr.length; i++) {
      output[ingArr[i]] = msrArr[i];
    }
    return output;
  }
  const recipe = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
  const recipeObj = recipe.meals[0];

  let ingredientsOnly = Object.keys(recipeObj)
    .filter((key) => key.startsWith("strIngredient"))
    .map((ingKey) => {
      return recipeObj[ingKey];
    })
    .filter((item) => item != "");

  let measurementOnly = Object.keys(recipeObj)
    .filter((key) => key.startsWith("strMeasure"))
    .map((msrKey) => {
      return recipeObj[msrKey];
    })
    .filter((item) => item != "");

  const recipeItem = {
    id: null,
    title: recipeObj.strMeal,
    category: recipeObj.strCategory,
    origin: recipeObj.strArea,
    ingredients: ingToMsrMapper(ingredientsOnly, measurementOnly),
    steps: recipeObj.strInstructions.split(".").map((step) => step.trim()).filter((step) => step != ""),
    thumbsrc: recipeObj.strMealThumb + "/preview",
  };
  return recipeItem;
}

// singleRecipe().then(resolve=> (console.log(resolve)));

fiveRecipes().then(response=> (console.log(response)))
