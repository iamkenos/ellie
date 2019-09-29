function onClickToggleElement() {
  const $el = $(this);
  const $showTarget = $($el.data('show'));
  const $hideTarget = $($el.data('hide'));
  const timeout = $el.data('timeout') || 0;

  setTimeout(function toggleHiddenClass() {
    $showTarget.removeClass('hidden');
    $hideTarget.addClass('hidden');
  }, timeout);
}

function displayFirstMessage() {
  $('#message1').removeClass('hidden');
  $('#message2').addClass('hidden');
}

function displaySecondMessage() {
  $('#message1').addClass('hidden');
  $('#message2').removeClass('hidden');
}

function makeBgRed() {
  $(this).css('background-color', 'red');
}

function makeBgBlue() {
  $(this).css('background-color', 'blue');
}

function detectDrop($el) {
  const $dropZone = $($el.data('dropzone'));
  const dragOffset = $el.offset();
  const dropOffset = $dropZone.offset();
  const dragTop = dragOffset.top;
  const dragRight = dragOffset.left + $el.outerWidth();
  const dragBottom = dragOffset.top + $el.outerHeight();
  const dragLeft = dragOffset.left;
  const dropTop = dropOffset.top;
  const dropRight = dropOffset.left + $dropZone.outerWidth();
  const dropBottom = dropOffset.top + $dropZone.outerHeight();
  const dropLeft = dropOffset.left;

  if (dragBottom > dropTop && dragTop < dropBottom && (dragRight > dropLeft && dragLeft < dropRight)) {
    $dropZone.text('Dropped!');
  } else {
    $dropZone.text('Dropzone');
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/', true);
  xhr.send();

  $(this)
    .find('.message')
    .removeClass('hidden');
}

function handleDataAction(event) {
  const $target = $($(this).data('target'));
  const data = $(this).data('action');
  const action = Object.keys(data)[0];
  const val = data[action];
  const state = $(this).data('state') ? !$(this).data('state') : true;

  event.preventDefault();

  setTimeout(function delayedHandle() {
    switch (action) {
      case 'select': {
        if (state === true) {
          $target.val(val).change();
        } else {
          $target.val('1').change();
        }

        break;
      }

      case 'toggleClass': {
        $target.toggleClass(val);
        break;
      }

      case 'text': {
        if (state) {
          $target.text(val);
        } else {
          $target.text('');
        }
        break;
      }

      case 'value': {
        if (state) {
          $target.val(val);
        } else {
          $target.val('');
        }
        break;
      }

      case 'create': {
        if (state) {
          $(val).appendTo($target);
        } else {
          $target.empty();
        }

        break;
      }

      default: {
        if (state) {
          $target.prop(action, val === 'true');
        } else {
          $target.prop(action, val === 'false');
        }

        break;
      }
    }
  }, 500);

  $(this).data('state', state);
}

function handleMousedown(event) {
  window.dragging = {
    pageX0: event.pageX,
    pageY0: event.pageY,
    elem: this,
    offset0: $(this).offset()
  };

  function handleDragging(event) {
    const left = window.dragging.offset0.left + (event.pageX - window.dragging.pageX0);
    const top = window.dragging.offset0.top + (event.pageY - window.dragging.pageY0);

    $(window.dragging.elem).offset({
      top: top,
      left: left
    });

    detectDrop($(window.dragging.elem));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleMouseup(event) {
    $('body')
      .off('mousemove', handleDragging)
      .off('mouseup', handleMouseup);
  }

  $('body')
    .on('mouseup', handleMouseup)
    .on('mousemove', handleDragging);
}

function handleKeydown(event) {
  const $target = $('#testKeyResponse');

  $target.text(event.keyCode);
}

function openAlert(event) {
  event.preventDefault();

  window.alert('I am a alert box!');
}

function openConfirm(event) {
  const $result = $('#confirmResult');
  event.preventDefault();

  const result = window.confirm('I am a confirm box!');
  $result.text(result);
}

function openPrompt(event) {
  const $result = $('#promptResult');
  event.preventDefault();

  const result = window.prompt('I am a prompt!');
  $result.text(result);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toggleMoveToElement(event) {
  $(this).toggleClass('moveToClass');
}

$(function() {
  $('.jsToggleElement').on('click', onClickToggleElement);

  $.cookie('test', 'yumyum');

  $('#toggleMessage')
    .on('click', displayFirstMessage)
    .on('dblclick', displaySecondMessage);

  $('#toggleBackground')
    .on('click', makeBgRed)
    .on('dblclick', makeBgBlue);

  $('#draggable').on('mousedown', handleMousedown);

  $('#formSubmitTest').on('submit', handleFormSubmit);

  $('[data-action]').on('click', handleDataAction);

  $('body').on('keydown', handleKeydown);

  $('#openAlert').on('click', openAlert);

  $('#openConfirm').on('click', openConfirm);

  $('#openPrompt').on('click', openPrompt);

  $('#moveTo').on('mouseenter mouseleave', toggleMoveToElement);
});
