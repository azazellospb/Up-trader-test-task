export const SHOW_MODAL = "SHOW_MODAL"
export const SHOW_SUBMODAL = "SHOW_SUBMODAL"
export const HIDE_MODAL = "HIDE_MODAL"
export const HIDE_SUBMODAL = "HIDE_SUBMODAL"


interface IModalReducer {
  modal: boolean,
  subModal: boolean
  itemId: string,
  subitemId: string
}

const initialState: IModalReducer = {
  modal: false,
  subModal: false,
  itemId: '',
  subitemId: ''
};

export const modalReducer = (state = initialState, action: TActionModal) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: true,
        itemId: action.payload
      };
    case SHOW_SUBMODAL:
      return {
        ...state,
        subModal: true,
        subitemId: action.payload
      };
      case HIDE_MODAL:
        return {
        ...state,
        modal: false,
      };
      case HIDE_SUBMODAL:
        return {
        ...state,
        subModal: false,
      };
    default:
      return state;
    }
}

export type TModalItem = {
  itemId: string
}

export type TActionModal = {
  payload: string;
  type: string;
}

export const showModal = (payload: string) => ({ type: SHOW_MODAL, payload });
export const showSubmodal = (payload: string) => ({ type: SHOW_SUBMODAL, payload });

export const hideModal = () => ({ type: HIDE_MODAL });
export const hideSubModal = () => ({ type: HIDE_SUBMODAL });
