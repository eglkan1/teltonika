// apdirbti location.href ( cia yra url'as), kad paliktu tik po id= esantis skaicius

let id = location.href.slice(37);

let countryUrl = "https://akademija.teltonika.lt/api3/countries/" + id;
fetch(countryUrl).then(
	function(res){
		res.json().then(
			function(data){
				document.getElementById("our-headline").innerHTML = data.name;
			}
		)
	}
)

let url = "https://akademija.teltonika.lt/api3/cities/"+id;
fetch(url).then(
	function(res){
		res.json().then(
			function(data){
				console.log(data)
	
				if(data.length > 0){
					let temp = "";

					//start for data loop
					for (let i = 0; i < data.length; i++){ 

						u = data[i]
						temp += "<tr>";
						temp += "<td>"+u.name; +"</td>";
						temp += "<td>"+u.area+"</td>";
						temp += "<td>"+u.population+"</td>";
						temp += "<td>"+u.postcode+"</td>";
						temp += "<td>"+u.postcode+"</td></tr>";
					}
					//close for data loop

				document.getElementById("data").innerHTML = temp;


					
				}	
			}
		)
	}
)
