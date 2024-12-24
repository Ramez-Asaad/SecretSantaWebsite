const userCredentials = {
    "Ramez": "password123",
    "Malak A": "holiday456",
    "Malak S": "festive789",
    "Samar": "snowflake001",
    "Somaya": "gingerbread234",
    "Mohab": "jingle567",
    "Hamsa": "stocking890",
    "Mazen": "mistletoe123",
    "Hatem": "reindeer456",
    "Rola": "santa789",
    "Habiba": "hobhob",
    "Ahmed": "thtym",
    "Ammar": "Farah",
    "Farah": "rbdr"

};

const names = Object.keys(userCredentials);
let availableNames = [...names]; // Names available for selection

// Utility to get and set cookies
const setCookie = (name, value, days = 1) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const [key, val] = v.split('=');
        return key === name ? decodeURIComponent(val) : r;
    }, '');
};

// On DOM Load
document.addEventListener("DOMContentLoaded", () => {
    const nameSelector = document.getElementById("name-selector");
    const passwordInput = document.getElementById("password-input");
    const loginBtn = document.getElementById("login-btn");
    const spinBtn = document.getElementById("spin-btn");
    const resultName = document.getElementById("result-name");
    const loginScreen = document.getElementById("login-screen");
    const wheelScreen = document.getElementById("wheel-screen");
    const resultScreen = document.getElementById("result-screen");
    const wheel = document.getElementById("wheel");

    // Populate dropdown with unplayed names
    const playedNames = getCookie("playedNames") ? JSON.parse(getCookie("playedNames")) : [];
    const unplayedNames = names.filter(name => !playedNames.includes(name));

    if (unplayedNames.length === 0) {
        alert("All players have already played!");
        loginScreen.innerHTML = "<h2>Game Over! 🎄</h2>";
        return;
    }

    unplayedNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        nameSelector.appendChild(option);
    });

    // Handle login
    loginBtn.addEventListener("click", () => {
        const selectedName = nameSelector.value;
        const enteredPassword = passwordInput.value;

        if (!selectedName) {
            alert("Please select your name!");
        } else if (!enteredPassword) {
            alert("Please enter your password!");
        } else if (userCredentials[selectedName] !== enteredPassword) {
            alert("Incorrect password! Please try again.");
        } else {
            // Check if the user already played
            const playerResult = getCookie(selectedName);
            if (playerResult) {
                resultName.textContent = playerResult;
                loginScreen.classList.add("hidden");
                resultScreen.classList.remove("hidden");
            } else {
                loginScreen.classList.add("hidden");
                wheelScreen.classList.remove("hidden");
            }
        }
    });

    // Handle spinning the wheel
    spinBtn.addEventListener("click", () => {
        if (availableNames.length === 0) {
            alert("No names left to pick!");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableNames.length);
        const selectedName = availableNames.splice(randomIndex, 1)[0];

        // Spin the wheel animation
        const degree = 3600 + randomIndex * (360 / availableNames.length); // Ensure multiple full spins
        wheel.style.transition = "transform 3s ease-out";
        wheel.style.transform = `rotate(${degree}deg)`;

        setTimeout(() => {
            // Assign the selected name
            resultName.textContent = selectedName;

            // Save the result in cookies
            setCookie(nameSelector.value, selectedName);
            const playedNames = getCookie("playedNames") ? JSON.parse(getCookie("playedNames")) : [];
            playedNames.push(nameSelector.value);
            setCookie("playedNames", JSON.stringify(playedNames));

            wheelScreen.classList.add("hidden");
            resultScreen.classList.remove("hidden");
        }, 3000);
    });
});
