import { Action } from "state/actions/connectWalletA";
import { ActionType } from "../action-types";

interface ConnectWalletState {
  loading: boolean;
  error: string | null;
  data: string[];
  walletConnected: boolean;
  accounts: string[];
  accountBalance: string;
  currentProvider: string;
  selectedNetworkId: number;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  walletConnected: false,
  accounts: [],
  accountBalance: "0",
  currentProvider: "",
  selectedNetworkId: 1
};

const connectWalletReducer = (
  state: ConnectWalletState = initialState,
  action: Action
): ConnectWalletState => {
  switch (action.type) {
    case ActionType.ACCOUNT_BALANCE:
      return { ...state };
    case ActionType.CURRENT_PROVIDER:
      return { ...state, currentProvider: action.payload };
    case ActionType.CONNECT_WALLET:
      return { ...state, loading: true, walletConnected: false };
    case ActionType.CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
        walletConnected: true,
        error: null,
      };
    case ActionType.CONNECT_WALLET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
        walletConnected: false,
      };
    case ActionType.SELECTED_NETWORK_ID:
      return {
        ...state,
        selectedNetworkId: action.networkId ? action.networkId : 1
      }
    default:
      return state;
  }
};
export default connectWalletReducer;
