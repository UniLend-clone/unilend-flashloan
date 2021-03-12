import React, { useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
import ConnectWalletModal from "../UI/ConnectWalletModal";

interface props {
  activeTab: string | null;
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
  const { handleDeposit, handleRedeem, handleDonate } = useActions();
  const { accounts, currentProvider, handleWalletConnect } = useWalletConnect();

  const handleAmount = () => {
    switch (activeTab) {
      case "deposit":
        handleDeposit(currentProvider, amount, accounts[0]);
        break;
      case "redeem":
        handleRedeem(currentProvider, amount, accounts[0]);
        break;
      case "reward":
        handleDonate(currentProvider, amount, accounts[0]);
        break;
      case "airdrop":
        break;
      default:
        break;
    }
    setAmount("");
  };

  const handleModal = (field: string, show: boolean, currency?: string) => {
    setModalInfo({
      fieldName: field,
      show,
      currency: currency ? currency : modalInfo.currency,
    });
  };
  const walletConnect = () => {
    handleWalletConnect();
  };
  return (
    <>
      {activeTab && (
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
            <MainButton
              amount={amount}
              actionName={`${capitalize(activeTab)}`}
              handleAmount={() => handleAmount()}
            />
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
      )}
      {modalInfo.show && activeTab && (
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
