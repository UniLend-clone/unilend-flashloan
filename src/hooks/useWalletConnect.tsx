import { Wallet } from "components/Helpers/Types";
import { useCallback } from "react";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export default function useWalletConnect() {
  const {
    walletConnected,
    accounts,
    loading,
    currentProvider,
    userTokenBalance,
    accountBalance,
    poolTokenBalance,
    poolLiquidity,
    rewardPoolBalance,
    rewardReleaseRate,
    totalDepositedTokens,
    walletProvider,
    connectedWallet,
    totalTokensInRewardPool,
    selectedNetworkId,
    fullUserTokenBalance,
    fullPoolTokenBalance,
    activeNetWork,
    currentApy,
    networkId,
  } = useTypedSelector((state) => state.connectWallet);

  const {
    connectWalletAction,
    getUserTokenBalance,
    getPoolLiquidity,
  } = useActions();
  const handleWalletConnect = useCallback(
    (wallet?: Wallet) => {
      console.log("CONNECTING WALLET");
      if (wallet) {
        connectWalletAction(selectedNetworkId, wallet);
      } else {
        connectWalletAction(selectedNetworkId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletConnected, selectedNetworkId]
  );

  return {
    walletConnected,
    accounts,
    loading,
    currentProvider,
    userTokenBalance,
    accountBalance,
    poolTokenBalance,
    poolLiquidity,
    selectedNetworkId,
    rewardPoolBalance,
    rewardReleaseRate,
    activeNetWork,
    walletProvider,
    connectedWallet,
    networkId,

    fullUserTokenBalance,
    fullPoolTokenBalance,
    currentApy,
    totalDepositedTokens,
    totalTokensInRewardPool,
    handleWalletConnect,
    getUserTokenBalance,
    getPoolLiquidity,
  };
}
