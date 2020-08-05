let countryUrl = "https://akademija.teltonika.lt/api3/countries";

async function getAllCountries(countryUrl) {
	countryUrl += "?page=";
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
				+ "<button id=edit\"" + u.id + "\" class=\"edit\">" + "<img src=\"img/edit.svg\">" + "</button>"
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
					console.log(response);

					console.log(data);
					alert(JSON.stringify(data));
					location.reload();
				})
			}

			//end of delete

			//edit

			for(let i = 0; i < idArray.length; i++){
				let u = document.getElementById("edit"+ idArray[i]);
				console.log("edit"+idArray[i]);

			}

		//	document.getElementById("button1").addEventListener("click", 
		//	function(){
		//	document.querySelector(".bg-modal").style.display = "flex";
//});



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

(async function () {

	let countries = await getAllCountries(countryUrl);
	pagifyData(countries);


})();