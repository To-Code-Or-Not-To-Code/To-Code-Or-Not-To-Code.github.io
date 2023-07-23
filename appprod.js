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

function update(e) {
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;

    document.documentElement.style.setProperty("--cursorX", x + "px");
    document.documentElement.style.setProperty("--cursorY", y + "px");
}

document.addEventListener("mousemove", update);
document.addEventListener("touchmove", update);
