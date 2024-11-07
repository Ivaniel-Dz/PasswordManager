document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("customModal");
    var closeButton = document.querySelector(".close-button");

    // Función para cerrar el modal al hacer clic en la "X"
    closeButton.onclick = function () {
        modal.style.display = "none";
    };

    // Cierra el modal al hacer clic fuera del contenido
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

function openModal(id) {
    var modal = document.getElementById("customModal");
    modal.style.display = "block";

    // Realiza la solicitud AJAX para cargar los detalles
    fetch(`/Password/Detalle/${id}`)
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido devuelto en el modal-content sin reemplazar el botón de cerrar
            document.querySelector(".modal-content").innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}
