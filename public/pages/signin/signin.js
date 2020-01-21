const requestURL = 'https://geekhub-frontend-js-9.herokuapp.com/api/users/login';

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
            console.log(response.headers.get('X-Auth-Token'));
            let userToken = response.headers.get('X-Auth-Token');
            // let cookies = "user=" + userToken;
            // document.cookie = cookies; 
            window.localStorage.setItem('token', userToken);
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
          window.location.href = 'pages/messages/messages.html';
          // let div = document.createElement("div");
          // div.innerHTML = "Hello, " + data.name;
          // form.after(div);
        })
        .catch(err => {
          console.log(err);
          let errorMessage = document.getElementById("errorMessage");
          errorMessage.innerHTML = "Oops, looks like email or password is incorrect. Please try again.";
          // form.after(div);
        })
}