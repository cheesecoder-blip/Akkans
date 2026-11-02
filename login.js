function signUp() {
    document.getElementsByClassName("sign-in")[0].style.display = "none";
    document.getElementsByClassName("sign-up")[0].style.display = "flex";
}

function signIn() {
    document.getElementsByClassName("sign-in")[0].style.display = "flex";
    document.getElementsByClassName("sign-up")[0].style.display = "none";
}