function signUp() {
    document.getElementsByClassName("sign-in")[0].style.display = "none";
    document.getElementsByClassName("sign-up")[0].style.display = "flex";
}

function signIn() {
    document.getElementsByClassName("sign-in")[0].style.display = "flex";
    document.getElementsByClassName("sign-up")[0].style.display = "none";
}

document.getElementById("user-signup").addEventListener("input", function() {
    let username = this.value;
    let errors = 0;

    if (username.length === 0) {
        document.getElementById("user-signup-warning").style.display = "none";
    }

    if (!/^[a-zA-Z]+$/.test(username)) {
        document.getElementById("user-signup-warning").style.display = "block";
        errors++;
    }

    else {
        document.getElementById("user-signup-warning").style.display = "none";
    }

    if (username.length === 0) {
        document.getElementById("user-signup-warning2").style.display = "none";
    }

    else if (username.length < 3 || username.length > 15) { 
        document.getElementById("user-signup-warning2").style.display = "block";
        errors++;
    }
    
    else {
        document.getElementById("user-signup-warning2").style.display = "none";
    }

    if (errors > 1) {
        document.getElementsByClassName("sign-up")[0].style.height = (320 + 10 * errors) + "px";
    }   
    else {
        document.getElementsByClassName("sign-up")[0].style.height = "320px";
    }
        
});