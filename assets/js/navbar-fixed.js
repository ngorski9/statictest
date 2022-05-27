var breakpoint_y = -1
navbar_is_normal = true
const nav = document.getElementById('navbar');
const navbar_pad = document.getElementById('navbar-pad')
const navbar_background = window.getComputedStyle( navbar , null ).getPropertyValue('background-color');
const desktop_navbar_options = document.getElementsByClassName("desktop-navbar-option");

var breakpoint_id = (typeof(breakpoint_id) === "undefined") ? "" : breakpoint_id;
var navbar_top_background = (typeof(navbar_top_background) === "undefined") ? navbar_background : navbar_top_background
var navbar_has_height = (typeof(navbar_has_height) === "undefined") ? true : navbar_has_height;
var navbar_hover_color_top = (typeof(navbar_hover_color_top) === "undefined") ? "" : navbar_hover_color_top;

if(navbar_hover_color_top != ""){
  document.querySelector(":root").style.setProperty("--navbar-hover-color-top", navbar_hover_color_top);

}

function set_navbar_to_normal(){
  navbar.style.transition = "inherit";
  navbar.style.position = "absolute";
  navbar.style["background-color"] = navbar_top_background;
  navbar.style.top = "0px";

  if(navbar_hover_color_top != ""){
    for(var i = 0; i < desktop_navbar_options.length; i++){
      desktop_navbar_options[i].className += " desktop-navbar-option-top";
    }
  }

  navbar_is_normal = true;
}

function set_navbar_to_fixed(){
  navbar.style.position = "fixed";
  navbar.style["background-color"] = navbar_background;
  navbar.style.top = "-" + navbar.offsetHeight.toString() + "px"

  if(navbar_hover_color_top != ""){
    for(var i = 0; i < desktop_navbar_options.length; i++){
      var class_name = desktop_navbar_options[i].className;
      var position = name.search("desktop-navbar-option-top");
      if(position != -1){
        desktop_navbar_options[i].className = class_name.substring(0,position);
      }
    }
  }

  setTimeout( () => {
    navbar.style.transition = "top 0.2s ease-in-out";
  }, 10)

  navbar_is_normal = false;
}

function setup (){
  if ( ! (breakpoint_id === "") ){
    breakpoint_y = document.getElementById(breakpoint_id).getBoundingClientRect().top;
    if(navbar_has_height){
      navbar_pad.style.height = navbar.offsetHeight.toString() + "px";
    }
  }
  else{
    breakpoint_y = -1
  }
}

setup();

if(breakpoint_y == -1){
  navbar.style.position = "fixed";
  navbar_pad.style.height = navbar.offsetHeight;
  navbar.style.top = "0px";
}
else{
  set_navbar_to_normal()
}

// set breakpoint when page resizes
window.addEventListener('resize', function(event){
  setup();
}, true)

//set breakpoint when page loads
document.addEventListener('readystatechange', function(event){
    if (event.target.readyState === "complete") {
        setup();
    }
});

// on scrolling, save last scroll position and check breakpoints
window.addEventListener('scroll', function(event){
  // store the last scroll position
  if(!expanded){
    last_y_before_expand = window.scrollY;
  }

  if(breakpoint_y > -1){
    if(window.scrollY > navbar.offsetHeight && navbar_is_normal){
      // if the navbar should be set to fixed
      set_navbar_to_fixed();
    }

    if(!navbar_is_normal){
      // adjust navbar depending on scroll position
      if(window.scrollY < navbar.offsetHeight){
        // if we're at the top of the page, set the navbar to normal
        set_navbar_to_normal();
      }
      else if(window.scrollY < breakpoint_y){
        // if we're in the range where the navbar shouldn't be visible
        navbar.style.top = "-" + navbar.offsetHeight.toString() + "px";
      }
      else{
        // if we're in the range where the navbar should be visible
        navbar.style.top = "0px";
      }
    }

  }

}, true)
