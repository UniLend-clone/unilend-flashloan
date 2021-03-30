import React, { FC, useEffect, useRef, useState } from "react";
import "./FieldCard.scss";
import dropdown from "../../../../assets/dropdown.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { floatRegExp } from "components/Helpers/index";
interface Props {
  fieldLabel: String;
  fieldValue: any;
  selectLabel: String;
  selectValue: String;
  selectedLogo: any;
  fieldType: string;
  setFieldValue: any;
  handleModelOpen: () => void;
  onF1Change: (e: any) => void;
}
const FieldCard: FC<Props> = (props) => {
  const field1: any = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const { theme, activeCurrency } = useTypedSelector((state) => state.settings);
  useEffect(() => {
    field1.current.value = props.fieldValue;
  }, [props.fieldValue]);
  const onHandleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputField = e.target.value;
    // if value is not blank, then test the regex
    if (inputField === "" || floatRegExp.test(inputField)) {
      props.onF1Change(e);
      // setInputValue(inputField);
    }
  };
  return (
    <>
      <div className={`${theme} card field-card`}>
        <div className="card-body py-2">
          <div className="row">
            <div className=" col-6 col-md-6">
              <label className="form-label">{props.fieldLabel}</label>
              <input
                type={props.fieldType}
                ref={field1}
                value={props.fieldValue}
                className="form-control field-input"
                placeholder="0.0"
                onChange={(e) => onHandleTelephoneChange(e)}
              />
            </div>
            <div className=" col-6 col-md-6">
              <div className="align-end">
                <label className="form-balance-label">
                  {props.selectLabel !== "" &&
                  activeCurrency.symbol !== "Select Token"
                    ? `Balance: ${props.selectLabel}`
                    : ""}
                </label>
              </div>
              <div className="align-end">
                {activeCurrency.symbol !== "Select Token" &&
                  props.selectLabel !== "" && (
                    <button
                      className="btn btn-max"
                      onClick={() => {
                        props.setFieldValue(props.selectLabel);
                      }}
                    >
                      <p className="max-text">MAX</p>
                    </button>
                  )}
                <button
                  className="btn btn-curr ml-4"
                  onClick={props.handleModelOpen}
                >
                  {activeCurrency.symbol !== "Select Token" && (
                    <img
                      className="curr-image"
                      src={props.selectedLogo}
                      alt="Curr"
                    />
                  )}
                  <p className="curr-text">{props.selectValue}</p>
                  <img
                    style={{ paddingLeft: "4px", width: "12px" }}
                    src={dropdown}
                    alt="Curr"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldCard;
