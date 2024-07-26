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
function showContacts() {
  listItems.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
