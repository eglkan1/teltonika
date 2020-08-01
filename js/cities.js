

function test() {

	let url = "https://akademija.teltonika.lt/api3/cities";
	fetch(url).then(
		function(res){
			res.json().then(
				function(data){
					console.log(data)
		
					if(data.count > 0){
						let temp = "";

						//start for data loop
						for (let i = 0; i < data.count; i++){ 

							u = data.cities[i];
							temp += "<tr>";
							temp += "<td>"+u.name+"</td>";
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

}
