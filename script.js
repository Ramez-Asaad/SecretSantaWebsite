const names = ["Alice", "Bob", "Charlie", "Dana", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"];

document.addEventListener("DOMContentLoaded", () => {
    const nameSelector = document.getElementById("name-selector");
    const loginBtn = document.getElementById("login-btn");
    const spinBtn = document.getElementById("spin-btn");
    const resultName = document.getElementById("result-name");
    const loginScreen = document.getElementById("login-screen");
    const wheelScreen = document.getElementById("wheel-screen");
    const resultScreen = document.getElementById("result-screen");

    // Populate the name selector
    names.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        nameSelector.appendChild(option);
    });

    // Handle login
    loginBtn.addEventListener("click", () => {
        const selectedName = nameSelector.value;
        if (selectedName) {
            loginScreen.classList.add("hidden");
            wheelScreen.classList.remove("hidden");
        } else {
            alert("Please select your name!");
        }
    });

    // Handle spinning the wheel
    spinBtn.addEventListener("click", () => {
        if (names.length > 0) {
            const randomIndex = Math.floor(Math.random() * names.length);
            const selectedName = names.splice(randomIndex, 1)[0];
            resultName.textContent = selectedName;
            wheelScreen.classList.add("hidden");
            resultScreen.classList.remove("hidden");
        } else {
            alert("All names have been picked!");
        }
    });
});
