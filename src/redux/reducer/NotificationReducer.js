let initState = {
    notifications: [],
  };
  
  export const NotificationReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "SAVE_NEW_NOTIFICATION":
        return { ...state, notifications: payload };
      case "SAVE_ALL_NOTIFICATION_DETAILS":
        return { ...state, notifications: payload };
      case "DELETE_NOTIFICATION":
        let removeNotification = [...state.notifications];
        removeNotification.splice(payload, 1);
        return { ...state, notifications: removeNotification };
      default:
        return { ...state };
    }
  };
  