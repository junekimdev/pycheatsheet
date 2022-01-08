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
