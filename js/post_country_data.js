
document.getElementById("button2").addEventListener("click", takeInput);
let postUrl = "https://akademija.teltonika.lt/api3/countries";

function takeInput () {
    let name = document.getElementById("name").value;
    let area = parseInt(document.getElementById("area").value);
    let population =  parseInt(document.getElementById("population").value);
    let calling_code = document.getElementById("calling_code").value;
    // console.log("pavadinimas: " + name);
    // console.log("plotas: " + area);
    // console.log("gyventojai: " + population);
    // console.log("telefonas: " + calling_code);
    let data = {
        "name" : name,
        "area" : area,
        "population" : population,
        "calling_code" : calling_code
    }
    //patikrint, ar duomenys korektiski

    //
    postData(data);
}

async function postData(data)
{
    let rawData = JSON.stringify(data);
  //  console.log(data);
    let response = await fetch(postUrl, {
        method : 'Post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body : rawData});
    console.log(response);

    if(response.status === 200) {
        alert("Sekmingai"); 
        location.reload();
    } else {
        alert("Blogai");
    }
}
