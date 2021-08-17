import { User } from "../util/types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";

export type ActionTypes =
  | {
      type: typeof SET_TOKEN;
      payload: string;
    }
  | { type: typeof SET_USER; payload: User };

// export const addQuiz =
//   (
//     title: string,
//     quizId: string
//   ): ThunkAction<void, Store, unknown, Action<string>> =>
//   (dispatch, getState) => {
//     let quiz: Quiz = {
//       id: quizId,
//       title: title,
//       layout: "single",
//       items: [],
//       valid: false,
//     };

//     let quizList: Quiz[] = [...getState().quizList, quiz];

//     dispatch(setQuiz(quizList));
//   };

export const setToken = (token: string): ActionTypes => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setUser = (user: User): ActionTypes => {
  return {
    type: SET_USER,
    payload: user,
  };
};
