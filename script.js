const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);
document.getElementById("year").textContent = new Date().getFullYear();

// Typing animation for the college name. The complete name remains available in the page source.
const typingTarget = document.getElementById("schoolTyping");
const schoolName = "Torres Capitol College, Inc.";
let letterIndex = 0;
let deleting = false;
function typeSchool() {
  if (!typingTarget) return;
  typingTarget.textContent = schoolName.slice(0, letterIndex);
  if (!deleting) {
    letterIndex++;
    if (letterIndex > schoolName.length) {
      deleting = true;
      setTimeout(typeSchool, 1800);
      return;
    }
  } else {
    letterIndex--;
    if (letterIndex < 0) {
      deleting = false;
      letterIndex = 0;
    }
  }
  setTimeout(typeSchool, deleting ? 45 : 90);
}
typeSchool();



document.querySelectorAll(
  ".project-image img, .certificate-thumb img"
).forEach((img) => {
  img.style.cursor = "zoom-in";
  img.title = "Click to enlarge";

  img.addEventListener("click", () => {
    const preview = document.createElement("div");
    preview.className = "image-lightbox";

    preview.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(8, 12, 24, 0.94);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      cursor: zoom-out;
    `;

    const enlarged = document.createElement("img");
    enlarged.src = img.src;
    enlarged.alt = img.alt || "Image preview";

    enlarged.style.cssText = `
      display: block;
      max-width: 95vw;
      max-height: 90vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 10px;
      box-shadow: 0 12px 50px rgba(0, 0, 0, 0.4);
    `;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.textContent = "✕";
    closeButton.setAttribute("aria-label", "Close image preview");

    closeButton.style.cssText = `
      position: absolute;
      top: 20px;
      right: 24px;
      color: white;
      background: #252b3b;
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 22px;
      cursor: pointer;
    `;

    const closePreview = () => {
      preview.remove();
      document.removeEventListener("keydown", handleEscape);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") closePreview();
    };

    closeButton.addEventListener("click", closePreview);

    preview.addEventListener("click", (event) => {
      if (event.target === preview) closePreview();
    });

    preview.appendChild(enlarged);
    preview.appendChild(closeButton);
    document.body.appendChild(preview);

    document.addEventListener("keydown", handleEscape);
  });
});

