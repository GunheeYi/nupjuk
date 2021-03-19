for (s of semesters) {
    var a = document.createElement('p');
    a.innerHTML = `${getSemesterString(s)}: ${s.start.toString()} ~ ${s.end.toString()}`;
    document.getElementById("semesters").appendChild(a);
}