
const form = document.getElementById("form")
const tableheading = document.getElementById("tableheading")
const table = document.getElementById("table")
const sName = document.getElementById("sName")
const sCourse = document.getElementById("sCourse")
const sGrade = document.getElementById("sGrade")
const addbtn = document.getElementById("addbtn")
const cancelbtn = document.getElementById("cancelbtn")
const editBtn = document.getElementById("editBtn")


const BASE_URL ="https://student-e9277-default-rtdb.asia-southeast1.firebasedatabase.app"


const STUDENT_URL =`${BASE_URL}/students.json`








//edit & update


function onEdit(ele){
    spinner.classList.remove('d-none');
    let EDIT_ID = ele.closest('tr').id;
    let EDIT_URL = `${BASE_URL}/students/${EDIT_ID}.json`;
    localStorage.setItem('EDIT_ID', EDIT_ID);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", EDIT_URL);
    xhr.send(null);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            sName.value = res.sName;
            sCourse.value = res.sCourse;
            sGrade.value = res.sGrade;

            addbtn.classList.add('d-none');
            editBtn.classList.remove('d-none');

            Swal.fire({
              title: "You Can Edit Now",
              icon: "info",
              timer: 1000,
              showConfirmButton: false
            });
        }
        spinner.classList.add('d-none');
    }
}

function onUpdate(){
    spinner.classList.remove('d-none');
    let update_Id = localStorage.getItem('EDIT_ID');
    let UPDATE_URL = `${BASE_URL}/students/${update_Id}.json`;

    let updateObj={
        sName: sName.value,
        sCourse: sCourse.value,
        sGrade: sGrade.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", UPDATE_URL);
    xhr.send(JSON.stringify(updateObj));
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            let tr = document.getElementById(update_Id);
            tr.children[0].innerHTML = res.sName;
            tr.children[1].innerHTML = res.sCourse;
            tr.children[2].innerHTML = res.sGrade;

            form.reset();
            addbtn.classList.remove('d-none');
            editBtn.classList.add('d-none');
            localStorage.removeItem('EDIT_ID');

            Swal.fire({
              title: "Updated!",
              text: "Student updated successfully",
               timer: 3000,
              icon: "success"
             
            });
        }
        spinner.classList.add('d-none');
    }
}

<<<<<<< Updated upstream
editBtn.addEventListener('click', onUpdate);



=======
form.addEventListener("submit", onCreate)




//edit
function onEdit(ele){
    showspinner();

    let EDIT_ID = ele.closest('tr').id;
    let EDIT_URL = `${BASE_URL}/students/${EDIT_ID}.json`;
    localStorage.setItem('EDIT_ID', EDIT_ID);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", EDIT_URL);
    xhr.send(null);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            sName.value = res.sName;
            sCourse.value = res.sCourse;
            sGrade.value = res.sGrade;

            addbtn.classList.add('d-none');
            updatebtn.classList.remove('d-none');

            // snackbar
            Swal.fire({
              title: "Now, You Can Edit Student Data",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });
        }
        hidespinner();
    }
}

//update
function onUpdate(){
    showspinner();

    let update_Id = localStorage.getItem('EDIT_ID');
    let UPDATE_URL = `${BASE_URL}/students/${update_Id}.json`;

    let updateObj={
        sName: sName.value,
        sCourse: sCourse.value,
        sGrade: sGrade.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", UPDATE_URL);
    xhr.send(JSON.stringify(updateObj));
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            let tr = document.getElementById(update_Id);
            tr.children[0].innerHTML = res.sName;
            tr.children[1].innerHTML = res.sCourse;
            tr.children[2].innerHTML = res.sGrade;

            form.reset();
            addbtn.classList.remove('d-none');
            updatebtn.classList.add('d-none');
            localStorage.removeItem('EDIT_ID');

            // snackbar
            Swal.fire({
              title: "Updated!",
              text: "Student updated successfully",
              icon: "success"
            });
        }
        hidespinner();
    }
}

updatebtn.addEventListener('click', onUpdate);
>>>>>>> Stashed changes
