function tclick() {
    var rowId =
        event.target.parentNode.id;
    //this gives id of tr whose button was clicked
    console.log('HAHAHAH ' + rowId);
    var data =
        document.getElementById(rowId).querySelectorAll(".row-data");
    var name = data[0].innerHTML;
    var email = data[1].innerHTML;
    var role = data[2].innerHTML;
    console.log(name + " " + email + " " + role);
    /*returns array of all elements with 
    "row-data" class within the row with given id*/
}