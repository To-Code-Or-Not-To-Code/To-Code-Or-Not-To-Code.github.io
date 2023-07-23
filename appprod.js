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
        duration: 3000,
        yoyo: true,
    }
);

anim.start();

document.addEventListener("mousemove", function (event) {
    let cursor = document.getElementById("cursor");
    cursor.style.top = `${event.pageY - 20}px`;
    cursor.style.left = `${event.pageX + 14}px`;
});
