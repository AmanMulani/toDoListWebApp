var modal = document.getElementById('id1');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal1 = document.getElementById('id2');
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            window.location.replace("index.html");
        }

    } else {
        // window.location.replace("landing_page.html");
    }
});

const auth = firebase.auth();
const signupBtn = document.querySelector('#signup-btn');
signupBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log('User signed up!');
    }).catch((e) => {
        window.alert(e);
    });
});

const signInBtn = document.querySelector("#signin-btn");
signInBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log('User Signed In');
    }).catch((e) => {
        window.alert(e);
    })
})




// function signIn() {
//     console.log("Hereeeeeeeee");
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('pass').value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in 
//             var user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // ..
//         });
// }

