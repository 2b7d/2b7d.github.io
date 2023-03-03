const cmd1 = { text: "me --help", index: 0 };
const cmd2 = { text: "cat my-interests.txt", index: 0 };

const lines = document.querySelectorAll(".terminal-line");
const cmdData = document.querySelectorAll(".cmd-data");
const cursor = document.querySelector(".cursor");

function printCmd(cmd, htmlElem) {
    return new Promise((resolve, _) => {
        const id = setInterval(() => {
            htmlElem.textContent += cmd.text[cmd.index];
            cmd.index += 1;
            if (cmd.index === cmd.text.length) {
                clearInterval(id);
                resolve();
            }
        }, 80);
    });
}

function sleep(time) {
    return new Promise((resolve, _) => {
        setTimeout(resolve, time);
    });
}

async function main() {
    await sleep(500);
    await printCmd(cmd1, lines[0].querySelector(".ps1__cmd"));
    await sleep(500);
    cmdData[0].classList.remove("hidden");

    lines[1].classList.remove("hidden")
    lines[1].append(cursor);
    await sleep(500);
    await printCmd(cmd2, lines[1].querySelector(".ps1__cmd"));
    await sleep(500);
    cmdData[1].classList.remove("hidden");

    lines[2].classList.remove("hidden");
    lines[2].append(cursor);
    cursor.classList.add("cursor--blink");
}

window.addEventListener("load", () => {
    document.body.classList.remove("hidden");
    main().catch(console.error);
});
