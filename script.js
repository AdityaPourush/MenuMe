// for random image

let randomContainer = document.querySelector(".random_container");

async function getRandomImage() {
    let randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

    try {
        let response = await axios.get(randomUrl)
        let data = await response.data
        console.log(data);
        let image = data.meals[0].strMealThumb;
        // console.log('image :', image);
        let name = data.meals[0].strMeal;
        // console.log('name :', name);
        let cuisine = data.meals[0].strArea;
        // console.log('cuisine :', cuisine);

        randomContainer.innerHTML = `<img src="${image}" alt="">
        <p id="meal_name">${name}</p>
        <p id="cuisine">Cuisine: ${cuisine}</p>`

        let brief = document.querySelector(".brief");
        brief.innerHTML = `<img src="${image}" alt="">
        <p id="meal_name">${name}</p>
        <p id="cuisine">Cuisine: ${cuisine}</p>`

        let ingredientsList = document.querySelector("#ingredients_list");
        let measurementsList = document.querySelector("#measurements_list");

        for (let i = 1; i <= 20; i++) {
            if (data.meals[0]['strIngredient' + i] !== "") {
                ingredientsList.innerHTML += `<li>${data.meals[0]['strIngredient' + i]}</li>`
                measurementsList.innerHTML += `<li>${data.meals[0]['strMeasure' + i]}</li>`
            } else {
                break;
            }
        }

        let instructions = document.querySelector(".modal_details_text");
        instructions.innerHTML = `<p>${data.meals[0].strInstructions}</p>`;
    }
    catch (error) {
        console.log("error: ", error);
    }
}

getRandomImage()

let refresh = document.querySelector(".refresh");
refresh.addEventListener("click", getRandomImage)

let detail_button = document.querySelector(".details");
let modal = document.querySelector(".modal");
detail_button.addEventListener("click", () => {
    modal.style.display = "block";
    console.log("clicked");
})

let close = document.querySelector("#close");
close.addEventListener("click", () => {
    modal.style.display = "none";
})

// making for search and results

let recipiesContainer = document.querySelector(".recipes_container")
let searchElement = document.querySelector("#search")

async function getRecipies() {
    recipiesContainer.innerHTML = "";
    let search = document.querySelector("#search").value;
    console.log(search);
    let searchUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;

    try {
        let response = await axios.get(searchUrl)
        let data = await response.data
        console.log(data);
        data.meals.forEach(element => {
            recipiesContainer.innerHTML += `<div class="meal"><img src="${element.strMealThumb}" alt="">
        <p id="meal_name">${element.strMeal}</p>
        <p id="cuisine">Cuisine: ${element.strArea}</p>
        <div><p id="grid_detail">More Details</p></div></div>`
        });
    }
    catch (error) {
        console.log("error: ", error);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.activeElement === searchElement) {
        getRecipies();
    }
});

document.querySelector("#search_button").addEventListener("click", getRecipies)

let navbar = document.querySelector(".navbar");
document.addEventListener("scroll", () => {
    navbar.style.zIndex = 2;
});