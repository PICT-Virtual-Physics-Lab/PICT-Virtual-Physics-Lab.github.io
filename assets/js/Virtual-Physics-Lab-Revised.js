let menu = document.querySelector('.nav-menu')
let menutoggle = document.querySelector('.menutoggle')
let menustate = localStorage.getItem("menustate")
const menuopen = () => {
  localStorage.setItem("menustate","open")
  menu.classList.toggle('menu-active')
}
const menuclose = () => {
  localStorage.setItem("menustate","closed")
  // menu.classList.toggle('menu-active')
}
if (menustate === "open"){
  menuopen();
}
else{
  menuclose();
}
menutoggle.onclick = function(){
  menustate = localStorage.getItem("menustate")
  if(menustate !== "open")
  {
    menuopen();
    console.log(localStorage.getItem("menustate"))
  }
  else
  {
    menuclose();
    menu.classList.toggle('menu-active')
    console.log(localStorage.getItem("menustate"))
  }
}
function onDrag({movementY}){
  const menuStyle = window.getComputedStyle(menu);
  menuTop = parseInt(menuStyle.top),
  menuHeight = parseInt(menuStyle.height),
  windowHeight = window.innerHeight;
 console.log(movementY)
menu.style.top = menuTop > 0 ? `${menuTop + movementY}px` : "1px";
if((menuTop > windowHeight - menuHeight)){
  menu.style.top = `${windowHeight - menuHeight}px`;
}
}

menu.addEventListener("mousedown", ()=>{
  menu.addEventListener("mousemove" , onDrag);
});
menu.addEventListener("mouseup", ()=>{
  menu.removeEventListener("mousemove" , onDrag);
});
menu.addEventListener("mouseleave", ()=>{
  menu.removeEventListener("mousemove" , onDrag);
});

let darkmode = localStorage.getItem("darkmode")
const modeToggle = document.querySelector(".dark-mode-toggle")

const dark_mode = () => {
  document.body.classList.add("dark-mode")
  localStorage.setItem("darkmode","true");
}
const light_mode = () => {
  document.body.classList.remove("dark-mode")
  localStorage.setItem("darkmode","false");
}
if(darkmode === "true"){
  dark_mode();
}
else{
  light_mode();
}
modeToggle.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode")
  if(darkmode !== "true")
  {
    dark_mode();
    console.log(localStorage.getItem("darkmode"))
  }
  else
  {
    light_mode();
    console.log(localStorage.getItem("darkmode"))
  }
});