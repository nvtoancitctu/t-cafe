async function loadComponent(path, targetId) {
    const res = await fetch(path);
    const html = await res.text();

    document.getElementById(targetId).innerHTML = html;

    if (targetId === "scroll-buttons-container") {
        initScrollButtons();
    }
}

function initScrollButtons() {
    const scrollButtons = document.getElementById("scroll-buttons");

    if (!scrollButtons) return;

    const topBtn = document.getElementById("scrollTopBtn");
    const bottomBtn = document.getElementById("scrollBottomBtn");

    scrollButtons.classList.add("opacity-0", "pointer-events-none", "translate-y-5");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollButtons.classList.remove("opacity-0", "pointer-events-none", "translate-y-5");

            scrollButtons.classList.add("opacity-100", "translate-y-0");
        } else {
            scrollButtons.classList.add("opacity-0", "pointer-events-none", "translate-y-5");

            scrollButtons.classList.remove("opacity-100", "translate-y-0");
        }
    });

    topBtn?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    bottomBtn?.addEventListener("click", () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    });
}

loadComponent("./components/scroll-buttons.html", "scroll-buttons-container");
loadComponent("./components/footer.html", "footer-container");

// Reload trang khi submit form thành công
window.addEventListener("pageshow", function (event) {
    // Nếu trang được load từ cache (back/forward)
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        window.location.reload();
    }
});
