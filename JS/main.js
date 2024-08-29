$('.toggle').on('click',(e)=>{
    $('.nav-container').toggleClass('floating-open')
})
$('.close-btn').on('click',(e)=>{
    $('.nav-container').toggleClass('floating-open')
})
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
let preloader = $('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.fadeOut()
    });
  }
  let backtotop = $('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.addClass('active')
      } else {
        backtotop.removeClass('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  function addAnimation(selector) {
    const cards = document.querySelectorAll(`.${selector}`);
  
    // Define the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the animate class when the card enters the viewport
          entry.target.classList.add("animate");
        //   entry.target.classList.remove("stop");
          console.log('inter')
        } else {
          // Optional: Remove the animate class when the card exits the viewport
          entry.target.classList.remove("animate");
        //   entry.target.classList.add("stop");
        }
      });
    });
  
    // Observe each card
    cards.forEach((card) => {
      observer.observe(card);
      card.classList.add("stop"); // Initial class to ensure no animation at start
    });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    // Call the function with the selector class of the elements you want to animate
    addAnimation("content");
    addAnimation("container");

  });
  
  

 