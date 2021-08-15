import React, { useEffect, useRef, useState } from 'react';
import NotificationContainer from './components/notification-container';
import Constants from './utils/constants';
import Styles from './utils/styles';
import NotificationStore from './stores';
import PropTypes from 'prop-types';

function NotificationSystem(style,noAnimation,allowHTML) {
  const ref = useRef(null);
  const audioEl = useRef(null);
  const [uid, setuid] = useState(3400);
  const [_isMounted, set_isMounted] = useState(false);
  const [overrideStyle, SetOverrideStyle] = useState({});
  const [overrideWidth, setoverrideWidth] = useState(null);
  const [elements, setelements] = useState({
    notification: 'NotificationItem',
    title: 'Title',
    messageWrapper: 'MessageWrapper',
    dismiss: 'Dismiss',
    action: 'Action',
    actionWrapper: 'ActionWrapper'
  })
  const [notifications, setnotifications] = useState([]);
  useEffect(() => {
    NotificationStore.addListenerAddNotification(_onAddNotifyItem);
    NotificationStore.addListenerRemoveNotification(_onRemoveNotifyItem);
    setOverrideStyle(style);
    set_isMounted(true);
  })
  useEffect(() => {
    NotificationStore.removeListenerAddNotification(_onAddNotifyItem);
    NotificationStore.removeListenerRemoveNotification(_onRemoveNotifyItem);
    set_isMounted(false);
  }, [set_isMounted])

  const setOverrideStyle = (style) => {
    SetOverrideStyle(style);
  }
  const wrapper = () => {
    if (!overrideStyle) return {};
      return Object.assign({}, Styles.Wrapper, overrideStyle.Wrapper);
  }
  const container = (position) => {
    var override = overrideStyle.Containers || {};
    if (!overrideStyle) return {};
    setoverrideWidth(Styles.Containers.DefaultStyle.width);
    if (override.DefaultStyle && override.DefaultStyle.width) {
      setoverrideWidth(override.DefaultStyle.width);
    }
    if (override[position] && override[position].width) {
      setoverrideWidth(override[position].width);
    }
    return Object.assign({}, Styles.Containers.DefaultStyle, Styles.Containers[position], override.DefaultStyle, override[position]);
  }
  const byElement = (Element) => {
    return function(level) {
      var _element = elements[Element];
      var override = overrideStyle[_element] || {};
      if (!overrideStyle) return {};
      return Object.assign({}, Styles[_element].DefaultStyle, Styles[_element][level], override.DefaultStyle, override[level]);
    };
  }
  
  const _didNotificationRemoved = (uid) => {
    var notification;
    var notifications = notifications.filter(function(toCheck) {
      if (toCheck.uid === uid) {
        notification = toCheck;
        return false;
      }
      return true;
    });

    if (_isMounted) {
      notifications(notifications)
    }

    if (notification && typeof notification.onRemove == 'function') {
      notification.onRemove(notification);
    }
  }
  const getNotificationRef = (notification) => {
    var foundNotification = null;
    Object.keys(ref).forEach(function(container) {
      if (container.indexOf('container') > -1) {
        Object.keys(ref[container].ref).forEach(function(_notification) {
          var uid = notification.uid ? notification.uid : notification;
          if (_notification === 'notification-' + uid) {
            // NOTE: Stop iterating further and return the found notification.
            // Since UIDs are uniques and there won't be another notification found.
            foundNotification = ref[container].ref[_notification];
          }
        });
      }
    });
    return foundNotification;
  }
  const removeNotification = (notification) => {
    var foundNotification = getNotificationRef(notification);
    return foundNotification && foundNotification._hideNotification();
  }
  const editNotification = (notification,newNotification) => {
    var foundNotification = null;
    // NOTE: Find state notification to update by using
    // `setState` and forcing React to re-render the component.
    var uid = notification.uid ? notification.uid : notification;
    var newNotifications = notifications.filter(function(stateNotification) {
      if (uid === stateNotification.uid) {
        foundNotification = stateNotification;
        return false;
      }

      return true;
    });
    if (!foundNotification) {
      return;
    }
    newNotifications.push(Object.assign(
      {},
      foundNotification,
      newNotification
    ));
    setnotifications(newNotifications);
  }
  const clearNotifications = () => {
    Object.keys(ref).forEach(function(container) {
      if (container.indexOf('container') > -1) {
        Object.keys(ref[container].refs).forEach(function(_notification) {
          ref[container].refs[_notification]._hideNotification();
        });
      }
    });
  }
  const _onAddNotifyItem = () => {
    var notification = NotificationStore.getCurrentItem();
    var _notification = Object.assign({}, Constants.defaultNotifyItem, notification);
    var i;
    if (!_notification.level || Object.keys(Constants.levels).indexOf(_notification.level) === -1) {
       _notification.level = Constants.levels.info;
    }
    // eslint-disable-next-line
    if (isNaN(_notification.autoDismiss)) {
      throw new Error('\'autoDismiss\' must be a number.');
    }
    if (Object.keys(Constants.positions).indexOf(_notification.position) === -1) {
        _notification.position = Constants.positions.bottomRight;
    }

    // Some preparations
    _notification.position = _notification.position.toLowerCase();
    _notification.level = _notification.level.toLowerCase();
    _notification.autoDismiss = parseInt(_notification.autoDismiss, 10);

    _notification.uid = _notification.uid || uid;
    _notification.ref = 'notification-' + _notification.uid;
    setuid(uid+1);
    // do not add if the notification already exists based on supplied uid
    for (i = 0; i < notifications.length; i += 1) {
      if (notifications[i].uid === _notification.uid) {
        return false;
      }
    }
    notifications.push(_notification);
    if (typeof _notification.onAdd === 'function') {
        notification.onAdd(_notification);
    }
    setnotifications(notifications);
    if(audioEl && typeof _notification.notifyAudio != 'undefined' && _notification.notifyAudio){
      try {
        audioEl.current.play();
      } catch (error) {
        
      } 
    }
    return _notification;
  }
  const _onRemoveNotifyItem = () => {
    var notification = NotificationStore.getCurrentItem();
    removeNotification(notification)
  }
  var containers = null;
  if (notifications.length) {
    containers = Object.keys(Constants.positions).map(function(position) {
      var _notifications = notifications.filter(function(notification) {
        return position.toLowerCase() === notification.position;
      });
      if (!_notifications.length) {
        return null;
      }
      return (
        <NotificationContainer
          ref={ 'container-' + position }
          key={ position }
          position={ position }
          notifications={ _notifications }
          getStylesContainer={ container(position) }
          getStylesOverrideWidth={overrideWidth}
          getStylesByElement = {byElement(Element)}
          getStylesOverrideStyle = { overrideStyle }
          onRemove={ _didNotificationRemoved }
          noAnimation={ noAnimation }
          allowHTML={ allowHTML }
        />
      );
    });
  }
  return (
    <>
      <div className="notifications-wrapper" style={ wrapper() }>
        { containers }
        <audio ref={audioEl} style={{opacity:0}}>
          <source src="//ims.mediacdn.vn/imsv2/statics/sounds/notify-sound.mp3" type="audio/mpeg" />
          <source src="//ims.mediacdn.vn/imsv2/statics/sounds/notify-sound.ogg" type="audio/ogg" />
        </audio>
      </div>
    </>
  )
}
NotificationSystem.propTypes = {
  style: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
  ]),
  noAnimation: PropTypes.bool,
  allowHTML: PropTypes.bool
}
export default NotificationSystem