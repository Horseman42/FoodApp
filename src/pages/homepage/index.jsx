import { useState } from 'react'
import RecipeItem from '../../components/recipe-item'
import Search from '../../components/search'
import './style.css'

const Homepage = () => {
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [favorites, setFavorites] = useState([])

  const getData = (get) => {
    setLoading(true)

    async function getRecipe() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=c1b21543e0ec4f1bb1b05eaa98aad347&query=${get}`,
      )
      const result = await apiResponse.json()
      const { results } = result

      if (results && results.length > 0) {
        setLoading(false)
        setRecipes(results)
      }

      
    }

    getRecipe()
  }

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorite = [...favorites]

    const index = copyFavorite.findIndex(
      (item) => item.id === getCurrentRecipeItem.id,
    )

    if (index === -1) {
      copyFavorite.push(getCurrentRecipeItem)
      setFavorites(copyFavorite)
      localStorage.setItem('favorites', JSON.stringify(copyFavorite))
    } else {
      alert('Item already added to favorites')
    }
  }

  return (
    <div className="homepage">
      <Search getData={getData} />

      {loading && <div className="loading">Loading recipes please wait...</div>}

      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  )
}

export default Homepage
