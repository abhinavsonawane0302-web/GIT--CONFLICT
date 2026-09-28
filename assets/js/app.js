
const form = document.getElementById("form")
const tableheading = document.getElementById("tableheading")
const table = document.getElementById("table")
const sName = document.getElementById("sName")
const sCourse = document.getElementById("sCourse")
const sGrade = document.getElementById("sGrade")
const addbtn = document.getElementById("addbtn")
const updatebtn = document.getElementById("updatebtn")
const spinner = document.getElementById("spinner")


const BASE_URL ="https://student-e9277-default-rtdb.asia-southeast1.firebasedatabase.app"


const STUDENT_URL =`${BASE_URL}/students.json`



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

            
            Swal.fire({
              title: "Updated!",
              text: "Student updated successfully",
              icon: "success",
              timer:1500
            });
        }
        hidespinner();
    }
}

updatebtn.addEventListener('click', onUpdate);

function hidespinner() {
    spinner.classList.add("d-none")
}


function showspinner() {
    spinner.classList.remove("d-none")
}

 


let xhr = new XMLHttpRequest();
xhr.open("GET", STUDENT_URL)
xhr.send(null)
xhr.onload = function () {
    let data = JSON.parse(xhr.response);

    let result = ``;

    for (let key in data) {
        let student = data[key];

        result += `
            <tr id="${key}">
                <td>${student.sName}</td>
                <td>${student.sCourse}</td>
                <td>${student.sGrade}</td>
                
                <td>
                    <button onclick="onEdit(this)" class="btn btn-sm btn-outline-primary"> Edit </button>
            
                    <button onclick="onDelete(this)" class="btn btn-sm btn-outline-danger"> Delete </button>
                </td>
            </tr>
        `;
    }
    table.innerHTML = result;
}


function onDelete(ele){
    let DELETE_ID = ele.closest('tr').id;

     Swal.fire({
        title: `Are you sure, you want to remove student with id ${DELETE_ID}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed){

            showspinner()
            
            let DELETE_URL = `${BASE_URL}/students/${DELETE_ID}.json`;

            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", DELETE_URL);

            xhr.send(null);

            xhr.onload = function(){
                if(xhr.status >= 200 && xhr.status <= 299){
                let res = JSON.parse(xhr.response);
                ele.closest('tr').remove();
                
                Swal.fire({
                    text: `the student with id ${DELETE_ID} is Removed successfully !!!`,
                    icon:"success",
                    timer:2000
                })

            }else {
                cl("Something went wrong while deleting !!!");
            }
            hidespinner()
            }
                xhr.onerror = function (){
                    hidespinner()
                 }
        }
    })
}

function onCreate(eve){
    showspinner()
    eve.preventDefault();

    const stdObj ={
        sName: sName.value,
        sCourse: sCourse.value,
        sGrade: sGrade.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", STUDENT_URL)
    xhr.send(JSON.stringify(stdObj));

    xhr.onload = () => {
        let res = JSON.parse(xhr.response)

        if(xhr.status >= 200 && xhr.status <= 299){
            let createtr = document.createElement("tr")
            createtr.id = res.id
            createtr.innerHTML = `<tr>

                        <td>${stdObj.sName}</td>
                        <td>${stdObj.sCourse}</td>
                        <td>${stdObj.sGrade}</td>
                        <td><button onclick="onEdit(this)" class="btn btn-sm btn-outline-primary text-dark">EDIT</button>
                            <button onclick="onDelete(this)" class="btn btn-sm btn-outline-danger text-dark">DELETE</button>
                        </td>

                        </tr>`
        

        table.prepend(createtr)
        form.reset()


        Swal.fire({
            text:"your data added successfully !!!",
            icon:"success",
            timer:2000
        })
    }else{
        cl(`something went wrong while get data !!!`)
    } 

    hidespinner()

  }
}

form.addEventListener("submit", onCreate)