import * as model from './model.js';
import recipeView from './views/recipeView.js';

// Import sass and html files
import "../sass/main.scss";
import "../../index.html";
// Polyfilling everything else
import 'core-js/stable';
// Polyfilling async-await
import 'regenerator-runtime/runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // Loading spinner
    recipeView.renderSpinner();
    // Loading recipe
    await model.loadRecipe(id);
    // Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    alert(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
