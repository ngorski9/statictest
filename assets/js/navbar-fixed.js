var breakpoint_y = -1
navbar_is_normal = true
const nav = document.getElementById('navbar');
const navbar_pad = document.getElementById('navbar-pad')
const navbar_background = window.getComputedStyle( navbar , null ).getPropertyValue('background-color');

var breakpoint_id = (typeof(breakpoint_id) === "undefined") ? "" : breakpoint_id;

var transparent_navbar;
if( !(typeof(transparent_navbar_color) === "undefined" )){
  transparent_navbar = true;
}

var transparent_navbar_color = (typeof(transparent_navbar_color) === "undefined") ? "rgba(0,0,0,0)" : transparent_navbar_color;

transparent_navbar = (typeof(transparent_navbar) === "undefined") ? false : transparent_navbar;

function set_navbar_to_normal(){
  navbar.style.transition = "inherit";
  if(transparent_navbar){
    navbar.style.position = "absolute";
    navbar.style["background-color"] = transparent_navbar_color;
  }
  else{
    navbar.style.position = "static";
  }
  navbar.style.top = "0px";
  navbar_pad.style.height = "0px";
  last_y_stop = window.scrollY;
  navbar_is_normal = true;
}

function set_navbar_to_fixed(){
  navbar.style.position = "fixed";
  navbar.style.top = "-" + navbar.offsetHeight.toString() + "px"
  if(!transparent_navbar){
    navbar_pad.style.height = navbar.offsetHeight;
  }
  else{
    navbar.style["background-color"] = navbar_background;
  }

  setTimeout( () => {
    navbar.style.transition = "top 0.2s ease-in-out";
  }, 10)

  navbar_is_normal = false;
}

function set_breakpoint_y (){
  if ( ! (breakpoint_id === "") ){
    breakpoint_y = document.getElementById(breakpoint_id).getBoundingClientRect().top;
  }
  else{
    breakpoint_y = -1
  }
}

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
  set_breakpoint_y();
}, true)

//set breakpoint when page loads
document.addEventListener('readystatechange', function(event){
    if (event.target.readyState === "complete") {
        set_breakpoint_y();
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
