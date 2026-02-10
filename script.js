const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const celebration = document.getElementById("celebration");
const smash = document.getElementById("smash");
const laughSound = document.getElementById("laughSound");
const area = document.getElementById("area");
const question = document.getElementById("question");
const container = document.getElementById("container");

let soundUnlocked = false;
let speedBoost = 1.8; // 🔥 base speed (increase if needed)

// Unlock sound
document.body.addEventListener("click", () => soundUnlocked = true, { once: true });

// FAST ESCAPE LOGIC
function moveNoButton(e) {
    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Increase speed every attempt (but cap it)
    speedBoost = Math.min(speedBoost + 0.35, 3.2);

    const maxX = areaRect.width - btnRect.width;
    const maxY = areaRect.height - btnRect.height;

    let x, y;

    // Cursor-aware dodge (desktop)
    if (e && e.clientX) {
        const cursorX = e.clientX - areaRect.left;
        const cursorY = e.clientY - areaRect.top;

        // Jump to opposite side of cursor
        x = cursorX < areaRect.width / 2
            ? maxX * Math.random() * speedBoost
            : maxX * (1 - Math.random()) / speedBoost;

        y = cursorY < areaRect.height / 2
            ? maxY * Math.random() * speedBoost
            : maxY * (1 - Math.random()) / speedBoost;
    } 
    // Mobile (random but violent jump)
    else {
        x = Math.random() * maxX * speedBoost;
        y = Math.random() * maxY * speedBoost;
    }

    // Clamp inside area
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // Instant visual chaos
    noBtn.style.transition = "none";
    noBtn.style.transform = `rotate(${Math.random() * 50 - 25}deg)`;

    noBtn.classList.remove("shake");
    void noBtn.offsetWidth;
    noBtn.classList.add("shake");

    // Laugh sound
    if (soundUnlocked) {
        laughSound.currentTime = 0;
        laughSound.play();
    }
}

// Desktop
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile
noBtn.addEventListener("touchstart", moveNoButton);

// YES = FINAL SMASH
yesBtn.addEventListener("click", () => {
    question.remove();
    area.remove();

    smash.classList.remove("hidden");

    setTimeout(() => {
        smash.remove();
        celebration.classList.remove("hidden");
        container.classList.add("centerOnly");
    }, 450);
});
