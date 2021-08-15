import React, { useEffect, useState } from 'react';
import NotificationItem from './notification-item';
import Constants from '../utils/constants';
import PropTypes from 'prop-types';



function NotificationContainer(getStylesContainer,getStylesOverrideWidth,getStylesByElement,getStylesOverrideStyle,position,notifications,onRemove,noAnimation,allowHTML,children) {
  const [_style, set_style] = useState({});
  useEffect(() => {
     // Fix position if width is overrided
     set_style(getStylesContainer(position));

     if (getStylesOverrideWidth && (position === Constants.positions.topCenter || position === Constants.positions.bottomCenter)) {
      _style.marginLeft = -(getStylesOverrideWidth / 2);
     }
  }, [])

  if ([Constants.positions.bottomLeft, Constants.positions.bottomRight, Constants.positions.bottomCenter].indexOf(position) > -1) {
    notifications.reverse();
  }

  return (
    <>
      <div className={ 'notifications-' + position } style={ _style }>
        {
          notifications.map((notification) => {
            return (
              <NotificationItem
                ref={ 'notification-' + notification.uid }
                key={ notification.uid }
                notification={ notification }


                getStyles={ getStylesByElement }
                getStylesOverrideStyle={getStylesOverrideStyle}

                onRemove={ onRemove }
                noAnimation={ noAnimation }
                allowHTML={ allowHTML }
                children={ children }
              />
            );
          })
        }
      </div>
    </>
  )
}
NotificationContainer.propTypes = {
  position: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  getStyles: PropTypes.object
}
export default NotificationContainer
