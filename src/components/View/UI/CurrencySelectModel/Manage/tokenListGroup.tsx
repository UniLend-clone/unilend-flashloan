import { FC } from "react";
import { Card, ListGroup } from "react-bootstrap";
import Logo from "assets/circle_done.svg";
import settingsLogo from "assets/settings.svg";
interface Props {}

const TokenListGroup: FC<Props> = (props) => {
  return (
    <>
      <div className="list-container">
        <div className="token-group-card">
          <div className="token-list-card">
            <div className="row">
              <div className="col-2 px-0 curr-list">
                <img className="list-icon" src={Logo} alt="" />
              </div>
              <div className="col-7">
                <div className="row">
                  <h6 className="mb-0" style={{ textTransform: "uppercase" }}>
                    I am Name
                  </h6>
                </div>
                <div className="row">
                  <p className="mb-0 pr-1 list-desc">81 tokens</p>
                  <img className="desc-set" src={settingsLogo} alt="Settings" />
                </div>
              </div>
              <div className="col-3 p-0">
                {/* <button className="btn-radio">
                  <div className="radio-state">ON</div>
                  <span className="button-on"></span>
                </button> */}
                <button className="btn-radio">
                  <span className="button-off"></span>
                  <div className="radio-state">OFF</div>
                </button>
              </div>
              <Card className="token-detail-card">
                <Card.Header>v1.3.0</Card.Header>
                <Card.Body className="p-2">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://tokenlists.org/token-list?url=defi.cmc.eth"
                    className="sc-jKJlTe dWAPaj"
                  >
                    View list
                  </a>
                  <button>Remove list</button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenListGroup;
