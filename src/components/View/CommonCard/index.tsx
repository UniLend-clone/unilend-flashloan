import React, { useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";

interface props {
  activeTab: string;
}

interface ModalType {
  fieldName: string;
  show: boolean;
  currency?: string;
}

const CommonCard = (props: props) => {
  const { activeTab } = props;

  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    fieldName: "",
    show: false,
    currency: "ht",
  });
  const { handleDeposit, handleRedeem } = useActions();
  const { walletConnected, accounts, handleWalletConnect } = useWalletConnect();

  const handleAmount = () => {
    console.log(amount);
    switch (activeTab) {
      case "deposit":
        handleDeposit(amount, accounts[0]);
        break;
      case "redeem":
        handleRedeem(amount, accounts[0]);
        break;
      case "donate":
        // const fullAmount = web3.utils.toWei(redeemAmount, "ether");

        // let address;
        // FlashloanLBCore.methods
        //   .getDonationContract()
        //   .call((error: any, result: any) => {
        //     if (!error && result) {
        //       console.log(result);
        //       address = result;
        //     } else {
        //       console.log(error);
        //     }
        //   });
        // UnilendFDonation.methods.donate(address, fullAmount).send({
        //   from: accounts[0],
        // });
        break;
      case "airdrop":
        break;
      default:
        break;
    }
  };

  const handleModal = (field: string, show: boolean, currency?: string) => {
    setModalInfo({
      fieldName: field,
      show,
      currency: currency ? currency : modalInfo.currency,
    });
  };

  const handleMainButton = () => {
    if (accounts && accounts.length && walletConnected) {
      return (
        <button
          disabled={!amount}
          className="btn btn-lg btn-custom-primary"
          onClick={handleAmount}
          type="button"
        >
          {capitalize(activeTab)}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={handleWalletConnect}
        >
          Connect Wallet
        </button>
      );
    }
  };

  return (
    <>
      <ContentCard title={`${capitalize(activeTab)}`}>
        <div className="swap-root">
          <FieldCard
            onF1Change={(e) => setAmount(e.target.value)}
            handleModelOpen={() => handleModal(activeTab, true)}
            fieldLabel="Amount"
            fieldValue={amount}
            fieldType="text"
            selectLabel={``}
            selectValue={modalInfo.currency ? modalInfo.currency : ""}
          />
          <div className="d-grid py-3">{handleMainButton()}</div>
          {activeTab === "deposit" && (
            <div className="price_head">
              <div className="price_aa">
                <div className="price-list">
                  Pool percentage <span className="price">-</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContentCard>
      {modalInfo.show && (
        <CurrencySelectModel
          currFieldName={modalInfo.fieldName}
          handleCurrChange={(selectedcrr) =>
            handleModal(activeTab, false, selectedcrr)
          }
          handleClose={() => handleModal("", false)}
        />
      )}
    </>
  );
};

export default CommonCard;
