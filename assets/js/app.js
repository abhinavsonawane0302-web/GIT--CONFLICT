
const form = document.getElementById("form")
const tableheading = document.getElementById("tableheading")
const table = document.getElementById("table")
const sName = document.getElementById("sName")
const sCourse = document.getElementById("sCourse")
const sGrade = document.getElementById("sGrade")
const addbtn = document.getElementById("addbtn")
const cancelbtn = document.getElementById("cancelbtn")


const BASE_URL ="https://student-e9277-default-rtdb.asia-southeast1.firebasedatabase.app"


const STUDENT_URL =`${BASE_URL}/students.json`

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
                    <button onclick="onEdit(this)" class="btn btn-outline-primary"> Edit </button>
            
                    <button onclick="onDelete(this)" class="btn btn-outline-danger"> Delete </button>
                </td>
            </tr>
        `;
    }
    table.innerHTML = result;
}

