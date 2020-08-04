let cUrl = "https://akademija.teltonika.lt/api3/countries";
//console.log(data);
fetch(cUrl).then(
	function(res){
		res.json().then(
			function (data){
				console.log(data);

				const list_element = document.getElementById("countries-data");
				const pagination_element = document.getElementById("pagination");
				let current_page = 1;
				let rows = 2;

				function displayList (items, wrapper, rows_per_page, page){

					page--;
					let start = rows_per_page * page;
					let end = start + rows_per_page
					let paginatedItems = items.slice(start, end);

					if(data.count > 0){
						let temp = "";

						for (let i = 0; i < paginatedItems.length; i++) {

							let u = paginatedItems[i];

							//start for loop

								temp += "<tr>";
								temp += "<td><a id=\""+u.id+"\" href=#>"+u.name+"</td>";
								temp += "<td>"+u.area+"</td>";
								temp += "<td>"+u.population+"</td>";
								temp += "<td>"+u.calling_code+"</td>";
								temp += "<td>"+u.calling_code+"</td></tr>";

						//end for loop

						}

					document.getElementById("data").innerHTML = temp;

					//start for clickable countries

					ourHeadline = document.getElementById("main-headline");
					let listItems = document.getElementById("data").
					getElementsByTagName("a");

					for (let i = 0; i < listItems.length; i++) {

						listItems[i].addEventListener("click", activateItem)
					}

					function activateItem(){

						window.location = "cities.html?id=" + this.id;
					}
				}
			}


				//end for clickable countries

				//start for pagination

				function setupPagination (items, wrapper, rows_per_page){
					wrapper.innerHTML = "";

					let page_count = Math.ceil(items.length / rows_per_page);
					for (let i = 1; i < page_count + 1; i++) {
						let btn = paginationButton(i, items);
						wrapper.appendChild(btn);
					}
				}

				function paginationButton (page, items) {

					let button = document.createElement("button");
					button.innerText = page;

					if (current_page == page) button.classList.add("active");

					button.addEventListener("click", function(){
						current_page = page;
						displayList(items, list_element, rows, current_page)

						let current_btn = document.querySelector(".pagenumbers button.active");
						current_btn.classList.remove("active");

						button.classList.add("active");
					});

					return button;
				}

				//end for pagination

			displayList(data.countires, list_element, rows, current_page);
			setupPagination(data.countires, pagination_element, rows);
			
	})
})


