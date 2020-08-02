function buttonClick(){
document.getElementById("button1").addEventListener("click", 
	function(){
	document.querySelector(".bg-modal").style.display = "flex";
});
}

function closeButton(){
	document.querySelector(".close").addEventListener("click", function(){
		document.querySelector(".bg-modal").style.display = "none";
	})
}