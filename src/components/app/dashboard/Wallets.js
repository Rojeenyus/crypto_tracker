import React, { useState, useEffect } from "react";
import "./Wallets.css";
import axios from "axios";
import Cookies from "js-cookie";

function Wallets({ setModal, setBody, setWalletNumber, modal, data, setData }) {
  let [remove, setRemove] = useState();
  let [trigger, setTrigger] = useState();
  const url = "https://crypto-tracker-ada97.herokuapp.com/wallets";

  useEffect(() => {
    let wallet = async () => {
      try {
        let headers = { headers: JSON.parse(Cookies.get("auth")) };
        const response = await axios.get(url, headers);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (modal === false) {
      wallet();
    }
  }, [modal, trigger]);

  useEffect(() => {
    if (remove) {
      let handleDelete = async () => {
        try {
          let headers = { headers: JSON.parse(Cookies.get("auth")) };
          const response = await axios.delete(`${url}/${remove}`, headers);
          setTrigger(!trigger);
        } catch (error) {
          console.log(error.response);
        }
      };
      handleDelete();
      setRemove();
    }
  }, [remove]);

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
                <div key={x.id} className="card border-primary">
                  <div className="card-header">{x.wallet_type}</div>
                  <div className="card-body text-primary">
                    <h5 className="card-title">Estimated Balance</h5>≈ $
                    {parseFloat(x.overall_worth).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    <h5 className="card-title">Estimated PnL</h5>≈ $
                    {parseFloat(x.overall_pnl).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className="btn"
                    style={{ color: "#01579b", textDecoration: "underline" }}
                    onClick={() => {
                      setBody("wallet");
                      setWalletNumber(x.id);
                    }}
                  >
                    go to wallet
                  </div>
                  <div
                    className="btn"
                    style={{ color: "red", textDecoration: "underline" }}
                    onClick={() => {
                      setRemove(x.id);
                    }}
                  >
                    remove
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
