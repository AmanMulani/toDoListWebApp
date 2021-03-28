const auth = firebase.auth();
const firestore = firebase.firestore();
uid = "";
listArray = [];

// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
    } else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}


auth.onAuthStateChanged(function (user) {
    if (user) {
        var user = auth.currentUser;
        if (user != null) {
            document.getElementById("emailID_display").innerHTML = user.email;
            uid = user.uid;
            showTasks();
        }
    } else {
        window.location.replace("index.html");
    }
});

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
    console.log('User signed out!');
})


addBtn.onclick = () => { //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    const docRef = firestore.collection("users").doc(uid).collection("toDoList").doc();
    docRef.set({
        "task": userEnteredValue,
        "timeStamp": timestamp,
    }).then((event) => {
        console.log("successfully updated!");
    });
    addBtn.classList.remove("active");
    inputBox.value = "";
}

showTasks = function () {
    firestore.collection("users").doc(uid).collection("toDoList").orderBy("timeStamp", "desc").onSnapshot((doc) => {
        listArray.length = 0;
        let newLiTag = "";
        todoList.innerHTML = newLiTag;
        doc.docs.forEach((d) => {
            var data = d.data();
            data["id"] = d.id;
            console.log(data);
            listArray.push(data);
        })
        if (listArray.length > 0) { //if array length is greater than 0
            deleteAllBtn.classList.add("active"); //active the delete button
        } else {
            deleteAllBtn.classList.remove("active"); //unactive the delete button
        }
        const pendingTasksNumb = document.querySelector(".pendingTasks");
        pendingTasksNumb.textContent = listArray.length;
        listArray.forEach((element, index) => {
            newLiTag += `<li>${element["task"]}<span class="icon" id="_${element["id"]}"'><i class="fas fa-trash"></i></span></li>`;
        });
        todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
        listArray.forEach((element, index) => {
            const deleteBtn = document.querySelector("#_" + element["id"]);
            deleteBtn.addEventListener("click", e => {
                e.preventDefault();
                deleteTask(element["id"])
            })
        });
        inputBox.value = "";
    })
}


// delete task function
function deleteTask(id) {

    const docRef = firestore.collection("users").doc(uid).collection("toDoList").doc(id);
    docRef.delete().then((e) => {
        console.log('Task Deleted');
    }).catch((e) => {
        window.alert(e);
    })
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArray.forEach((e) => {
        deleteTask(e["id"]);
    })//call the showTasks function
}