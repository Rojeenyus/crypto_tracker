import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

function Modal({ setModal, loading, setLoading }) {
  let data = {};
  const url = "https://crypto-tracker-ada97.herokuapp.com/wallets";
  let [input, setInput] = useState("");
  function wallet(input) {
    data = {
      wallet: {
        wallet_type: input,
      },
    };
  }
  let handleSubmit = async () => {
    setLoading(true);
    wallet(input);
    let headers = { headers: JSON.parse(Cookies.get("auth")) };
    try {
      await axios.post(url, data, headers);
      setModal(false);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  return (
    <div className="modal c-modal">
      <div className="c-panel c-panel--default c-modal__inner">
        <div
          className="ui-panel--modal__close"
          onClick={() => {
            setModal(false);
          }}
        >
          &#10006;
        </div>
        <div className="c-panel__titles">
          <div className="c-panel__title c-modal__title">Create Wallet</div>
        </div>
        <div className="c-panel__body">
          <div className="js-transition-to-left-right liquid-container">
            <div className="j-field">
              <label> Wallet Name </label>
              <div className="contacts-search">
                <div className="contacts-search__input-container">
                  <input
                    placeholder="Metamask (eth chain) / Binance"
                    type="text"
                    className="contacts-search__input ember-text-field input-send"
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="c-panel__footer">
            {loading ? (
              <button
                className="btn btn-primary c-panel__btn"
                disabled={true}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ReactLoading type="spin" height={"20px"} width={"20px"} />
              </button>
            ) : (
              <button
                className="btn btn-primary c-panel__btn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
