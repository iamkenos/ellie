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
    case 'load': {
      window.scrollTo(0, 0);
      $source.closest('ul').find('li>:first-child').removeClass('xtnd-active-nav-item');
      $source.addClass('xtnd-active-nav-item');
      $target.children().addClass('hidden');
      $(val).removeClass('hidden');
      break;
    }

    case 'ajax': {
      if (state === true) {
        $.ajax({
          url: 'https://reqres.in/api/login',
          type: 'POST',
          data: {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
          },
          success: function(response) {
            const parsed = JSON.stringify(response, null, 2).trim();
            $target.html(buildCodeWrapper(parsed));
          }
        });
      } else {
        $target.text('');
      }

      break;
    }

    case 'showCookies': {
      const cookies = JSON.stringify(getCookies(), null, 2).trim();
      $target.html(buildCodeWrapper(cookies));
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

    case 'alertBox': {
      window.alert(val);
      break;
    }

    case 'confirmBox': {
      const result = window.confirm(val);
      $target.text(result);
      break;
    }

    case 'promptBox': {
      const result = window.prompt(val);
      $target.text(result);
      break;
    }

    case 'delayEnable': {
      const timeout = val || 0;

      setTimeout(function fn() {
        if ($target.attr('disabled')) {
          $target.removeAttr('disabled');
        } else {
          $target.attr('disabled', true);
        }
      }, timeout);
      break;
    }

    case 'delayShow': {
      const timeout = val || 0;

      setTimeout(function fn() {
        if ($target.attr('hidden')) {
          $target.removeAttr('hidden');
        } else {
          $target.attr('hidden', true);
        }
      }, timeout);
      break;
    }

    case 'delayResize': {
      const timeout = val || 0;

      setTimeout(function fn() {
        if ($target.attr('height') && $target.attr('width')) {
          $target.removeAttr('height');
          $target.removeAttr('width');
        } else {
          $target.attr('height', 250);
          $target.attr('width', 250);
        }
      }, timeout);
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

function clearTargetText(event) {
  const $target = $($(this).data('target'));

  $target.text('');
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

function setSourceCoordinatesToTargetText(event) {
  const $target = $($(this).data('target'));
  const x = event.pageX;
  const y = event.pageY;

  $target.text(`X: ${x} | Y: ${y}`);
}

function getViewportOffset($elem) {
  const $window = $(window);
  const scrollLeft = $window.scrollLeft();
  const scrollTop = $window.scrollTop();
  const offset = $elem.offset();
  const rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + $window.width(), y2: scrollTop + $window.height() };
  const rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + $elem.width(), y2: offset.top + $elem.height() };
  return {
    left: offset.left - scrollLeft,
    top: offset.top - scrollTop,
    insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1
  };
}

function handleScroll(event) {
  const $source = $('#scrollToElementBox');
  const $target = $('#scrollToElementBoxDest');

  if ($source.visible(true)) {
    const rect = getViewportOffset($target);
    $target.text(`Left: ${rect.left} | Top: ${rect.top}`);
  } else {
    $target.text('');
  }
}

function handleKeydown(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));

  $source.val('');
  $target.text(event.keyCode);
}

function getCookies() {
  const pairs = document.cookie.split(';');
  const cookies = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

function buildCodeWrapper(content) {
  return `<pre><code class="text-success">${content}</code></pre>`;
}

$(function() {
  // global
  document.addEventListener('scroll', handleScroll, true);

  $(window).on('load', function() {
    const action = 'load';
    const state = true;
    const $source = $('#nav-items').find('li>:first-child').first();
    const $target = $('#container');
    const val = '#content1';

    delayedHandle(action, state, $source, $target, val);
  });

  // atrributes
  $('[data-action]').on('click', handleDataAction);

  $('[data-actions]').on('click', handleDataActions);

  // elements
  $('#draggableBox').on('mousedown', handleMousedown);

  $('#changeInnerHtmlBtn').on('dblclick', changeCssAndInnerHtml);

  $('#changeInnerHtmlDest').on('dblclick', revertCssAndInnerHtml);

  $('#fmFileInput').on('change', setSourceValueToTargetText);

  $('#keyPress')
    .on('keydown', handleKeydown)
    .on('keyup', handleKeydown);

  $('#moveToElementBox')
    .on('mouseenter', setSourceCoordinatesToTargetText)
    .on('mouseleave', clearTargetText);

  $(document).on('contextmenu', '#changeTxtBtn', handleDataAction);
  $('#changeTxtBtn').off('click');

  $('#changeValBtn').on('mousedown', (btn) => {
    const $source = btn.currentTarget;
    const data = $source.dataset;
    const $target = $(data.target);
    const actions = JSON.parse(data.actions);
    const state = !~~$(this).data('state');

    if (btn.which === 2) {
      for (let i = 0; i < actions.length; i++) {
        const innerData = actions[i];
        const action = Object.keys(innerData)[0];
        const val = innerData[action];

        event.preventDefault();
        setTimeout(delayedHandle(action, state, $source, $target, val), 500);
        $(this).data('state', state);
      }
    }
  });
  $('#changeValBtn').off('click');
});
