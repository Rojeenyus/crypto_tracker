import React, { useState, useEffect } from "react";
import "./Wallets.css";
import axios from "axios";
import Cookies from "js-cookie";

function Wallets({ setModal, setBody, setWalletNumber }) {
  let [data, setData] = useState();
  const url = "https://crypto-tracker-ada97.herokuapp.com/wallets";

  useEffect(() => {
    let wallet = async () => {
      try {
        let headers = { headers: JSON.parse(Cookies.get("auth")) };
        console.log("loading please wait");
        const response = await axios.get(url, headers);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    wallet();
  }, []);
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
      <div className="grid">
        {data
          ? data.map((x) => {
              return (
                <div
                  key={x.id}
                  className="card border-primary mb-3"
                  onClick={() => {
                    setBody("wallet");
                    setWalletNumber(x.id);
                  }}
                >
                  <div className="card-header">{x.wallet_type}</div>
                  <div className="card-body text-primary">
                    <h5 className="card-title">Estimated Balance</h5>≈ $
                    {x.overall_worth}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Wallets;
