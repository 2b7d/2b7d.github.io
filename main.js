const cmd1 = {
    htmlElem: document.createElement("p"),
    text: "me --help",
    index: 0
};

const cmd2 = {
    htmlElem: document.createElement("p"),
    text: "cat my-interests.txt",
    index: 0
};

function createPS1() {
    const ps1 = document.createElement("p");
    ps1.classList.add("ps1");

    const username = document.createElement("span");
    username.classList.add("ps1__username");
    username.textContent = "[fosseddy]";

    const dir = document.createElement("span");
    dir.classList.add("ps1__dir");
    dir.textContent = "[~]";

    ps1.append(username, dir, "$");
    return ps1;
}

function printCmd(cmd) {
    return new Promise((resolve, _) => {
        const id = setInterval(() => {
            cmd.htmlElem.textContent += cmd.text[cmd.index];
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
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");

    document.querySelector("#cmd-1")
            .append(createPS1(), cmd1.htmlElem, cursor);
    await sleep(500);
    await printCmd(cmd1);
    await sleep(500);
    document.querySelector("#about-me").classList.remove("hidden");

    document.querySelector("#cmd-2")
            .append(createPS1(), cmd2.htmlElem, cursor);
    await sleep(500);
    await printCmd(cmd2);
    await sleep(500);
    document.querySelector("#my-interests").classList.remove("hidden");

    document.querySelector("#cursor-placeholder").append(createPS1(), cursor);
    cursor.classList.add("cursor--blink");
}

main().catch(console.error);
