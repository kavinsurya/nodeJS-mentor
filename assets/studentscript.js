let studentdata;

//Function to get all student details
async function studentData() {
    let data = await fetch("https://kavin-mentor.herokuapp.com/students");
    studentdata = await data.json();
    let table = document.getElementById('studentdata');

    let tbody = document.createElement('tbody');

    studentdata.forEach((val) => {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        name.innerHTML = val.name;
        let subject = document.createElement('td');
        subject.innerHTML = val.subject;
        let mentor = document.createElement('td');
        mentor.innerHTML = val.mentor;

        tr.append(name, subject, mentor);
        tbody.append(tr);
    })

    table.append(tbody);
}
studentData();