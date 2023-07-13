const express = require('express');
const axios = require('axios');
const router = express.Router();

// Rota da página inicial (home)
router.get('/', (req, res) => {
  res.render('home');
});
// Rota para exibir a página inicial
router.get('/', (req, res) => {
    res.render('home');
  });
  
  // Rota para realizar a pesquisa
  router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
  
      // Realiza a consulta ao mealsDB para buscar as comidas com base no termo de pesquisa
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const meals = response.data.meals;
  
      if (meals && meals.length > 0) {
        const mealIds = meals.map(meal => meal.idMeal);
        const detailedMealsPromises = mealIds.map(id => axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`));
        const detailedMealsResponses = await Promise.all(detailedMealsPromises);
        const detailedMeals = detailedMealsResponses.map(response => response.data.meals[0]);
  
        res.render('results', { meals: detailedMeals });
      } else {
        res.render('results', { meals: [] });
      }
    } catch (error) {
      console.error('Erro ao realizar a pesquisa:', error);
      res.render('results', { meals: [] });
    }
  });
  
  

module.exports = router;
