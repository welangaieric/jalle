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
    $.ajax({
      type: 'GET',
      url: '../product.json',
      success: function(result) {
        let display = $('.products')
        result.forEach((item)=>{
          let temp=`<div class="product d-flex center fd-col">
                        <div class="product-image d-flex center ">
                            <img src=${item.image} alt=${JSON.stringify(item.name)}>
                        </div>
                        <div class="product-price d-flex center ">
                            <p class="d-flex center">Ksh.${item.price}/=</p>
                        </div>
                        <div class="product-desc d-flex left g-1 fd-col">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <a href="/details.html?item=${item.name}">Order Now</a>
                        </div>
                    </div>`
            display.append(temp)
        })
      }
    })

  });
  
  

 