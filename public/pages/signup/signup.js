const requestURL = 'http://localhost:3000/api/users';

let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userPassword = document.getElementById('password');
// let userConfirmPassword = document.getElementById('confirmPassword');

function createNewUser(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
}

function signupUserData() {
    let name = userName.value;
    let email = userEmail.value;
    let password = userPassword.value;

    let user = new createNewUser(name, email, password);
    return user;
}

function sendRequest(method, requestURL) {
    const headers = {
        'Content-Type': 'application/json',
    }

    let user = signupUserData();

    return fetch(requestURL, {
        method: method,
        body: JSON.stringify(user),
        headers: headers
    }).then(response => {
        if (response.ok) return response.json();
  
        return response.json().then(error => {
            const e = new Error(error);
            e.data = error;
            throw e;
        })
    });
}

signup.onclick = () => {
    sendRequest('POST', requestURL)
        .then(data => {
            console.log(data);
            let div = document.createElement("div");
            div.innerHTML = "Register";
            form.after(div);
        })
    .catch(err => console.log(err))
}