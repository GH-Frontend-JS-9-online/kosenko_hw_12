const requestURL = 'http://localhost:3000/api/users/login';

let userEmail = document.getElementById('email');
let userPassword = document.getElementById('password');

function createUser(email, password) {
    this.email = email;
    this.password = password;
}

function loginUserData() {
    let email = userEmail.value;
    let password = userPassword.value;

    let user = new createUser(email, password);
    return user;
}

function sendRequest(method, requestURL) {
    const headers = {
        'Content-Type': 'application/json'
    }

    let user = loginUserData();

    return fetch(requestURL, {
        method: method,
        body: JSON.stringify(user),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
  
        return response.json().then(error => {
            const e = new Error(error);
            e.data = error;
            throw e;
        })
    })
}

signin.onclick = () => {
    sendRequest('POST', requestURL)
        .then(data => {
            console.log(data);
            let div = document.createElement("div");
            div.innerHTML = "Hello, " + data.name;
            form.after(div);
        })
        .catch(err => console.log(err))
}