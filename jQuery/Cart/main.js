(function ($) {
  $(function () {
    var sum = 0;
    $(function () {
      $('.jcarousel').jcarousel({
        // Configuration goes here
        animation: {
          duration: 900,
          easing: 'linear',
          complete: function () {}
        },
        wrap: 'circular'
      })
    })

    $('.jcarousel').jcarouselAutoscroll({
      interval: 3000,
      target: '+=1',
      autostart: true
    })

    $('.carousel__item').draggable({ opacity: 0.7, helper: 'clone' })
    $('#cartBlock').droppable({
      drop: function (event, ui) {
        $(this).addClass('ui-state-highlight')
        var item = ($('<li/>', {
          class: 'cartList__item'
        }))
        item.append($('<div/>', {
          text: ui['draggable'].find('.productName').eq(0).text(),
          class: 'productName'
        }))
        item.append($('<div/>', {
          text: ui['draggable'].find('.productPrice').eq(0).text(),
          class: 'productPrice'
        })
        )
          sum += parseInt(ui['draggable'].find('.productPrice').eq(0).text().split(' ')[0]);
        $('#cartList').append(item);
        $('#cartBlock span').text(sum);
      }
    })
  })
})(jQuery)