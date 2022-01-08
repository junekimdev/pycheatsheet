const onMenuClick = () => {
  const menu = document.getElementById("menu");
  const newClass = menu.className === "hide" ? "show" : "hide";
  menu.className = newClass;
};

const onMenuItemClick = () => {
  const menu = document.getElementById("menu");
  menu.className = "hide";
};
