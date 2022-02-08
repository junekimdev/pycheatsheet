const onMenuClick = () => {
  const menu = document.getElementById("menu");
  const isHide = menu.className === "hide";
  menu.className = isHide ? "show" : "hide";

  const menuBtn = document.getElementById("nav-btn");
  const oldBtnClass = isHide ? "sandwich" : "cross";
  const newBtnClass = isHide ? "cross" : "sandwich";
  menuBtn.classList.replace(oldBtnClass, newBtnClass);
};

const onMenuItemClick = () => onMenuClick();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("/service-worker.js");
      console.log("service worker registered");
    } catch (error) {
      console.error("service worker failed to register", error);
    }
  });
}
