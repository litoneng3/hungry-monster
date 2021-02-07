document.getElementById('searchBtn').addEventListener('click', function () {
    promiseFood();
    document.getElementById('input-food').value = "";
    document.getElementById('foodItem').innerHTML = "";
});

const promiseFood = () => {
    const foodName = document.getElementById('input-food').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            displayInfo(data.meals);
        })
        .catch(error => {
            errorMessage();
        })
}

const errorMessage = () => {
    console.log("error occurs");
    const errorText = document.createElement('h3');
    errorText.innerText = 'Nothing Matched found. Please Try Again.....';
    foodItem.appendChild(errorText);
}

const displayInfo = foods => {
    const foodItem = document.getElementById('foodItem');
    foods.forEach(food => {
        // console.log(food.strMeal);
        const foodInfo = `
            <img src="${food.strMealThumb}">
            <h2>${food.strMeal}</h2>
        `;
        const foodDiv = document.createElement('div');
        foodDiv.innerHTML = foodInfo;
        foodDiv.addEventListener('click', function () {
            showDetails(food.strMeal);
        })
        foodDiv.className = "food-items";
        // console.log(foodDiv);
        foodItem.appendChild(foodDiv);
    });
}

const showDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodDetails(data.meals);
        })

}

const renderFoodDetails = food => {
    const foodDetailsDiv = document.getElementById('foodDetail');
    foodDetail.innerHTML = `
        <img src="${food[0].strMealThumb}">
        <h2>${food[0].strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>
            <li>${food[0].strIngredient2}</li>
            <li>${food[0].strIngredient4}</li>
            <li>${food[0].strIngredient3}</li>                
            <li>${food[0].strIngredient6}</li>                
            <li>${food[0].strIngredient8}</li>                
            <li>${food[0].strIngredient9}</li>                
            <li>${food[0].strMeasure2}</li>
            <li>${food[0].strMeasure4}</li>
            <li>${food[0].strMeasure6}</li>
            <li>${food[0].strMeasure5}</li>
            <li>${food[0].strMeasure8}</li>
            <li>${food[0].strMeasure9}</li>
        </ul>
        <button id="showFood" class="btn btn-info">Show All Food Items</button>
    `;
    foodDetailsDiv.style.display = "block";

    document.getElementById('showFood').addEventListener('click', function () {
        document.getElementById('foodDetail').style.display = "none";
    })



}