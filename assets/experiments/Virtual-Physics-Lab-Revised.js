let menu = document.querySelector('.nav-menu')
let menutoggle = document.querySelector('.menutoggle')
menutoggle.onclick = function(){
    menu.classList.toggle('menu-active')
}


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
    console.log(darkmode)
  }
  else
  {
    light_mode();
    console.log(darkmode)
  }
});