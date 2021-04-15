function selectPes() {
    var rowId =
        event.target.parentNode.id;
    var data =
        document.getElementById(rowId).querySelectorAll(".row-data");
    var pname = data[1].innerHTML;
    var prasa = data[2].innerHTML;
    var pvek = data[3].innerHTML;

    document.getElementById('pname').value = pname.trim();
    document.getElementById('prasa').value = prasa.trim();
    document.getElementById('pvek').value = pvek.trim();

}

function tclick() {
    var rowId =
        event.target.parentNode.id;
    //this gives id of tr whose button was clicked
    var data =
        document.getElementById(rowId).querySelectorAll(".row-data");
    var name = data[0].innerHTML;
    var email = data[1].innerHTML;
    var adress = data[2].innerHTML;
    var tel = data[3].innerHTML;
    var role = data[4].innerHTML;
    document.getElementById('name').value = name.trim();
    document.getElementById('email').value = email.trim();
    document.getElementById('adress').value = adress.trim();
    document.getElementById('tel').value = tel.trim();
    document.getElementById('permissions').value = role.trim();
    document.getElementById('add-dog-pid').value = rowId.trim();
    findDogs(rowId);
}

function onLoad() {
    findDogs(0);
}

function findDogs(pid) {
    var table, tr, td, i;
    table = document.getElementById("dogsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            if (txtValue.replace(/\s/g, "") == pid) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

onLoad();