import React, { useEffect, useState, useRef  } from 'react';
import Constants from '../utils/constants';
import Timer from '../utils/timer';
import PropTypes from 'prop-types';

var _styles = {};
var _notificationTimer = null;
var _height = 0;
var _noAnimation = null;
var _isMounted = false;
var _removeCount = 0;
var transition;

function Notificationitem(getStyles,getStylesOverrideStyle,notification,noAnimation,onRemove,allowHTML) {
  var className = 'notification notification-' + notification.level;
  var notificationStyle = Object.assign({}, _styles.notification);
  var cssByPos = _getCssPropertyByPosition();
  var dismiss = null;
  var actionButton = null;
  var title = null;
  var message = null;
  const myRef = useRef();
  const [containerEl] = useState(document.createElement('div'));
  const [visible, setvisible] = useState(undefined);
  const [removed, setremoved] = useState(false);

  useEffect(() => {
    var level = notification.level;
    _noAnimation = noAnimation;
    _styles = {
      notification: getStyles('notification')(level),
      title: getStyles('title')(level),
      dismiss: getStyles('dismiss')(level),
      messageWrapper: getStyles('messageWrapper')(level),
      actionWrapper: getStyles('actionWrapper')(level),
      action: getStyles('action')(level)
    };
    if (!notification.dismissible) {
      _styles.notification.cursor = 'default';
    }
  }, [])

  useEffect(() => {
    var transitionEvent = whichTransitionEvent();
    var element = myRef.current;
    _height = element.offsetHeight;
    _isMounted = true;
    // Watch for transition end
    if (!_noAnimation) {
      if (transitionEvent) {
        element.addEventListener(transitionEvent, _onTransitionEnd);
      } else {
        _noAnimation = true;
      }
    }
    if (notification.autoDismiss) {
      _notificationTimer = new Timer(() => {
        _hideNotification();
      }, notification.autoDismiss * 1000);
    }
    _showNotification();
    return () => {
      var element = myRef.current;
      var transitionEvent = whichTransitionEvent();
      element.removeEventListener(transitionEvent, _onTransitionEnd);
      _isMounted = false;
    }
  }, [])

  const whichTransitionEvent = () => {
    var transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };
    Object.keys(transitions).forEach(function(transitionKey) {
      if (containerEl.style[transitionKey] !== undefined) {
        transition = transitions[transitionKey];
      }
    });
    return transition;
  }
  const _getCssPropertyByPosition = () => {
    var position = notification.position;
    var css = {};
    switch (position) {
    case Constants.positions.topLeft:
    case Constants.positions.bottomLeft:
      css = {
        property: 'left',
        value: -200
      };
      break;

    case Constants.positions.topRight:
    case Constants.positions.bottomRight:
      css = {
        property: 'right',
        value: -200
      };
      break;

    case Constants.positions.topCenter:
      css = {
        property: 'top',
        value: -100
      };
      break;

    case Constants.positions.bottomCenter:
      css = {
        property: 'bottom',
        value: -100
      };
      break;

    default:
    }

    return css;
  }
  const _defaultAction = (event) => {
      event.preventDefault();
      if (notification && notification.action && typeof notification.action.callback === 'function') {
          notification.action.callback();
      }
      _hideNotification();
  }

  const _hideNotification = () => {
    if (_notificationTimer) {
      _notificationTimer.clear();
    }
    if (_isMounted) {
      setvisible(false);
      setremoved(true)
    }
    if (_noAnimation) {
      _removeNotification();
    }
  }

  const _removeNotification = () => {
    onRemove(notification.uid);
  }

  const _dismiss = () => {
    if (!notification.dismissible) {
      return;
    }
    _hideNotification();
  }

  const _showNotification = () => {
    setTimeout(() => {
      if (_isMounted) {
        setvisible(true);
      }
    }, 50);
  }

  const _onTransitionEnd = () => {
    if (_removeCount > 0) return;
    if (removed) {
      _removeCount += 1;
      _removeNotification();
    }
  }

  const _handleMouseEnter = () => {
    if (notification.autoDismiss) {
      _notificationTimer.pause();
    }
  }

  const _handleMouseLeave = () => {
    if (notification.autoDismiss) {
      _notificationTimer.resume();
    }
  }

  const _allowHTML = (string) => {
    return { __html: string };
  }

  const _onCLick = () => {
    if (notification && notification.action && typeof notification.action.callback === 'function') {
        notification.action.callback();
    }
  }


  if (visible) {
    className += ' notification-visible';
  } else if (visible === false) {
    className += ' notification-hidden';
  }
  if (visible) {
    className += ' notification-visible';
  } else if (visible === false) {
    className += ' notification-hidden';
  }

  if (!notification.dismissible) {
    className += ' notification-not-dismissible';
  }
  if (getStylesOverrideStyle) {
    if (!visible && !removed) {
      notificationStyle[cssByPos.property] = cssByPos.value;
    }
    if (visible && !removed) {
      notificationStyle.height = _height;
      notificationStyle[cssByPos.property] = 0;
    }
    if (removed) {
      notificationStyle.overlay = 'hidden';
      notificationStyle.height = 0;
      notificationStyle.marginTop = 0;
      notificationStyle.paddingTop = 0;
      notificationStyle.paddingBottom = 0;
    }
    notificationStyle.opacity = visible ? _styles.notification.isVisible.opacity : _styles.notification.isHidden.opacity;
  }

  if (notification.title) {
    title = <h4 className="notification-title" style={ _styles.title }>{ notification.title }</h4>;
  }



  if (notification.message) {
    if (allowHTML) {
      message = (
        <div className="notification-message" style={ _styles.messageWrapper }  onClick={_onCLick} dangerouslySetInnerHTML={_allowHTML(notification.message) } />
      );
    } else {
      message = (
        <div className="notification-message" style={_styles.messageWrapper } onClick={_onCLick}>{ notification.message }</div>
      );
    }
  }
  if (notification.dismissible) {
    dismiss = <span className="notification-dismiss" style={ _styles.dismiss } onClick={_dismiss}>&times;</span>;
  }
  if (notification.action) {
    actionButton = (
      <div className="notification-action-wrapper" style={ _styles.actionWrapper }>
        <button className="notification-action-button"
          onClick={ _defaultAction }
          style={ _styles.action }>
          { notification.action.label }
        </button>
      </div>
    );
  }
  if (notification.children) {
    actionButton = notification.children;
  }
  return (
    <>
      <div className={ className } onClick={ _dismiss } onMouseEnter={ _handleMouseEnter } onMouseLeave={ _handleMouseLeave } style={ notificationStyle }>
        { title }
        { message }
        { dismiss }
        { actionButton }
      </div>
    </>
  )
}
Notificationitem.propTypes = {
  notification: PropTypes.object,
  getStyles: PropTypes.object,
  onRemove: PropTypes.func,
  allowHTML: PropTypes.bool,
  noAnimation: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
}

export default Notificationitem