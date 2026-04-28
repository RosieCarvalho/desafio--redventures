//SELECT FILTERS
const options = document.querySelectorAll(".selected-item");

const filtersSelects = {
  sun: "",
  water: "",
  pets: "",
};
const filtersNames = {
  no: "No sunlight",
  low: "Low sunlight",
  high: "High sunlight",
  rarely: "Rarely",
  regularly: "Regularly",
  daily: "Daily",
  true: "Yes",
  false: "No/They don't care",
};

function selectFilters(event, name) {
  filtersSelects[name] = event.target.id;

  if (filtersSelects.pets && filtersSelects.sun && filtersSelects.water) {
    buscarPlantas(
      filtersSelects.sun,
      filtersSelects.water,
      filtersSelects.pets
    );
    console.log("event", filtersSelects);
  }
}

options.forEach((option) => {
  const optionUl = option.querySelector(".options");
  //melhorar essa função
  option.addEventListener("focusin", (event) => {
    const option = event.target.querySelector("ul");
    const optionselect = document.querySelector(
      `[data-name=${option.dataset.name}]`
    );
    optionselect.classList.add("optionsView");
  });

  option.addEventListener("focusout", (event) => {
    const option = event.target.querySelector("ul");
    const optionselect = document.querySelector(
      `[data-name=${option.dataset.name}]`
    );
    optionselect.classList.remove("optionsView");
  });

  optionUl.addEventListener("click", (evt) => {
    const selected = option.querySelector("p");
    selected.innerHTML = filtersNames[evt.target.id];
    selectFilters(evt, optionUl.dataset.name);
  });
});

//CARDS RESULT FILTERS
function createCardPlants(plant) {
  const div = document.createElement("div");
  div.classList.add("card-plant-result");
  div.innerHTML = `<div><img src=${plant.url} alt="Bunny" /></div><div class="legends"><p>${plant.name}</p><h3>$${plant.price}</h3></div>`;
  return div;
}

const card = document.querySelector(".result-plants");
function preencherPlants(plant) {
  const divPlants = createCardPlants(plant);
  card.appendChild(divPlants);
}

async function buscarPlantas(sun, water, pets) {
  await fetch(
    `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`
  )
    .then((res) => res.json())
    .then((body) => {
      console.log("res", body);
      body.forEach((plant) => preencherPlants(plant));
    })
    .catch((err) => console.log("err", err));
}
