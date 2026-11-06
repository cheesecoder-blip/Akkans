const menuBtn = document.getElementById("menu");
const menuBar = document.querySelector(".menu-bar");

menuBtn.addEventListener("click", function () {
    menuBar.classList.toggle("active");     
    menuBtn.style.opacity = menuBar.classList.contains("active") ? "0" : "100";
});

document.addEventListener("click", function(event) {
    if (
        !menuBar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        menuBar.classList.remove("active");
        document.getElementById("menu").style.opacity = "100";
    }
});

function showWarning(message) {
    let warning = document.getElementById("warn");
    warning.textContent = message;
    warning.style.display = "block";
}
function APIKey() {
        document.getElementsByClassName("api-key-modal")[0].style.display = 'block';
        document.getElementsByClassName("modal-overlay")[0].style.display = 'block';
}

function APIKeyback() {
        document.getElementsByClassName("api-key-modal")[0].style.display = 'none';
        document.getElementsByClassName("modal-overlay")[0].style.display = 'none';
}

function APIPaste() {
    localStorage.setItem("apiKey", document.getElementById("api-key-input").value);
}

ApiKey = localStorage.getItem("apiKey");
