function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;
    const keyword = document.getElementById('keyword').value.trim();

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersChars = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';

    let characters = '';

    if (includeUppercase) characters += uppercaseChars;
    if (includeLowercase) characters += lowercaseChars;
    if (includeNumbers) characters += numbersChars;
    if (includeSpecial) characters += specialChars;

    if (characters.length === 0) {
        alert("Por favor, selecciona al menos una opción para los tipos de caracteres.");
        return;
    }

    let password = '';

    // Si hay una palabra clave, agregarla primero
    if (keyword) {
        password = keyword;
    }

    // Generar el resto de la contraseña aleatoria
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById('password').textContent = password;
}