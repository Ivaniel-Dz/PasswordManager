document.addEventListener('DOMContentLoaded', function () {
	var modal = document.getElementById("customModal");
	var btn = document.getElementById("openModalButton");
	var span = document.querySelector(".close-button");

	btn.onclick = function () {
		modal.style.display = "block";
	}

	span.onclick = function () {
		modal.style.display = "none";
	}

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
});
