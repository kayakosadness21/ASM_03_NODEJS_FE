const initialStateChat = {
  chatRoomId: null,
  conversation: null,
  member: null,
};

const chatReducer = (state = initialStateChat, action) => {
  //   const { total, listCart } = state;
  //   console.log("CHECK listCart in action: ", action);
  switch (action.type) {
    case "ADD_ROOM":
      return {
        chatRoomId: action.payload.chatRoom._id,
        member: action.payload.chatRoom.member,
        conversation: action.payload.chatRoom.conversation,
      };
    case "ADD_MESSAGE":
      return {
        chatRoomId: state.chatRoomId,
        member: state.member,
        conversation: [...state.conversation, action.payload],
      };
    case "CLEAR_CHAT":
      return {
        chatRoomId: null,
        conversation: null,
        member: null,
      };
    default:
      return state;
  }
};

export default chatReducer;
