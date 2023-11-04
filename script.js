function validateCredentials() {
    var uname = document.getElementById('username').value;
    var psd = document.getElementById('pswd').value;

    if (uname == "admin" && psd == "12345") {
        redirect(function () {
            alert("Login Successful");
            window.location.href = "home.html";
        });
    }
    else if (uname != "admin") {
        document.getElementById("err1").innerHTML = "Invalid Username";
    }
    else if (psd != "12345") {
        document.getElementById("err2").innerHTML = "Invalid Password";
    }
    else {
        document.getElementById("err2").innerHTML = "Invalid Credentials";
    }

    return false; // Prevent form submission
}

function redirect(callback) {
    setTimeout(function () {
        callback(); 
    }, 1000);
}


function list() {
    var count = 0;
    document.getElementById('todo_button').style.display = 'none';
    document.getElementById('tasks_list').style.display = 'block';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (let i = 0; i < data.length; i++) {
                var row = document.getElementById("tbody").insertRow(i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = i + 1;

                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                cell2.innerHTML = data[i].title;
                cell3.appendChild(checkbox);
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        count++;
                        console.log("Checkbox checked:", count);
                    }
                    else {
                        count--;
                        console.log("Checkbox checked:", count);
                    }
                    if (count >= 5) {
                        document.getElementById('tcompleted').innerHTML = "<h2>Congratulations. You have completed 5 tasks</h2>";
                    }
                    else {
                        document.getElementById('tcompleted').innerHTML = "";
                    }
                });
            }
        }
    }
    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/todos', true);
    xhttp.send();
}

