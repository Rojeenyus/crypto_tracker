import React from "react";
import "./Overview.css";

function Overview() {
  return (
    <div className="css-14w9sv9">
      <div className="css-74d07z">
        <div className="css-1x0mdq">
          <div data-bn-type="text" className="css-1lzhfdj">
            Estimated Balance
          </div>
          <div className="css-ho61tr">
            <button
              data-bn-type="button"
              id="dashboard_top_buy-crypto"
              className="btn btn-secondary"
            >
              Transactions
            </button>
          </div>
        </div>
        <div data-bn-type="text" className="css-8jsrjd">
          ≈ $114,923.04
        </div>
      </div>
      <div className="css-1is1v4y">
        <div className="css-r1mb0r">
          <div className="css-gkju6w">
            <div data-bn-type="text" className="css-mhsf5v">
              Crypto balance
            </div>
          </div>
          <div className="css-fcqrul">
            <div className="css-1iivh6i">
              <div data-bn-type="text" className="css-xsje34">
                ≈ $114,923.04
              </div>
            </div>
            <div data-bn-type="text" className="css-1cukg4k">
              {" "}
              ~ 100%
            </div>
          </div>
        </div>
        <div className="css-r1mb0r">
          <div className="css-gkju6w">
            <div data-bn-type="text" className="css-mhsf5v">
              Stablecoin balance
            </div>
          </div>
          <div className="css-fcqrul">
            <div className="css-1iivh6i">
              <div data-bn-type="text" className="css-xsje34">
                ≈ $0.00000000
              </div>
            </div>
            <div data-bn-type="text" className="css-1cukg4k">
              {" "}
              ~ 0%
            </div>
          </div>
        </div>
        <div className="css-r1mb0r">
          <div className="css-gkju6w">
            <div data-bn-type="text" className="css-mhsf5v">
              PNL
            </div>
          </div>
          <div className="css-fcqrul">
            <div className="css-1iivh6i">
              <div data-bn-type="text" className="css-xsje34">
                +$85.1
              </div>
            </div>
            <div data-bn-type="text" className="css-1cukg4k">
              +7.2%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
