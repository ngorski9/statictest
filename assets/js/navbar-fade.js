const body = document.getElementById('body');
const mobile_nav = document.getElementById('mobile-navbar-options');
const content_wrapper = document.getElementById('content-wrapper');

var expanded = false
var current_dropdown_menu = -1;

function collapseMenu(){
  body.className = "";
  content_wrapper.className = "";
  expanded = false
  setTimeout( set_navbar_to_normal, 0 )
  setTimeout( () => { mobile_nav.className = "hide"; }, 500 );
}

function hamburgerClick(){
  if( !expanded ){
    mobile_nav.className = "";
    expanded = true
    body.className = "menu-expand";
    setTimeout( () => { content_wrapper.className = "hide"; }, 500);
  }
  else{
    collapseMenu()
  }
}

function mobile_dropdown(which){
  // if another menu is expanded, close it and set the open menu to the current one.
  if(current_dropdown_menu != which && current_dropdown_menu != -1){
    mobile_dropdown(current_dropdown_menu)
  }

  // do the actual expanding / contracting
  var dropdown_content_wrapper = document.getElementById("mobile-dropdown-" + which.toString()).querySelector(".mobile-menu-dropdown-content-wrapper");
  var dropdown_contents = dropdown_content_wrapper.querySelector(".mobile-menu-dropdown-contents");
  var new_class_index = dropdown_content_wrapper.className.search("mobile-menu-dropdown-content-wrapper-expanded");
  if( new_class_index == -1){
    // expand
    dropdown_content_wrapper.className += " mobile-menu-dropdown-content-wrapper-expanded";
    dropdown_content_wrapper.style["max-height"] = dropdown_contents.offsetHeight.toString() + "px";
    current_dropdown_menu = which;
  }
  else{
    // contract
    dropdown_content_wrapper.className = dropdown_content_wrapper.className.substr(0, new_class_index);
    dropdown_content_wrapper.style["max-height"] = "0px";
    current_dropdown_menu = -1;
  }
}

// collapse the mobile menu when the page is resized
window.addEventListener('resize', function(event) {
  collapseMenu();
}, true);
