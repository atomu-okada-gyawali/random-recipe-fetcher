import "./App.css";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import { fiveRecipes } from "./backend";
function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [recipes, setRecipes] = useState([]);

  function selectHandler(id) {
    if (id == selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }
  return (
    <div id="root">
      <h1>Random recipes</h1>
      <button
        onClick={() => {
          fiveRecipes().then((res) => setRecipes(res));
          setSelectedId(null);
        }}
      >
        {recipes == false ? "Start" : "Reload"}
      </button>
      <div className="recipes">
        {recipes.map((d) => {
          let id = d.id;
          return (
            <RecipeCard
              key={id}
              id={id}
              title={d.title}
              origin={d.origin}
              category={d.category}
              ingredients={d.ingredients}
              steps={d.steps}
              selected={selectedId == id}
              onClick={() => selectHandler(id)}
              thumbsrc={d.thumbsrc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
