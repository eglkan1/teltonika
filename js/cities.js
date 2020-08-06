// apdirbti location.href ( cia yra url'as), kad paliktu tik po id= esantis skaicius

let id = location.href.split('=').pop();
let cities = [];
let cityUrl = "https://akademija.teltonika.lt/api3/cities";
let countryUrl = "https://akademija.teltonika.lt/api3/countries/" + id;

(async function getCountryName(countryUrl){

		console.log(countryUrl);
		let response = await fetch(countryUrl);
		let data = await response.json();
		document.getElementById("changing-headline").innerHTML = data.name;

})(countryUrl);


async function getAllCities(cityUrl, sortBy) {

	if (sortBy !== "") {
		cityUrl += "?" + sortBy + "&page=";
	} else {
		cityUrl += "?page=";
	}
	let currentPage = 1;
	let lastPage = false;
	let cities = [];

	while (lastPage === false) {
		let response = await fetch(cityUrl + currentPage);
		let data = await response.json();
		// console.log(cityUrl + currentPage);
		cities = cities.concat(data);
		if (data.length === 10) {
			currentPage++;
		} else {
			lastPage = true;
		}
	}

	return cities;
}

// getAllCities(cityUrl,"");


function pagifyData(data) {
	const list_element = document.getElementById("cities-data");
	const pagination_element = document.getElementById("pagination");
	let current_page = 1;
	let rows = 10;

	function displayList(items, wrapper, rows_per_page, page) {

		page--;
		let start = rows_per_page * page;
		let end = start + rows_per_page
		let paginatedItems = items.slice(start, end);

		if (items.length > 0) {
			let temp = "";  

			let idArray = [];

			for (let i = 0; i < paginatedItems.length; i++) {

				let u = paginatedItems[i];
				idArray.push(u.id);

			    
				//start for loop

				temp += "<tr>";
				temp += "<td>" + u.name + "</td>";
				temp += "<td>" + u.area + "</td>";
				temp += "<td>" + u.population + "</td>";
				temp += "<td>" + u.postcode + "</td>";
				temp += "<td class=\"actions\"><button id=\"trash" + u.id + "\" class=\"trash\">" 
				+ "<img src=\"img/trash.svg\">" + "</button>" 
				+ " | " 
				+ "<button id=\"edit" + u.id + "\" class=\"edit\">" + "<img src=\"img/edit.svg\">" + "</button>"
				"</td></tr>";

				//end for loop

			}

			document.getElementById("data").innerHTML = temp;

			// delete

			for(let i = 0; i < idArray.length; i++){
				 
				document.getElementById("trash"+ idArray[i]).addEventListener("click", async function (){
					
					let response = await fetch(cityUrl + "/" + idArray[i], {
						method : "delete"
					});
					let data = await response.json();
					alert("Miestas pašalintas sėkmingai!");
					location.reload();
				})
			}

		// 	//end of delete

		 	//edit
			let currentUrl = location.href;
			for(let i = 0; i < idArray.length; i++){

				document.getElementById("edit"+ idArray[i]).addEventListener("click", function(){
				document.querySelector(".bg-modal-edit").style.display = "flex";
				history.pushState({
				    id: 'homepage'
				}, 'Home | My App', currentUrl + "?edit=" + idArray[i]);

			//	console.log(location.href.split('=').pop());
			});

				document.querySelector(".close-edit").addEventListener("click", function(){
				document.querySelector(".bg-modal-edit").style.display = "none";
				history.pushState({
				    id: 'homepage'
				}, 'Home | My App', currentUrl);
			});
			
		}

			 document.getElementById("button-edit").addEventListener("click", editInput);

					async function editInput () {
					let name = document.getElementById("name-edit").value;
				    let area = parseInt(document.getElementById("area-edit").value);
				    let population =  parseInt(document.getElementById("population-edit").value);
				    let postcode = document.getElementById("postcode-edit").value;
				   

				    let data = {
				    	"country_id" : id,
				        "name" : name,
				        "area" : area,
				        "population" : population,
				        "postcode" : postcode
				    }

				    editData(data);
				} 

				async function editData(data1) {
					
					let city_id = location.href.split('=').pop();
					let rawData = JSON.stringify(data1);

					let response = await fetch(cityUrl + "/" + city_id, {
						method : "put",
						headers: new Headers({
            			'Content-Type': 'application/json'
        				}),
        				body : rawData});

					    if(response.status === 200) {
				        alert("Miesto duomenys buvo sėkmingai pakeisti."); 
				        console.log(id);
				        window.location = "cities.html?id=" + id;
				    } else {
				        alert("Miesto duomenys nebuvo pakeisti. Užpildykite visus laukus.");
				    }

			}
	
			//end of edit
		}
	}


	//start for pagination

	function setupPagination(items, wrapper, rows_per_page) {
		wrapper.innerHTML = "";

		let page_count = Math.ceil(items.length / rows_per_page);
		for (let i = 1; i < page_count + 1; i++) {
			let btn = paginationButton(i, items);
			wrapper.appendChild(btn);
		}
	}

	function paginationButton(page, items) {

		let button = document.createElement("button");
		button.innerText = page;

		if (current_page == page) button.classList.add("active");

		button.addEventListener("click", function () {
			current_page = page;
			displayList(items, list_element, rows, current_page)

			let current_btn = document.querySelector(".pagenumbers button.active");
			current_btn.classList.remove("active");

			button.classList.add("active");
		});

		return button;
	} 
	//end for pagination

	displayList(data, list_element, rows, current_page);
	setupPagination(data, pagination_element, rows);
}

function sortAlphabetically(a, b) {
	var nameA = a.name.toLowerCase(),
		nameB = b.name.toLowerCase();
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
}

async function sortAscending() {

	cities.sort(sortAlphabetically);
	pagifyData(cities);
}

async function sortDescending() {
	cities.sort(sortAlphabetically).reverse();
	pagifyData(cities);
}

async function searchResult(e) {


    if (e.key === 'Enter') {
		cities = await getAllCities(cityUrl + "/" + id, "text=" + this.value);
		pagifyData(cities);
    }
}

document.getElementById("asc").addEventListener("click", sortAscending);
document.getElementById("desc").addEventListener("click", sortDescending);
document.getElementById("searchBox").addEventListener('keypress', searchResult);

(async function unsortedPage() {

	cities = await getAllCities(cityUrl + "/" + id, "");
	// console.l og(countries);
	pagifyData(cities);
})();

