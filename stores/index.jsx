var EventEmitter = require('events').EventEmitter;
var notifyDispatcher = require('../dispatcher');
var Constants = require('../utils/constants');

var _currentItem = null;

var store = Object.assign({}, EventEmitter.prototype, {
    
    emitAddNotification: function () {
        this.emit(Constants.storeEvents.ON_ADD_ITEM);
    },
    addListenerAddNotification: function (callback) {
        this.on(Constants.storeEvents.ON_ADD_ITEM, callback);
    },
    removeListenerAddNotification: function (callback) {
        this.removeListener(Constants.storeEvents.ON_ADD_ITEM, callback);
    },

    emitRemoveNotification: function () {
        this.emit(Constants.storeEvents.ON_REMOVE_ITEM);
    },
    addListenerRemoveNotification: function (callback) {
        this.on(Constants.storeEvents.ON_REMOVE_ITEM, callback);
    },
    removeListenerRemoveNotification: function (callback) {
        this.removeListener(Constants.storeEvents.ON_REMOVE_ITEM, callback);
    },
    
    getCurrentItem: function () {
        return _currentItem;
    }
});

store.dispatchToken = notifyDispatcher.register(function (payload) {

    switch (payload.action) {
        
        case Constants.actionTypes.ADD_NOTIFY_ITEM:
        {
            _currentItem = payload.notificationItem;            

            store.emitAddNotification();
            
            break;
        }

        case Constants.actionTypes.ON_REMOVE_ITEM:
        {
            _currentItem = payload.notificationItem;            

            store.emitRemoveNotification();
            
            break;
        }
        
    }
});

module.exports = store;