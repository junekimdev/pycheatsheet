const onMenuClick = () => {
  const menu = document.getElementById("menu");
  const newClass = menu.className === "none" ? "clicked" : "none";
  menu.className = newClass;
};
