$(document).ready(function () {
  console.log('Hello World');
  new WOW().init();
  // Remove Items From Cart
  $('a.remove').click(function () {
    $(this).parent().parent().parent().hide(400);

  })
  $("#removeUser").click(function(e) {
    e.preventDefault();
    return confirm("Are you sure you want to delete?");
  })
  $('.owl-carousel').owlCarousel();

  // Just for testing, show all items
  $('a.btn.continue').click(function () {
    $('li.items').show(400);
  })

  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
  var count = 1;
  $('#total').text(count);
  $('.product_quantity').on('click', 'a', function (e) {
    e.preventDefault();
    if ($(this).hasClass('fa-chevron-right')) {
      if (count < 10) {
        count++;
        $('#total').text(count);
      }
    } else if ($(this).hasClass('fa-chevron-left')) {
      if (count > 1) {
        count--;
        $('#total').text(count);
      }
    }
  });
  const button = document.querySelector('.btn')
  const form = document.querySelector('.form')

  button.addEventListener('click', function () {
    form.classList.add('form--no');

  });
  
})

