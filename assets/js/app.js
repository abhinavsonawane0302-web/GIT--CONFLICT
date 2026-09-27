
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
                    <button onclick="onEdit(this)" class="btn btn-sm btn-outline-primary"> Edit </button>
            
                    <button onclick="onDelete(this)" class="btn btn-sm btn-outline-danger"> Delete </button>
                </td>
            </tr>
        `;
    }
    table.innerHTML = result;
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