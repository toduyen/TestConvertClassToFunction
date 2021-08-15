import popupDispatcher from '../dispatcher';
import Constants from '../utils/constants';

 export function addNotifyItem(notificationItem)
 {
    popupDispatcher.dispatch({
        action: Constants.actionTypes.ADD_NOTIFY_ITEM,
        notificationItem: notificationItem
    });
 }
 export function removeNotifyItem(notificationItem)
 {
    popupDispatcher.dispatch({
        action: Constants.actionTypes.ADD_REMOVE_ITEM,
        notificationItem: notificationItem
    });
 }