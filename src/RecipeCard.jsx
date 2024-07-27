import React from "react";
import { useState } from "react";
import recipeCardCSS from "./RecipeCard.module.css";
function RecipeCard({
  id,
  title,
  category,
  origin,
  ingredients,
  steps,
  selected,
  onClick,
  thumbsrc
}) {
  return (
    <div className={recipeCardCSS.recipeCard} onClick={onClick}>
      <p>Recipe {id + 1}</p>
      <div className={recipeCardCSS.summary}>
        <img className={recipeCardCSS.icon} src={thumbsrc}></img>
        <div className={recipeCardCSS.header}>
          <h4 className={recipeCardCSS.title}>{title}</h4>
          <div className={recipeCardCSS.subHeader}>
            <p className={recipeCardCSS.time}>Origin: {origin}</p>
            <p className={recipeCardCSS.author}>Category: {category}</p>
          </div>
        </div>
      </div>
      <div
        className={selected ? recipeCardCSS.expand : recipeCardCSS.collapsed}
      >
        <div className={recipeCardCSS.ingredients}>
          <h3>Ingredients</h3>
          <ol>
            {Object.entries(ingredients).map(([ingredient,measure], i) => (
              <li key={i}>{`${measure} of ${ingredient}`}</li>
            ))}
          </ol>
        </div>
        <div className={recipeCardCSS.steps}>
          <h3>Steps</h3>
          <ol>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
