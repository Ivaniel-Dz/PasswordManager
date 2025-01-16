document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todos los botones "Mostrar"
    const showButtons = document.querySelectorAll(".action-btn.show");

    showButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Encontrar la celda de numeración en la misma fila
            const row = this.closest("tr");
            const cardNumberCell = row.querySelector(".card-number");

            // Obtener el número completo de la tarjeta
            const fullNumber = cardNumberCell.getAttribute("data-number");

            // Verificar si el número ya está visible
            if (cardNumberCell.textContent === "************") {
                // Mostrar el número completo
                cardNumberCell.textContent = fullNumber;
                this.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';  // Cambiar el ícono del botón
            } else {
                // Ocultar el número, mostrando asteriscos
                cardNumberCell.textContent = "************";
                this.innerHTML = '<i class="fa-regular fa-eye"></i>';  // Cambiar el ícono del botón
            }
        });
    });
});