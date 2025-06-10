document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("number").value.trim();
    const recaptchaResponse = grecaptcha.getResponse();

    // Simple phone regex for Swiss-style numbers (adjust if needed)
    const phoneRegex = /^[+]?[(]?[0-9]{2,4}[)]?[-\s./0-9]*$/;

    if (!email.includes("@") || !email.includes(".")) {
        alert("Bitte gib eine gültige E-Mail-Adresse ein.");
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert("Bitte gib eine gültige Telefonnummer ein.");
        return;
    }

    if (!recaptchaResponse) {
        alert("Bitte bestätige, dass du kein Roboter bist.");
        return;
    }

    // ✅ Passed all validations
    alert("Formular erfolgreich gesendet! (Simuliert auf localhost)");

    // If you had a backend, you would now POST the data using fetch()
});