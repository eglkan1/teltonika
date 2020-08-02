
let url = "https://akademija.teltonika.lt/api3/countries";
let ourHeadline;
fetch(url).then(
	function(res){
		res.json().then(
			function(data){
				console.log(data)
	
				if(data.count > 0){
					let temp = "";

					//start for data loop
					for (let i = 0; i < data.count; i++){ 

						u = data.countires[i];
						temp += "<tr>";
						temp += "<td><a id=\""+u.id+"\" href=#>"+u.name+"</td>";
						temp += "<td>"+u.area+"</td>";
						temp += "<td>"+u.population+"</td>";
						temp += "<td>"+u.calling_code+"</td>";
						temp += "<td>"+u.calling_code+"</td></tr>";
					}
					//close for data loop

				document.getElementById("data").innerHTML = temp;
				
				ourHeadline = document.getElementById("main-headline");
				console.log(ourHeadline);
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
		)
	}
)



