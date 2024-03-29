const anim = KUTE.fromTo(
    "#blob1",
    {
        path: "#blob1",
    },
    {
        path: "#blob2",
    },
    {
        repeat: 999,
        duration: 2500,
        yoyo: true,
    }
);

anim.start();

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//         } else {
//             entry.target.classList.remove("show");
//         }
//     });
// });

// const hidden = document.querySelectorAll(".hidden");
// hidden.forEach((el) => observer.observe(el));

let content = document.querySelector("main");

content.addEventListener("mouseover", function () {
    content.classList.add("not-blurred");
});

content.addEventListener("mouseleave", function () {
    content.classList.remove("not-blurred");
});
