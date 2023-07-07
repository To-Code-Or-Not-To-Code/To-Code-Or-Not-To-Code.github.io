let icon = document.querySelector("#theIcon"),
    half1 = document.querySelector("#half1"),
    half2 = document.querySelector("#half2");

let tocode = document.querySelector("#tocode"),
    dev = document.querySelector("#dev");

icon.classList.add("centered-image")

function onMouseOut() {
    icon.classList.remove("hidden");
    half1.classList.add("hidden");
    half2.classList.add("hidden");
}

icon.addEventListener("mouseover", function () {
    console.log("activated");
    icon.classList.add("hidden");
    half1.classList.remove("hidden");
    half2.classList.remove("hidden");
});
half1.addEventListener("mouseout", onMouseOut);

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Why u right clicking?");
});