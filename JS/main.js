$('.toggle').on('click',(e)=>{
    $('.nav-container').toggleClass('floating-open')
})
$('.close-btn').on('click',(e)=>{
    $('.nav-container').toggleClass('floating-open')
})
const serverUrl = 'https://konnektsmartlife.org'

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
    const boxes = document.querySelectorAll('.box');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, observerOptions);
  
    // Observe each card
    boxes.forEach(box => {
      observer.observe(box);
  });
  }
  $('#book').on('submit',function(e){
    e.preventDefault()
    const numberRegex = /^\d{10}$/;
    const phone = $('#phone');
    const phoneNumber = phone.val();
    if (!numberRegex.test(phoneNumber)) {
        phone.addClass('error');
        showSnackbar(`Invalid phone number`);
        return
    }
    $.ajax({
      type:'post',
      url:`${serverUrl}/jalle/book`,
      data:$(this).serialize(),
      success:function(result){
          console.log(result)
          showSnackbar('Your request has been sent. We will call you')

          if(result.status===200){
              showSnackbar('Your request has been sent. We will call you')
          }
      },
      error:function(err){
          console.log(err)
      }
  })
  })
  function showSnackbar(message = '', buttonText = '', event) {

    const snackbar = document.querySelector('.mdc-snackbar');
    document.querySelector('.mdc-snackbar__label')
        .innerHTML = `${message}`;

    snackbar.classList.add('show');
    setTimeout(function () {
        snackbar.classList.remove("show");
    }, 6200);

}
  
  document.addEventListener("DOMContentLoaded", function () {
    // Call the function with the selector class of the elements you want to animate
    addAnimation("content");
    addAnimation("container");
    $.ajax({
      type: 'GET',
      url: 'https://welangaieric.github.io/jalle/product.json',
      success: function(result) {
        let display = $('.products')
        result.forEach((item)=>{
          let temp=`<div class="product box d-flex center fd-col">
                        <div class="product-image d-flex center ">
                            <img src=${item.image} alt=${JSON.stringify(item.name)}>
                        </div>
                        <div class="product-price d-flex center ">
                            <p class="d-flex center">Ksh.${item.price}/=</p>
                        </div>
                        <div class="product-desc d-flex left g-1 fd-col">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <a href="/jalle/details.html?item=${item.name}">Order Now</a>
                        </div>
                    </div>`
            display.append(temp)
        })
      }
    })

  });
  
  

 
