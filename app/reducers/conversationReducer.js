import * as actions from "../actions/types";

const initialState = {
    conversationIsLoading: false,
    otherUserId: null,
    conversations: [],
    conversation: {
        id:"",
        messages: []
    },
    receivingCallRequest: false,
    videoInProgress: false,
    videoConversation: {
        from: {
            name: null,
            id: null,
            avatar: null,
        },
        conversationId: null,
    },
    refresh: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.SET_CONVERSATION_LOADER:
            return {
                ...state,
                conversationIsLoading: true
            }
        case actions.SET_OTHER_USER_ID:
            return {
                ...state,
                otherUserId: action.payload
            }
        case actions.SET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload
            }
        case actions.SET_CONVERSATION:
            return {
                ...state,
                conversation: {
                    id: action.payload.id,
                    messages:action.payload.messages
                },
                conversationIsLoading: false
            }
        case actions.SET_MESSAGE:
            return {
                ...state,
                conversation: {
                    id: state.conversation.id,
                    messages: [...state.conversation.messages, action.payload]
                }
            }
        case actions.SEND_VIDEO_CONNECTION:
            return {
                ...state,
                videoConversation: {
                    from: {
                        name: null,
                        id: null,
                        avatar: null,
                    },
                    conversationId: action.payload,
                },
                refresh: true,
            }
        case actions.RECEIVE_VIDEO_CONNECTION:
            return {
                ...state,
                receivingCallRequest: true,
                videoConversation: {
                    from: action.payload.user,
                    conversationId: action.payload.id,
                }
            }

        case actions.CONFIRM_VIDEO_CONNECTION:
            return {
                ...state,
                receivingCallRequest: false,
            }

        case actions.DECLINE_VIDEO_CONNECTION:
            return {
                ...state,
                receivingCallRequest: false,
            }

        default:
            return state;
    }
}
