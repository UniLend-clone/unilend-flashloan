import { ActionType } from "state/action-types";
import { PoolAction } from "state/actions/PoolA";

interface PoolState {
  poolName: any;
  assertAddress: any;
}

const initialState = {
  poolName: "uETH",
  assertAddress: "0xCdcBBa97476cDb0897edA2E8f64597D3D725d06A",
};

const PoolReducer = (state: PoolState = initialState, action: PoolAction) => {
  switch (action.type) {
    case ActionType.POOL_TOKEN_NAME:
      console.log(action);
      return { ...state, poolName: action.payload };
    case ActionType.ASSERT_ADDRESS:
      return { ...state, assertAddress: action.payload };
    default:
      return { ...state };
  }
};
export default PoolReducer;
