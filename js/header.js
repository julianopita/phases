// When the user scrolls the page, execute myFunction
window.onscroll = function() {sticky_header()};

// Get the header
var header = document.getElementById("navHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function sticky_header() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    $('.small_logo').show();
  } else {
    header.classList.remove("sticky");
    $('.small_logo').hide();
  }
}