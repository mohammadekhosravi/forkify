import * as model from './model.js';
import recipeView from './views/recipeView.js';

// Import sass and html files
import "../sass/main.scss";
import "../../index.html";
// Polyfilling everything else
import 'core-js/stable';
// Polyfilling async-await
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
///////////////////////////////////////

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

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
