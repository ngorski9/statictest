const body = document.getElementById('body');
const mobile_nav = document.getElementById('mobile-navbar-options');
const content_wrapper = document.getElementById('content-wrapper');

var expanded = false
var last_y_before_expand = 0;

function collapseMenu(){
  body.className = "";
  content_wrapper.className = "";
  expanded = false
  setTimeout( () => { window.scrollBy(0, last_y_before_expand ) }, 10 );
  setTimeout( () => { mobile_nav.className = "back"; }, 500 );
}

function hamburgerClick(){
  if( !expanded ){
    expanded = true
    body.className = "menu-expand";
    mobile_nav.className = "front";
    setTimeout( () => { content_wrapper.className = "hide"; }, 500);
  }
  else{
    collapseMenu()
  }
}

// collapse the mobile menu when the page is resized
window.addEventListener('resize', function(event) {
  collapseMenu();
}, true);
