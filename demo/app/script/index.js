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

function handleFormSubmit(event) {
  event.preventDefault();

  $(this)
    .find('.message')
    .removeClass('hidden');
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

function toggleMoveToElement(event) {
  $(this).toggleClass('moveToClass');
}

// fn final ----------------------------------------------------------------------------------------
function handleDataAction(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));
  const data = $(this).data('action');
  const action = Object.keys(data)[0];
  const val = data[action];
  const state = !~~$(this).data('state');

  event.preventDefault();
  setTimeout(delayedHandle(action, state, $source, $target, val), 500);
  $(this).data('state', state);
}

function handleDataActions(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));
  const data = $(this).data('actions');
  const state = !~~$(this).data('state');

  for (let i = 0; i < data.length; i++) {
    const innerData = data[i];
    const action = Object.keys(innerData)[0];
    const val = innerData[action];

    event.preventDefault();
    setTimeout(delayedHandle(action, state, $source, $target, val), 500);
    $(this).data('state', state);
  }
}

function delayedHandle(action, state, $source, $target, val) {
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

    case 'addClass': {
      const dest = val.child ? $target.find(`> ${val.child}`) : $target;
      const cls = val.value;

      if (!dest.hasClass(cls)) {
        dest.addClass(cls);
      } else {
        dest.removeClass(cls);
      }

      break;
    }

    case 'addAttr': {
      const dest = val.child ? $target.find(`> ${val.child}`) : $target;
      const attr = val.attr;
      const value = val.value;

      if (dest.attr(attr) !== value) {
        dest.attr(attr, value);
      } else {
        dest.removeAttr(attr);
      }
      break;
    }

    case 'load': {
      $source.parent().children().removeClass('active');
      $source.addClass('active');
      $target.children().addClass('hidden');
      $(val).removeClass('hidden');
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

  function handleMouseup(event) {
    $('body')
      .off('mousemove', handleDragging)
      .off('mouseup', handleMouseup);
  }

  $('body')
    .on('mouseup', handleMouseup)
    .on('mousemove', handleDragging);
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
    $dropZone.text('This text is changed by [draggableBox]...');
  } else {
    $dropZone.text('draggableBoxDest');
  }
}

function changeCssAndInnerHtml(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));
  const state = !~~$(this).data('state');

  event.preventDefault();

  if (state) {
    $target.addClass('paper-btn');
    $target.css('color', '#86a361');
    $source.prop('disabled', true);
    $target.html('Double click<br /><br />this element<br />to revert the changes of<br />[changeInnerHtmlBtn]...');
  }
}

function revertCssAndInnerHtml(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));
  const state = !~~$(this).data('state');

  event.preventDefault();

  if (state) {
    $target.prop('disabled', false);
    $source.removeClass('paper-btn');
    $source.html('');
  }
}

function setSourceValueToTargetText(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));

  $target.text($source.val());
}

// ################################################
// ################################################
// ################################################
// ################################################
// ################################################
// ################################################
// ################################################
$(function() {
  $('.jsToggleElement').on('click', onClickToggleElement);

  $('#toggleMessage')
    .on('click', displayFirstMessage)
    .on('dblclick', displaySecondMessage);

  $('body').on('keydown', handleKeydown);

  $('#openAlert').on('click', openAlert);

  $('#openConfirm').on('click', openConfirm);

  $('#openPrompt').on('click', openPrompt);

  $('#moveTo').on('mouseenter mouseleave', toggleMoveToElement);

  $('#formSubmitTest').on('submit', handleFormSubmit);

  // jqeury final ----------------------------------------------------------------------------------------
  // elements
  $('#draggableBox').on('mousedown', handleMousedown);

  $('#changeInnerHtmlBtn').on('dblclick', changeCssAndInnerHtml);

  $('#changeInnerHtmlDest').on('dblclick', revertCssAndInnerHtml);

  $('#fmFileInput').on('change', setSourceValueToTargetText);

  // atrributes
  $('[data-action]').on('click', handleDataAction);

  $('[data-actions]').on('click', handleDataActions);
});