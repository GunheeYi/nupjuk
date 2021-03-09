// Written by 2021 Gunhee Yi (gunny@kaist.ac.kr).

function download(url) {
    var a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "asdf");
    a.click();
}

if(window.location.href.includes("&closeAfterDownload=true")){
    download(document.querySelector("div.resourceworkaround a").href);
    window.close();
}
