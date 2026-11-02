const supabaseClient = supabase.createClient(
    "https://laxhmadhlmafruoigkjm.supabase.co",
    "sb_publishable_pfznL70y3y5llqAMftMImA_BR53pABI"
);

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
        document.getElementsByClassName("sign-up")[0].style.height = (320 + 40 * errors) + "px";
    }  
    else if (errors === 1) {
        document.getElementsByClassName("sign-up")[0].style.height = "370px";
    } 
    else {
        document.getElementsByClassName("sign-up")[0].style.height = "340px";
    }
        
});

async function checkUsername(username) {
    const { data, error } = await supabaseClient.rpc(
        "is_username_available",
        { check_username: username }
    );

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

async function registerUser() {
    const email = document.getElementById("email-signup").value.trim();
    const username = document.getElementById("user-signup").value.trim();
    const password = document.getElementById("pass-signup").value;
    const nametag = document.getElementById("nametag-signup").value.trim();

    if (!email || !username || !password || !nametag) {
        alert("Please complete all fields.");
        return;
    }

    if (!/^[a-zA-Z]{3,15}$/.test(username)) {
        alert("Username must contain 3–15 letters.");
        return;
    }

    const available = await checkUsername(username);

    if (available === null) {
        alert("Unable to check username. Please try again.");
        return;
    }

    if (!available) {
        alert("Username already exists.");
        return;
    }

    const { error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username,
                nametag: nametag
            }
        }
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Registration successful! Check your email if confirmation is required.");
}

document.getElementById("submit-signup").addEventListener("click", registerUser);