const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const resetBtn = document.getElementById("resetBtn");

const buttons = document.getElementById("buttons");
const result = document.getElementById("result");
const question = document.getElementById("question");

let gameLocked = false;

// Place the "No" button somewhere random but still inside the button area.
function moveNoButton() {
  if (gameLocked) return;

  const area = buttons.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 6;
  const maxX = area.width - btn.width - padding * 2;
  const maxY = area.height - btn.height - padding * 2;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  // position relative to buttons container
  noBtn.style.left = `${x + btn.width / 2}px`;
  noBtn.style.top  = `${y + btn.height / 2}px`;
}

// Detect cursor coming close to "No" (run away)
function handleMouseMove(e) {
  if (gameLocked) return;

  const btnRect = noBtn.getBoundingClientRect();
  const bx = btnRect.left + btnRect.width / 2;
  const by = btnRect.top + btnRect.height / 2;

  const dx = e.clientX - bx;
  const dy = e.clientY - by;
  const dist = Math.hypot(dx, dy);

  // distance threshold (px): smaller = harder, bigger = easier
  if (dist < 120) moveNoButton();
}

// Also run away on hover / touch attempts
noBtn.addEventListener("mouseenter", moveNoButton);
document.addEventListener("mousemove", handleMouseMove);

// On mobile: finger near it should also make it run
document.addEventListener("touchstart", () => moveNoButton(), { passive: true });

// Prevent "No" click doing anything (optional)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// YES: lock the game and show new effect
yesBtn.addEventListener("click", () => {
  gameLocked = true;

  // hide buttons, show result screen
  buttons.classList.add("hidden");
  question.classList.add("hidden");
  result.classList.remove("hidden");

  burstSparkles(26);
});

// reset
resetBtn.addEventListener("click", () => {
  gameLocked = false;
  result.classList.add("hidden");
  buttons.classList.remove("hidden");
  question.classList.remove("hidden");
  moveNoButton();
});

// Sparkles effect
function burstSparkles(count = 20) {
  const layer = document.querySelector(".sparkles");
  layer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";

    const angle = Math.random() * Math.PI * 2;
    const radius = 80 + Math.random() * 120;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    s.style.left = "50%";
    s.style.top = "55%";
    s.style.setProperty("--dx", `${dx}px`);
    s.style.setProperty("--dy", `${dy}px`);

    // random color (pink-ish)
    const colors = ["#ff5fa2", "#ff8cc0", "#ffd1e6", "#ffc2d9"];
    s.style.background = colors[(Math.random() * colors.length) | 0];

    layer.appendChild(s);
  }
}

// initial
moveNoButton();
