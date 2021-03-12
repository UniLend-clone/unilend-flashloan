import { ActionType } from "../action-types";

interface AccountBalance {
  type: ActionType.ACCOUNT_BALANCE;
  payload: string;
}

interface CurrentProvider {
  type: ActionType.CURRENT_PROVIDER;
  payload: string;
}
interface ConnectWalletAction {
  type: ActionType.CONNECT_WALLET;
}

interface ConnectWalletSuccessAction {
  type: ActionType.CONNECT_WALLET_SUCCESS;
  payload: string[];
}

interface ConnectWalletErrorAction {
  type: ActionType.CONNECT_WALLET_ERROR;
  payload: string;
}

export type Action =
  | CurrentProvider
  | ConnectWalletAction
  | ConnectWalletSuccessAction
  | ConnectWalletErrorAction
  | AccountBalance;
