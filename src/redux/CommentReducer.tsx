export interface State {
    comments: Array<string>;
}

const initialState: State = {
    comments: []
}

const CommentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "COMMENT_ADD":
            return { ...state, favorites: [...state.comments, action.payload] };
        default:
            return state;
    }
};
export default CommentReducer;
