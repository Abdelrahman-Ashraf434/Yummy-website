const listItems = document.querySelector("#list-items");
const searchItems = document.querySelector("#search-items");
//------------------Home Meal Screen and Details------------------
$(document).ready(function () {
  $(".splash-screen").fadeOut(500);
  $("body").css("overflow", "visible");
});
function toggleNav() {
  $(".side-nav").css("backgroundColor", "#000");
  $(".side-nav").toggleClass("expanded");
  $(".icon-nav").toggleClass("fa-x");
}
function sideNavBar() {}
$(".icon-nav").on("click", function () {
  toggleNav();
});
(async function getHomeItems() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  response = await response.json();
  displayItems(response.meals);
})();
function displayItems(meals) {
    searchItems.innerHTML = "";

  let blackbox = "";
  for (let i = 0; i < meals.length; i++) {
    const element = meals[i];
    blackbox += `<div class="col-md-3 py-2">
      <div meal-id="${element.idMeal}" class="meal-item position-relative rounded-4">
        <img class="w-100" src="${element.strMealThumb}" alt="${element.strMeal}">
        <div class="layer">
          <h3 class="px-2 text-black">${element.strMeal}</h3>
        </div>
      </div>
    </div>`;
  }
  listItems.innerHTML = blackbox;

  const mealItemList = document.querySelectorAll("div.meal-item");
  for (let i = 0; i < mealItemList.length; i++) {
    mealItemList[i].addEventListener("click", function (e) {
      const mealId = e.currentTarget.getAttribute("meal-id");
      getMealDetails(mealId);
      console.log(mealId);
    });
  }
}
async function getMealDetails(mealId) {
  $(".splash-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $(".splash-screen").fadeOut(300);
}

function displayMealDetails(meals) {
        searchItems.innerHTML = "";
  listItems.innerHTML = "";
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meals[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meals[`strMeasure${i}`]
      } ${meals[`strIngredient${i}`]}</li>`;
    }
  }

  const blackBox = `
          <div class="col-md-4">
            <img
              src="${meals.strMealThumb}"
              class="w-100 img-fluid rounded-3"
              alt="${meals.strMeal}"
            />
          </div>
          <div class="col-md-8">
            <div class="meal-details">
              <h3>Instructions</h3>
              <p>
                ${meals.strInstructions}
              </p>
              <h3>Area : ${meals.strArea}</h3>
              <h3>Category : ${meals.strCategory}</h3>
              <h3>Recipes :</h3>
            </div>
            <ul class="d-flex list-unstyled g-3 flex-wrap">
              ${ingredients}
            </ul>
            <h3 class="text-white">Tags :</h3>
            <ul class="d-flex list-unstyled g-3 flex-wrap">
              <li class="alert alert-danger m-2 p-1">${
                meals.strTags ? meals.strTags : ""
              }</li>
            </ul>
            <a
              href="${meals.strSource}"
              class="btn btn-success"
              >Source</a
            >
            <a
              href="${meals.strYoutube}"
              class="btn btn-danger"
              >Youtube</a
            >
          </div>
        `;

  listItems.innerHTML = blackBox;
}
//----------------------Categories---------------
async function getCategories() {
  toggleNav();
  $(".splash-screen").fadeIn(300);
  listItems.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".splash-screen").fadeOut(300);
}
function displayCategories(cate) {
    searchItems.innerHTML = "";

  let blackbox = "";
  for (let i = 0; i < cate.length; i++) {
    const element = cate[i];
    blackbox += `
    <div class="col-md-3 g-3">
            <div category="${
              element.strCategory
            }" class="meal-item position-relative overflow-hidden mx-3 rounded-2 cursor-pointer ">
                <img class="w-100" src="${
                  element.strCategoryThumb
                }" alt="" srcset="">
                <div class="layer position-absolute d-flex flex-column align-items-center text-center text-black p-2  ">
                    <h3>${element.strCategory}</h3>
                    <p>${element.strCategoryDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                </div>
            </div>
    </div>
`;
  }
  listItems.innerHTML = blackbox;
  const categoriesItemList = document.querySelectorAll("div.meal-item");
  for (let i = 0; i < categoriesItemList.length; i++) {
    categoriesItemList[i].addEventListener("click", function (e) {
      const category = e.currentTarget.getAttribute("category");
      getCategoryMeals(category);
      console.log(category);
    });
  }
}
async function getCategoryMeals(category) {
  $(".splash-screen").fadeIn(300);
  listItems.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayItems(response.meals);
  $(".splash-screen").fadeOut(300);
}
//----------------------Area---------------
async function getArea() {
  toggleNav();
  $(".splash-screen").fadeIn(300);
  listItems.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".splash-screen").fadeOut(300);
}
function displayArea(area) {
    searchItems.innerHTML = "";
  let blackbox = "";
  for (let i = 0; i < area.length; i++) {
    const element = area[i];
    blackbox += `
    <div class="col-md-3 g-3">
            <div area="${element.strArea}" class="meal-item position-relative overflow-hidden mx-3 rounded-2 cursor-pointer ">
                <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                    <h3 class="text-white">${element.strArea}</h3>
        
            </div>
    </div>
`;
  }
  listItems.innerHTML = blackbox;
  const areaItemList = document.querySelectorAll("div.meal-item");
  for (let i = 0; i < areaItemList.length; i++) {
    areaItemList[i].addEventListener("click", function (e) {
      const area = e.currentTarget.getAttribute("area");
      getAreaMeals(area);
      console.log(area);
    });
  }
}
async function getAreaMeals(area) {
  $(".splash-screen").fadeIn(300);
  listItems.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayItems(response.meals);
  $(".splash-screen").fadeOut(300);
}
//----------------------Ingredients---------------
async function getIngredients() {
  toggleNav();

  $(".splash-screen").fadeIn(300);
  listItems.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $(".splash-screen").fadeOut(300);
}
function displayIngredients(ingredients) {
    searchItems.innerHTML = "";

  let blackbox = "";
  for (let i = 0; i < ingredients.length; i++) {
    const element = ingredients[i];
    blackbox += `
    <div class="col-md-3 g-3">  
            <div ingredient="${
              element.strIngredient
            }" class="meal-item position-relative overflow-hidden mx-3 rounded-2 cursor-pointer d-flex flex-column justify-content-center align-items-center text-white  ">
                <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                    <h3>${element.strIngredient}</h3>
                    <p class="text-center">${element.strDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
            </div>
    </div>
`;
  }
  listItems.innerHTML = blackbox;
  const ingredientsItemList = document.querySelectorAll("div.meal-item");
  for (let i = 0; i < ingredientsItemList.length; i++) {
    ingredientsItemList[i].addEventListener("click", function (e) {
      const ingredient = e.currentTarget.getAttribute("ingredient");
      getIngredientMeals(ingredient);
      console.log(ingredient);
    });
  }
}
async function getIngredientMeals(ingredient) {
    $(".splash-screen").fadeIn(300);
    listItems.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();
  displayItems(response.meals);
  $(".splash-screen").fadeOut(300);
}
//-----------------------------Search---------------

function displaySearchInputs() {
  toggleNav();

  searchItems.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white"  placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white"  placeholder="Search By First Letter">
        </div>
    </div>`;
  listItems.innerHTML = "";
}

async function searchByName(word) {
  listItems.innerHTML = "";
  $(".splash-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );
  response = await response.json();

  if (response.meals) {
    displayItems(response.meals);
  } else {
    displayItems([]);
  }
  $(".splash-screen").fadeOut(300);
}

async function searchByLetter(letter) {
  listItems.innerHTML = "";
  $(".splash-screen").fadeIn(300);

  letter == "" ? (letter = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  response = await response.json();

  if (response.meals) {
    displayItems(response.meals);
  } else {
    displayItems([]);
  }
  $(".splash-screen").fadeOut(300);
}
