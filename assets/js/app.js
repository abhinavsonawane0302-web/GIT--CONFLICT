
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








// --- EDIT ---
function onEdit(ele){
    let EDIT_ID = ele.closest('tr').id;
    let EDIT_URL = `${BASE_URL}/students/${EDIT_ID}.json`;
    localStorage.setItem('EDIT_ID', EDIT_ID);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", EDIT_URL);
    xhr.send(null);
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            sName.value = res.name;
            sCourse.value = res.course;
            sGrade.value = res.grade;

            addbtn.classList.add('d-none');
            editBtn.classList.remove('d-none');

            Swal.fire({
              title: "Edit Mode",
              text: "Data loded successfully",
              icon: "info"
            });
        }
    }
}

// --- UPDATE ---
function onUpdate(){
    let update_Id = localStorage.getItem('EDIT_ID');
    let UPDATE_URL = `${BASE_URL}/students/${update_Id}.json`;

    let updateObj={
        name: sName.value,
        course: sCourse.value,
        grade: sGrade.value,
        id: update_Id
    };

    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", UPDATE_URL);
    xhr.send(JSON.stringify(updateObj));
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res = JSON.parse(xhr.response);
            let tds = document.getElementById(update_Id).children;
            tds[1].innerHTML = res.name;
            tds[2].innerHTML = res.course;
            tds[3].innerHTML = res.grade;

            form.reset();
            addbtn.classList.remove('d-none');
            editBtn.classList.add('d-none');
            localStorage.removeItem('EDIT_ID');

            Swal.fire({
              title: "Updated!",
              text: "Student updated successfully",
              icon: "success"
            });
        }
    }
}

editBtn.addEventListener('click', onUpdate);



