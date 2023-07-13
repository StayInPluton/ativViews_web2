const axios = require('axios');

axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
  .then(response => {
    const meals = response.data.meals;
    console.log(meals);
  })
  .catch(error => {
    console.error('Erro ao realizar a requisição:', error);
  });
