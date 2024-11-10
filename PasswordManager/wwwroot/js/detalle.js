function togglePassword() {
    const hiddenPassword = document.getElementById("password-hidden");
    const visiblePassword = document.getElementById("password-visible");

    if (hiddenPassword.style.display === "none") {
        hiddenPassword.style.display = "inline";
        visiblePassword.style.display = "none";
    } else {
        hiddenPassword.style.display = "none";
        visiblePassword.style.display = "inline";
    }
}
