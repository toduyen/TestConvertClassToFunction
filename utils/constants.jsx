var CONSTANTS = {
    
      // Positions
      positions: {
        topLeft: 'topLeft',
        topRight: 'topRight',
        topCenter: 'topCenter',
        bottomLeft: 'bottomLeft',
        bottomRight: 'bottomRight',
        bottomCenter: 'bottomCenter'
      },
    
      // Levels
      levels: {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info'
      },
    
      // Notification defaults
      defaultNotifyItem: {
        title: null,
        message: null,
        level: null,
        position: 'topCenter',
        autoDismiss: 5,
        dismissible: true,
        action: null
      },

      actionTypes: {
        ADD_NOTIFY_ITEM : 'ADD_NOTIFY_ITEM',
        REMOVE_NOTIFY_ITEM : 'REMOVE_NOTIFY_ITEM'
      },

      storeEvents:{
        ON_ADD_ITEM:'ON_ADD_ITEM',
        ON_REMOVE_ITEM:'ON_REMOVE_ITEM',
      }
    };
    
    
    module.exports = CONSTANTS;