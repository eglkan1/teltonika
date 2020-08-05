let countryUrl = "https://akademija.teltonika.lt/api3/countries";

async function getAllCountries(countryUrl, sortBy) {

	if (sortBy !== "") {
		countryUrl += "?" + sortBy + "&page=";
		console.log(countryUrl);
	} else {
		countryUrl += "?page=";
		console.log(countryUrl);
	}
	let currentPage = 1;
	let lastPage = false;
	let countries = [];

	while (lastPage == false) {
		let response = await fetch(countryUrl + currentPage);
		let data = await response.json();
		countries = countries.concat(data.countires);

		if (data.countires.length === 10) {
			currentPage++;
		} else {
			lastPage = true;
		}3
	}

	return countries;
}

function pagifyData(data) {
	const list_element = document.getElementById("countries-data");
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
				temp += "<td><a id=\"" + u.id + "\" href=#>" + u.name + "</td>";
				temp += "<td>" + u.area + "</td>";
				temp += "<td>" + u.population + "</td>";
				temp += "<td>" + u.calling_code + "</td>";
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
					
					let response = await fetch(countryUrl + "/" + idArray[i], {
						method : "delete"
					});
					let data = await response.json();
					alert(JSON.stringify(data));
					location.reload();
				})
			}

			//end of delete

			//edit
			let currentUrl = location.href;
			for(let i = 0; i < idArray.length; i++){

				document.getElementById("edit"+ idArray[i]).addEventListener("click", function(){
				console.log(location.href);
			//	window.location = "index.html?edit_id=" + this.id;
				// window.onLoad(document.querySelector(".bg-modal-edit").style.display = "flex");
				document.querySelector(".bg-modal-edit").style.display = "flex";
				history.pushState({
				    id: 'homepage'
				}, 'Home | My App', currentUrl + "?edit=" + idArray[i]);

				console.log(location.href.split('=').pop());
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
				    let calling_code = document.getElementById("calling_code-edit").value;
				   

				    let data = {
				        "name" : name,
				        "area" : area,
				        "population" : population,
				        "calling_code" : calling_code
				    }

				    editData(data);
				}

				async function editData(data1) {
					
					let id = location.href.split('=').pop();
					let rawData = JSON.stringify(data1);
					console.log(rawData);
					let response = await fetch(countryUrl + "/" + id, {
						method : "put",
						headers: new Headers({
            			'Content-Type': 'application/json'
        				}),
        				body : rawData});

					    if(response.status === 200) {
				        alert("Sekmingai"); 
				        window.location = "index.html";
				    } else {
				        alert("Blogai");
				    }

			}
	
			//end of edit


			ourHeadline = document.getElementById("main-headline");
			let listItems = document.getElementById("data").
			getElementsByTagName("a");

			for (let i = 0; i < listItems.length; i++) {

				listItems[i].addEventListener("click", activateItem)
			}

			function activateItem() {

				window.location = "cities.html?id=" + this.id;
			}
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

(async function unsortedPage() {

	countries = await getAllCountries(countryUrl, "");
	// console.l og(countries);
	pagifyData(countries);
})();

async function sortAscending() {
	countries.sort(sortAlphabetically);
	pagifyData(countries);
}

async function sortDescending() {
	countries.sort(sortAlphabetically).reverse();
	pagifyData(countries);
}

async function searchResult(e) {
    if (e.key === 'Enter') {
		countries = await getAllCountries(countryUrl, "text=" + this.value);
		pagifyData(countries);
    }
}

document.getElementById("asc").addEventListener("click", sortAscending);
document.getElementById("desc").addEventListener("click", sortDescending);
document.getElementById("searchBox").addEventListener('keypress', searchResult);


