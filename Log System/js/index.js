const userEmailInput = document.getElementById("email");
const userPassInput = document.getElementById("password");
const notFoundEmail = document.getElementById("notFoundEmail");
const notValidPass = document.getElementById("notValidPass");

const localUsers = "allUsers";
let allUsers = JSON.parse(localStorage.getItem(localUsers)) || [];

function signInUser() {
    let user = {
        email: userEmailInput.value.trim().toLowerCase(),
        password: userPassInput.value,
    };
    let userData = getUserByEmail(user.email);

    if (!userData) {
        notFoundEmail.classList.replace("d-none", "d-block");
        userEmailInput.classList.add("is-invalid");
        return;
    } else {
        notFoundEmail.classList.replace("d-block", "d-none");
        if (userData.password !== user.password) {
            notValidPass.classList.replace("d-none", "d-block");
            userPassInput.classList.add("is-invalid");
            return;
        } else {
            notValidPass.classList.replace("d-block", "d-none");
            if (validateFormInputs(userEmailInput) && validateFormInputs(userPassInput)) {
                clearForm();
                localStorage.setItem("userNameInput", userData.name);
                window.location.href = "home.html";
            } else {
                console.log("Invalid input");
            }
        }
    }
}

function getUserByEmail(email) {
    return allUsers.find(function (user) {
        return user.email.toLowerCase() === email;
    });
}

function validateFormInputs(ele) {
    const regex = {
        email: /^.{3,}@(gmail|yahoo|hotmail)\.com$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/,
    };

    let isValid = regex[ele.id].test(ele.value);
    if (isValid) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
        ele.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
        ele.nextElementSibling.classList.replace("d-none", "d-block");
    }
    return isValid;
}

function clearForm() {
    userEmailInput.value = "";
    userPassInput.value = "";
    userEmailInput.classList.remove("is-valid", "is-invalid");
    userPassInput.classList.remove("is-valid", "is-invalid");
}
