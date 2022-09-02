import React, { useEffect } from "react";
import "./Wallets.css";

function Wallets({ setModal }) {
  //   useEffect(async () => {}, []);
  return (
    <div className="css-14w9sv9">
      <div className="css-74d07z">
        <div className="css-1x0mdq">
          <div data-bn-type="text" className="css-1lzhfdj">
            Wallets
          </div>
          <div className="css-ho61tr">
            <button
              onClick={() => {
                setModal(true);
              }}
              className="btn btn-primary"
            >
              + Wallet
            </button>
          </div>
        </div>
      </div>
      <div className="card border-primary mb-3">
        <div className="card-header">Binance</div>
        <div className="card-body text-primary">
          <h5 className="card-title">Estimated Balance</h5>≈ $114,923.04
        </div>
      </div>
    </div>
  );
}

export default Wallets;
