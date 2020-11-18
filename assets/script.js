let mentordata;

//function to load all mentor data's
async function loadData() {
    let data = await fetch("http://localhost:3000/mentors");
    mentordata = await data.json();
    let table = document.getElementById('mentordata');

    let tbody = document.createElement('tbody');

    mentordata.forEach((val) => {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.innerHTML = val.name;

        let email = document.createElement('td');
        email.innerHTML = val.email;

        let subject = document.createElement('td');
        subject.innerHTML = val.subject;

        let addStudent = document.createElement('td');
        addStudent.innerHTML = `<button onclick="student(${val.id})" class="btn btn-success">Add Student</button>`

        let getstudents = document.createElement('td');
        getstudents.innerHTML = `<button onclick="getstudent('${val.name}')" class="btn btn-primary">All Students</button>`


        tr.append(name, email, subject, addStudent,getstudents);
        tbody.append(tr);
    })

    table.append(tbody);
}

loadData();

//Function to add mentor
async function addMentor() {
    document.getElementById('mentordiv').style.display = 'none'

    let data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
    }

    await fetch('http://localhost:3000/addMentor', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-Type': "application/json"
        }

    })
}


async function student(mentorid) {
    document.getElementById('studentform').style.display = "block"
    let mentor = mentordata.find((mentor) => mentor.id === parseInt(mentorid));
    document.getElementById('mentor').value = mentor.name;
    document.getElementById('studentsubject').value = mentor.subject;
  
}

//function to add student
async function addStudent() {
    let data = {
        name: document.getElementById('studentname').value,
        subject: document.getElementById('studentsubject').value,
        mentor: document.getElementById('mentor').value
    }

    await fetch('http://localhost:3000/students', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-Type': "application/json"
        }

    })
    document.getElementById('studentform').style.display = 'none'
}


//Funttion tyo get students for particular mentor 
async function getstudent(name) {
    let rawdata = await fetch(`http://localhost:3000/students/${name}`);
    let studentdata = await rawdata.json();

    let ul = document.getElementById('students');
    ul.innerHTML = '';

    studentdata.forEach((student) => {
        let li = document.createElement('li');
        li.innerHTML = student.name;
        ul.append(li);
    });

    document.getElementById('studentdetailsdiv').style.display = (document.getElementById('studentdetailsdiv').style.display === 'block') ? 'none' : 'block';
}





function mentorform() {
    document.getElementById('mentordiv').style.display = "block"
}