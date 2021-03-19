import { Wallet } from "components/Helpers/Types";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from "../UI/ConnectWalletModal";

interface Props {
  amount: string;
  actionName: string;
  handleAmount: Function;
}

interface WalletConnectModal {
  show: boolean;
}

const MainButton: FC<Props> = ({ amount, actionName, handleAmount }) => {
  const {
    walletConnected,
    accounts: address,
    currentProvider,
    handleWalletConnect,
  } = useWalletConnect();

  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });
  const { isDepositApproved } = useTypedSelector((state) => state.deposit);
  const { donateIsApproved, donateContractAddress } = useTypedSelector(
    (state) => state.donate
  );
  const { depositApprove, donateApprove } = useActions();
  function handleMainButton() {
    if (
      address &&
      address.length &&
      walletConnected &&
      (isDepositApproved === true ||
        donateIsApproved === true ||
        (actionName !== "Deposit" && actionName !== "Reward"))
    ) {
      debugger;
      return (
        <button
          disabled={amount === ""}
          className="btn btn-lg btn-custom-primary"
          onClick={() => handleAmount()}
          type="button"
        >
          {actionName}
        </button>
      );
    } else if (
      address &&
      address.length &&
      walletConnected &&
      (isDepositApproved === false || isDepositApproved === undefined) &&
      (donateIsApproved === false || donateIsApproved === undefined) &&
      (actionName === "Deposit" || actionName === "Reward")
    ) {
      // debugger;
      let isApproving = localStorage.getItem("isApproving");
      let donateIsApproving = localStorage.getItem("donateApproval");
      return (
        <button
          disabled={
            (actionName === "Deposit" && isApproving === "true") ||
            (actionName === "Reward" && donateIsApproving === "true")
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => {
            if (actionName === "Deposit") {
              depositApprove(currentProvider, address[0]);
            } else if (actionName === "Reward") {
              donateApprove(currentProvider, address[0], donateContractAddress);
            }
          }}
          type="button"
        >
          {(actionName === "Deposit" && isApproving === "true") ||
          (actionName === "Reward" && donateIsApproving === "true") ? (
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

  return (
    <>
      <div className="d-grid py-3">{handleMainButton()}</div>

      {walletModalInfo.show && !walletConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo({ show: false })}
          handleWalletConnect={(wallet: Wallet) => handleWalletConnect(wallet)}
        />
      )}
    </>
  );
};

export default MainButton;
