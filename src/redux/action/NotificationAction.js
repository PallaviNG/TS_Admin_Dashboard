export const saveAllNotificationDetailsAction = (notificationList) => {
    return {
      type: "SAVE_ALL_NOTIFICATION_DETAILS",
      payload: notificationList,
    };
  };
  
  export const addNewNotificationAction = (newNotification) => {
    return {
      type: "SAVE_NEW_NOTIFICATION",
      payload: newNotification
    };
  };
  
  export const deleteNotificationAction = (deleteID) => {
    return {
      type: "DELETE_NOTIFICATION",
      payload: deleteID
    };
  };