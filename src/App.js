import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

   const APP_ID = '309c62a0';
   const APP_KEY = 'be54058d5d2b381deae1da1c9232d26f';

   const [recipes, setRecipe] = useState([]);
   const [search, setSearch] = useState('');
   const [query, setQuery] = useState('chicken');

   useEffect(() => {
      getRecipe();
   }, [query]);

   const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      // console.log(data.hits);
      setRecipe(data.hits);
   }

   const updateSearch = e => {
      setSearch(e.target.value);
      console.log(search);
   }

   const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
   }

   return (
      <div className="App">
         <form onSubmit={getSearch} className='search-form'>
            <input className='search-bar' type='text' value={search} onChange={updateSearch} />
            <button className='search-button' type='submit'>Search</button>
         </form>
         <div className='recipes'>
            {recipes.map(recipe => (
               <Recipe
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
               />
            ))}
         </div>
      </div>
   )
}

export default App;