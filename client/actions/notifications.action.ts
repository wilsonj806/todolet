import { Notifications, SyncNotificationActions, NotificationAction } from '../types';
export const ENQUEUE_SNACKBAR : SyncNotificationActions = "ENQUEUE_SNACKBAR";
export const CLOSE_SNACKBAR : SyncNotificationActions = "CLOSE_SNACKBAR";
export const REMOVE_SNACKBAR : SyncNotificationActions = "REMOVE_SNACKBAR";


export const enqueueSnackActionCreator = (notification: Notifications) : NotificationAction => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    payload: {
      notification: {
        ...notification,
        key: key || new Date().getTime() + Math.random()
      }
    }
  };
};

export const closeSnackActionCreator = (key: Notifications["key"]) : NotificationAction => ({
  type: CLOSE_SNACKBAR,
  payload: {
    dismissAll: !key, // dismiss all if no key has been defined
    key
  }
});

export const removeSnackActionCreator = (key: Notifications["key"]) : NotificationAction=> ({
  type: REMOVE_SNACKBAR,
  payload: {
    key
  }
});
