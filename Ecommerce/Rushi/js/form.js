//redirecting to home page
window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');

const submitBtn = document.querySelector('.submit-btn');
const username = document.querySelector('#username') || null;
const fullname = document.querySelector('#FullName');
const number = document.querySelector('#number') || null;
const password = document.querySelector('#password');
const confpass = document.querySelector('#confirm-password');

// For checking and submitting the form
submitBtn.addEventListener('click', () => {
    if(username != null){ //register page
        if (username.value.length < 3) {
            showAlert('name must be 3 letters long');
        } else if (fullname.value.length < 5) {
            showAlert('Fullname must be 5 letters long');
        } else if (!email.value.length) {
            showAlert('enter your email');
        } else if (!number.value.length) {
            showAlert('enter your phone number');
        } else if (!Number(number.value) || number.value.length < 2) {
            showAlert('invalid number, please enter valid one');
        } else if (password.value.length < 2) {
            showAlert('password should be 2 letters long');
        } else if (password.value !== confpass.value) {
            showAlert('password does not match');
        } else {
            // information submit
            loader.style.display = 'block';
            sendData('/register', {
                username: username.value,
                fullName: fullname.value,
                email: email.value,
                number: number.value,
                password: password.value,
                confpass: confpass.value,
                seller: false
            })
        }
    } else{
        //login page
        if (!email.value.length || !password.value.length){
            showAlert('fill all fields');
        } else{
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    }
})

// javascript function for email validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

