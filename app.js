const search = document.querySelector(".button");
const input = document.querySelector(".input");
const container = document.querySelector(".container-wrapper");
let result = document.querySelector(".result");
let container_result = document.querySelector(".container-result");

let input_data;

async function api() {
	let api_link = await fetch(
		`https:www.themealdb.com/api/json/v1/1/search.php?s=${input_data}&a=Jamaican`,
	);
	let api = await api_link.json();

	return api;
}

async function print() {
	let api_get = await api();
	let name = api_get.meals.length;

	for (let i = 0; i < name; i++) {
		let food = {
			search: input_data,
			tittle: api_get.meals[i].strMeal,
			image: api_get.meals[i].strMealThumb,
			description: api_get.meals[i].strInstructions,
		};
		if (i <= 8 || i === 1) {
			container.innerHTML += `
            <div class="card">
            <img class="food-img" src="${food.image}" alt="food" width="70px">
            <h2>${food.tittle}</h2>
            <div class="button-card">More</div>
            </div>

            <div class="description">
            <div class="image">
            <img src="img/circle-xmark-solid.svg"  width="40px"> 
            </div>
           
            <h2 class="food-name">${food.tittle}</h2><br>
            <h4>Instruction By Steps</h4><br>
                <p>${food.description}</p>
            </div>
            `;
			setTimeout(() => {
				let card = document.querySelectorAll(".card");
				card.forEach((element) => {
					element.classList.add("show-card");
				});
			}, 550);
		}
		input_data = "";
	}

	let button = document.querySelectorAll(".button-card");

	let description = document.querySelectorAll(".description");

	let food_name = document.querySelectorAll(".food-name");

	let image = document.querySelectorAll(".image");

	for (let i = 0; i < button.length; i++)
		button[i].addEventListener("click", () => {
			description[i].classList.add("show-button");
			food_name[i].style.color = "red";
			food_name[i].style.fontweight = "1000px";

			image[i].addEventListener("click", () => {
				description[i].classList.remove("show-button");
			});
		});
}

search.addEventListener("click", () => {
	container_result.classList.add("show-result");
	result.classList.add("add-result");
	valid_input();
});

window.addEventListener("keydown", (ev) => {
	if (ev.key === "Enter") {
		valid_input();

		result.classList.add("add-result");
		container_result.classList.add("show-result");
	}
});

function valid_input() {
	input_data = input.value;
	if (input_data) {
		container.innerHTML = "";
		print();
		input.value = "";
	}
}
