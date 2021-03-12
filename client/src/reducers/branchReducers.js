import {
  BRANCH_LIST_REQUEST,
  BRANCH_LIST_SUCCESS,
  BRANCH_LIST_FAIL,
  BRANCH_LIST_RESET,
} from '../constants/branchConstants';

export const branchNamesListReducer = (state = { branchList: [] }, action) => {
  switch (action.type) {
    case BRANCH_LIST_REQUEST:
      return { loadingBranchList: true };
    case BRANCH_LIST_SUCCESS:
      return { loadingBranchList: false, branchList: action.payload };
    case BRANCH_LIST_FAIL:
      return { loadingBranchList: false, errorBranchList: action.payload };
    case BRANCH_LIST_RESET:
      return {};
    default:
      return state;
  }
};
