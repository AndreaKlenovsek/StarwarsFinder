const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
const selectOption = document.getElementById("selectOption");


if(selectOption.value) {
search.addEventListener("input", () => searchPersons(search.value));
}


const searchPersons = async searchText => {
const res = await fetch(`https://swapi.co/api/${selectOption.value}/`);
const jsonRes = await res.json();
const output = jsonRes.results;

let matches = output.filter(item => {
const regEx = new RegExp(`^${searchText}`, "gi");
switch(selectOption.value) {
case "films":
return item.title.match(regEx);
break;
case "planets": case "people": case "species": case "starships": case "vehicles":
return item.name.match(regEx);
break;
} 
});

if(searchText.length === 0) {
matches = [];
}

outputHtml(matches);
};


const outputHtml =  matches => {
if(matches.length > 0) {
const html = matches.map(match => {
if(selectOption.value === "films") {
return `
<div class="card card-body">
    <h4>${match.title}</h4> 
    <span class=" py-1">Director: ${match.director}</span>
    <small>Producer: ${match.producer}</small>
    <small>Release Date: ${match.release_date}</small>
</div>
`;
} else if(selectOption.value === "planets") {
    return `
    <div class="card card-body">
        <h4>${match.name}</h4> 
        <span class=" py-1">Climate: ${match.climate}</span>
        <small>Population: ${match.population}</small>
        <small>Rotation Period: ${match.rotation_period}</small>
        <small>Surface Water: ${match.orbital_period}</small>
    </div>
    `;
} else if(selectOption.value === "people") {
    return `
    <div class="card card-body">
        <h4>${match.name}</h4> 
        <span class=" py-1">Gender: ${match.gender}</span>
        <small>Birth Year: ${match.birth_year}</small>
        <small>Height: ${match.height}</small>
        <small>Mass: ${match.mass}</small>
    </div>
    `;
} else if(selectOption.value === "species") {
    return `
    <div class="card card-body">
        <h4>${match.name}</h4> 
        <span class="py-1">Avg Height: ${match.average_height}</span>
        <small>Lifespan: ${match.average_lifespan}</small>
        <small>Classification: ${match.classification}</small>
        <small>Designation: ${match.designation}</small>
        <small>Language: ${match.language}</small>
        <small>Skin Color: ${match.skin_colors}</small>
    </div>
    `;
}
else if(selectOption.value === "starships" || selectOption.value === "vehicles") {
    return `
    <div class="card card-body">
        <h4>${match.name}</h4> 
        <span class="py-1">Model: ${match.model}</span>
        <small>Manufacturer: ${match.manufacturer}</small>
        <small>Cargo Capacity: ${match.cargo_capacity}</small>
        <small>Crew: ${match.crew}</small>
        <small>Passengers: ${match.passengers}</small>
        <small>Consumables: ${match.consumables}</small>
    </div>
    `;
}
}).join("");
matchList.innerHTML = html;
} else if(matches.length === 0 && search.value !== "") {
matchList.innerHTML = '<div class="card card-body text-center">No match found. Please search for something else!</div>';
} else {
matchList.innerHTML = "";
}
};


