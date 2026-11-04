import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseClient = createClient(
    "https://laxhmadhlmafruoigkjm.supabase.co",
    "sb_publishable_imUHAb8WgCiHB_NnWkq55A_JDiFlzX6"
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
    const username = this.value.trim();
    const firstWarning = document.getElementById("user-signup-warning");
    const secondWarning = document.getElementById("user-signup-warning2");
    const signUpPanel = document.getElementsByClassName("sign-up")[0];
    let errors = 0;

    if (!username) {
        firstWarning.style.display = "none";
        secondWarning.style.display = "none";
    } else {
        if (!/^[a-zA-Z]+$/.test(username)) {
            firstWarning.style.display = "block";
            errors++;
        } else {
            firstWarning.style.display = "none";
        }

        if (username.length < 3 || username.length > 15) {
            secondWarning.style.display = "block";
            errors++;
        } else {
            secondWarning.style.display = "none";
        }
    }

    if (errors > 1) {
        signUpPanel.style.height = `${320 + 80 * errors}px`;
    } else if (errors === 1) {
        signUpPanel.style.height = "430px";
    } else {
        signUpPanel.style.height = "400px";
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

    let errors = 0;

    if (!/^[a-zA-Z]+$/.test(username)) {
        errors++;
    }

    if (username.length < 3 || username.length > 15) {
        errors++;
    }

    if (errors > 0) {
        alert("Please fix your username errors before signing up.");
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

    window.location.href = "dashboard.html";
}

document.getElementById("submit-signup").addEventListener("click", registerUser);

window.signUp = signUp;
window.signIn = signIn;