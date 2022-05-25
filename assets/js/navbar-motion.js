var last_y_stop = 0
var scrollTimeout = null;
var navbar_hidden = false;
const navbar = document.getElementById('navbar')
const navbar_pad = document.getElementById('navbar-pad')

navbar.style.top = "-" + navbar.offsetHeight.toString() + "px"

function set_navbar_to_static(){
  navbar.style.position = "static";
  navbar.style.top = "-" + navbar.offsetHeight.toString() + "px"
  navbar_pad.style.height = "0px";
  last_y_stop = window.scrollY;
}

// collapse the mobile menu when the page is resized
window.addEventListener('resize', function(event) {
  collapseMenu();
  set_navbar_to_static()
}, true);

window.addEventListener('scroll', function(event){
  // store the last scroll position
  if(!expanded){
    last_y_before_expand = window.scrollY;
  }

  // handle the navbar appearing or disappearing
  if (scrollTimeout){
    clearTimeout(scrollTimeout);
  }

  if(scrollY < navbar.offsetHeight && (!(navbar.style.top === "0px") || scrollY > last_y_stop) ){
    set_navbar_to_static()
  }
  else{
    navbar_pad.style.height = navbar.offsetHeight.toString() + "px";
    navbar.style.position = "fixed";

    scrollTimeout = setTimeout(() => {
      if(window.scrollY > last_y_stop){
        navbar.style.top = "-" + navbar.offsetHeight.toString() + "px"
      }
      else{
        navbar.style.top = "0px"
      }
      last_y_stop = window.scrollY;
    }, 100);

  }

}, true)
