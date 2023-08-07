// Ultrasound Slider Code        
function changePos(){
    var d1top = document.getElementById("d1top").value;
    var d2top = document.getElementById("d2top").value;
    var d1left = document.getElementById("d1left").value;
    var d2left = document.getElementById("d2left").value;
    var detector = document.getElementById("detector").value;
    var obheight = document.getElementById("obheight").value;
    var obwidth = document.getElementById("obwidth").value;
            
    var slidermax = document.getElementById("detector").max = obwidth;
    d1max = document.getElementById("d1left").max = (obwidth-10);
    d2max = document.getElementById("d1left").max = (obwidth-8);
        
    if(d1left< 0 ||d1top < 0||d2left < 0||d2top < 0 || obheight < 0 || obwidth < 0){
        alert("Please Input Positive Values Only");
        d1left = Math.abs(d1left);
        d1top = Math.abs(d1top);
        d2left = Math.abs(d2left);
        d2top = Math.abs(d2top);
    }
    if(d1left > d1max|| d2left > d2max){
        alert("Value Out of Bounds! \n Please input a number from 0 to " + obwidth)
        d1left -= d1max;
        d2left -= d2max;
    }
    if(d1top > obheight|| d2top > (obheight-5)){
        window.alert("Value Out of Bounds! \n Please input a number from 0 to "+ obheight)
                d1top -= 20;
                d2top -= 15;
            }
    d1top +="vw";
    d2top +="vw";
    d1left +="vw";
    d2left +="vw";
    obwidth += "vw";
    obheight += "vw";
    document.documentElement.style.setProperty("--d1top",d1top);
    document.documentElement.style.setProperty("--d1left",d1left);
    document.documentElement.style.setProperty("--d2top",d2top);
    document.documentElement.style.setProperty("--d2left",d2left);
    document.documentElement.style.setProperty("--obheight",obheight);
    document.documentElement.style.setProperty("--obwidth",obwidth);
}

function objsrc(){
    var d1top = document.getElementById("d1top").value;
    var d2top = document.getElementById("d2top").value;
    var d1left = document.getElementById("d1left").value;
    var d2left = document.getElementById("d2left").value;
    var detector = document.getElementById("detector").value;
    var obheight = document.getElementById("obheight").value;
    var obwidth = document.getElementById("obwidth").value;
            
    var slidermax = document.getElementById("detector").max = obwidth;
    d1max = document.getElementById("d1left").max = (obwidth-10);
    d2max = document.getElementById("d1left").max = (obwidth-8);

    if((detector > parseInt(d2left) && detector < (parseInt(d2left)+8)) || 
    ((detector > parseInt(d1left) && detector < (parseInt(d1left) + 10)))){
    // object found
        document.documentElement.style.setProperty("--graph1","block");
        document.documentElement.style.setProperty("--graph0","none");
        alert("Object Found!!")
    }
    else{
    //object not found
        document.documentElement.style.setProperty("--graph1","none");
        document.documentElement.style.setProperty("--graph0","block");
    }
}


// Pop Up Dialog Box Code 
    myButton.addEventListener("click", function () {
    myPopup.classList.add("show");
});
closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
});
window.addEventListener("click", function (event) {
    if (event.target == myPopup) {
        myPopup.classList.remove("show");
    }
});