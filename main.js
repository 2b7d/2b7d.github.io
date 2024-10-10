const cursor = document.querySelector(".cursor");
const lines = document.querySelectorAll(".command-line");
const commands = document.querySelectorAll(".command");
const results = document.querySelectorAll(".command-result");
const animations = [];

for (const cmd of commands) {
    const textlen = cmd.textContent.length;

    animations.push({
        keyframes: [{width: textlen + "ch"}],
        opts: {
            duration: textlen * 35,
            fill: "forwards",
            easing: `steps(${textlen})`
        }
    });
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function animate(element, animation) {
    return new Promise(resolve => {
        element
            .animate(animation.keyframes, animation.opts)
            .addEventListener("finish", resolve);
    });
}

window.addEventListener("load", async () => {
    document.body.classList.remove("hidden");

    await sleep(500);
    await animate(commands[0], animations[0]);
    await sleep(500);
    results[0].classList.remove("hidden");

    lines[1].append(cursor);
    lines[1].classList.remove("hidden")

    await sleep(500);
    await animate(commands[1], animations[1]);
    await sleep(500);
    results[1].classList.remove("hidden");

    lines[2].append(cursor);
    lines[2].classList.remove("hidden");
    cursor.classList.add("blinking");
});
