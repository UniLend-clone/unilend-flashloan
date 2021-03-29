import { Wallet } from "components/Helpers/Types";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from "../UI/ConnectWalletModal";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";

interface Props {
  isEth: boolean;
  decimal: any;
  amount: string;
  actionName: string;
  handleAmount: Function;
}

interface WalletConnectModal {
  show: boolean;
}

interface TransModalInfo {
  show: boolean;
}

const MainButton: FC<Props> = ({
  isEth,
  amount,
  actionName,
  handleAmount,
  decimal,
}) => {
  const {
    walletConnected,
    accounts: address,
    currentProvider,
    poolTokenBalance,
    handleWalletConnect,
  } = useWalletConnect();

  // const [isApproving, setIsApproving] = useState<string | null>(
  //   localStorage.getItem("isApproving")
  // );
  // const [donateIsApproving, setDonateIsApproving] = useState<string | null>(
  //   localStorage.getItem("donateApproval")
  // );

  // function updateApproval() {
  //   setIsApproving(localStorage.getItem("isApproving"));
  //   setDonateIsApproving(localStorage.getItem("donateApproval"));
  // }

  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });

  const [transModalInfo, setTransModalInfo] = useState<TransModalInfo>({
    show: false,
  });

  const {
    isDepositApproved,
    depositLoading,
    depositErrorMessage,
    depositAllowanceLoading,
    depositIsApproving,
  } = useTypedSelector((state) => state.deposit);
  const {
    donateIsApproved,
    donateContractAddress,
    donateLoading,
    donateAllowanceLoading,
    donateApproving,
  } = useTypedSelector((state) => state.donate);
  const { airdropLoading } = useTypedSelector((state) => state.airdrop);
  const { redeemLoading } = useTypedSelector((state) => state.redeem);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { assertAddress } = useTypedSelector((state) => state.pool);
  const { activeTab, activeCurrency } = useTypedSelector(
    (state) => state.settings
  );
  const {
    depositApprove,
    donateApprove,
    getAccountBalance,
    getPoolTokenBalance,
    getUserTokenBalance,
  } = useActions();
  // useEffect(() => {
  //   updateApproval();
  // });

  const handleTokenBalance = () => {
    if (address.length && currentProvider) {
      getAccountBalance(address[0]);
      getUserTokenBalance(
        currentProvider,
        address[0],
        receipentAddress,
        decimal
      );
      getPoolTokenBalance(
        currentProvider,
        address[0],
        assertAddress,
        receipentAddress,
        decimal
      );
    }
  };
  useEffect(() => {
    handleTokenBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositLoading, donateLoading, redeemLoading, airdropLoading]);
  function handleMainButton() {
    if (
      address &&
      address.length &&
      walletConnected &&
      (activeCurrency.symbol === "Select Token" ||
        depositAllowanceLoading ||
        donateAllowanceLoading ||
        (actionName === "Lend" && isDepositApproved === true) ||
        (actionName === "Reward" && donateIsApproved === true) ||
        (actionName !== "Lend" && actionName !== "Reward"))
    ) {
      return (
        <button
          disabled={
            amount === "" ||
            activeCurrency.symbol === "Select Token" ||
            depositLoading ||
            donateLoading ||
            redeemLoading ||
            airdropLoading ||
            depositAllowanceLoading ||
            donateAllowanceLoading ||
            (activeTab === "redeem" && poolTokenBalance === 0)
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => handleAmount()}
          type="button"
        >
          <div>
            {actionName}
            {(depositLoading ||
              donateLoading ||
              redeemLoading ||
              airdropLoading ||
              depositAllowanceLoading ||
              donateAllowanceLoading) && (
              <div className="spinner-border approve-loader" role="status">
                <span className="sr-only">Approving...</span>
              </div>
            )}
          </div>
        </button>
      );
    } else if (
      address &&
      address.length &&
      walletConnected &&
      !depositAllowanceLoading &&
      !donateAllowanceLoading &&
      !isEth &&
      ((actionName === "Lend" &&
        (isDepositApproved === false || isDepositApproved === undefined)) ||
        (actionName === "Reward" &&
          (donateIsApproved === false || donateIsApproved === undefined))) &&
      (actionName === "Lend" || actionName === "Reward")
    ) {
      // debugger;
      return (
        <button
          disabled={
            (actionName === "Lend" && depositIsApproving === true) ||
            (actionName === "Reward" && donateApproving === true)
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => {
            if (actionName === "Lend") {
              depositApprove(currentProvider, address[0], receipentAddress);
            } else if (actionName === "Reward") {
              donateApprove(
                currentProvider,
                address[0],
                donateContractAddress,
                receipentAddress
              );
            }
          }}
          type="button"
        >
          {(actionName === "Lend" && depositIsApproving === true) ||
          (actionName === "Reward" && donateApproving === true) ? (
            <div>
              Approving
              <div className="spinner-border approve-loader" role="status">
                <span className="sr-only">Approving...</span>
              </div>
            </div>
          ) : (
            "Approve"
          )}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={walletConnect}
        >
          Connect Wallet
        </button>
      );
    }
  }

  function walletConnect() {
    setWalletModalInfo({
      show: true,
    });
  }
  function handleTransClose() {
    setTransModalInfo({
      show: false,
    });
  }
  return (
    <>
      <div className="d-grid py-3">{handleMainButton()}</div>

      {walletModalInfo.show && !walletConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo({ show: false })}
          handleWalletConnect={(wallet: Wallet) => handleWalletConnect(wallet)}
        />
      )}
      {depositErrorMessage !== "" && (
        <Alert variant="danger">{depositErrorMessage}</Alert>
      )}
      {transModalInfo.show && (
        <TransactionPopup mode="success" handleClose={handleTransClose} />
      )}
    </>
  );
};

export default MainButton;
