const cursor = document.querySelector(".cursor");
const lines = document.querySelectorAll(".terminal-line");
const cmds = document.querySelectorAll(".cmd");
const cmdData = document.querySelectorAll(".cmd-data");
const animations = [];

for (const c of cmds) {
    const textlen = c.textContent.length;
    const duration = textlen * 60;
    const steps = Math.floor(textlen + textlen * 0.3);

    animations.push({
        keyframes: [{ width: textlen + "ch" }],
        opts: {
            duration,
            fill: "forwards",
            easing: `steps(${steps}, jump-none)`
        }
    });
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

window.addEventListener("load", async () => {
    document.body.classList.remove("hidden");

    await sleep(500);
    cmds[0].animate(animations[0].keyframes, animations[0].opts);
    await sleep(animations[0].opts.duration + 500)
    cmdData[0].classList.remove("hidden");

    lines[1].classList.remove("hidden")
    lines[1].append(cursor);
    await sleep(500);
    cmds[1].animate(animations[1].keyframes, animations[1].opts);
    await sleep(animations[1].opts.duration + 500)
    cmdData[1].classList.remove("hidden");

    lines[2].classList.remove("hidden");
    lines[2].append(cursor);
    cursor.classList.add("blinking");
});
