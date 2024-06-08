const signupNameInput = document.getElementById("signupName");
const signupEmailInput = document.getElementById("signupEmail");
const signupPasswordInput = document.getElementById("signupPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const validSignupName = document.getElementById("validSignupName");
const validSignupEmail = document.getElementById("validSignupEmail");
const validSignupPassword = document.getElementById("validSignupPassword");
const validConfirmPassword = document.getElementById("validConfirmPassword");

const localUsers = "allUsers";
let allUsers = JSON.parse(localStorage.getItem(localUsers)) || [];

function registerUser() {
    const name = signupNameInput.value.trim();
    const email = signupEmailInput.value.trim().toLowerCase();
    const password = signupPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    let valid = true;

    // Check if the name is empty
    if (name === "") {
        validSignupName.textContent = "Please Enter Your Name";
        validSignupName.classList.replace("d-none", "d-block");
        signupNameInput.classList.add("is-invalid");
        valid = false;
    } else {
        validSignupName.classList.replace("d-block", "d-none");
        signupNameInput.classList.remove("is-invalid");
        signupNameInput.classList.add("is-valid");
    }

    // Check if all fields are valid
    if (!validateSignupInputs(signupEmailInput) || !validateSignupInputs(signupPasswordInput) || !validateSignupInputs(confirmPasswordInput)) {
        valid = false;
    }

    if (password !== confirmPassword) {
        validConfirmPassword.classList.replace("d-none", "d-block");
        confirmPasswordInput.classList.add("is-invalid");
        valid = false;
    } else {
        validConfirmPassword.classList.replace("d-block", "d-none");
        confirmPasswordInput.classList.remove("is-invalid");
        confirmPasswordInput.classList.add("is-valid");
    }

    if (!valid) {
        return;
    }

    const userExists = allUsers.some(user => user.email === email);

    if (userExists) {
        validSignupEmail.textContent = "Email already exists";
        validSignupEmail.classList.replace("d-none", "d-block");
        signupEmailInput.classList.add("is-invalid");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    allUsers.push(newUser);
    localStorage.setItem(localUsers, JSON.stringify(allUsers));

    clearSignupForm();
    window.location.href = "index.html";
}

function validateSignupInputs(ele) {
    const regex = {
        signupEmail: /^.{3,}@(gmail|yahoo|hotmail)\.com$/,
        signupPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/,
        confirmPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/,
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

function clearSignupForm() {
    signupNameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
    confirmPasswordInput.value = "";
    signupNameInput.classList.remove("is-valid", "is-invalid");
    signupEmailInput.classList.remove("is-valid", "is-invalid");
}