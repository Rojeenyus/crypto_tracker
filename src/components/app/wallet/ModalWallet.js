import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ModalWallet.css";

function ModalWallet({ setModal, walletNumber }) {
  let [coin, setCoin] = useState("");
  let [price, setPrice] = useState(0);
  let [quantity, setQuantity] = useState(0);
  let [datas, setDatas] = useState();
  let data = {};
  const cgurl = `https://api.coingecko.com/api/v3/search?query=${coin.toLowerCase()}`;
  let url = `https://crypto-tracker-ada97.herokuapp.com/wallets/${walletNumber}/cryptocurrencies`;

  function input(coin, price, quantity) {
    data = {
      cryptocurrency: { symbol: coin, buy_price: price, quantity: quantity },
    };
  }

  useEffect(() => {
    let fetch = async () => {
      try {
        const response = await axios.get(cgurl);
        setDatas(response.data.coins.slice(0, 5));
      } catch (error) {
        console.log(error.response);
      }
    };
    if (coin) fetch();
  }, [coin]);

  let handleSubmit = async () => {
    input(coin, price, quantity);
    let headers = { headers: JSON.parse(Cookies.get("auth")) };
    console.log("loading please wait");
    try {
      const response = await axios.post(url, data, headers);
      console.log(response);
      setModal(false);
    } catch (error) {
      console.log(error.response);
      setModal(false);
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
          <div className="c-panel__title c-modal__title">Add Crypto</div>
        </div>
        <div className="c-panel__body">
          <div className="js-transition-to-left-right liquid-container">
            <div className="j-field">
              <label> Coin Symbol </label>
              <div className="contacts-search">
                <div className="contacts-search__input-container">
                  <input
                    placeholder="BTC"
                    type="text"
                    className="contacts-search__input ember-text-field input-send"
                    onChange={(e) => setCoin(e.target.value)}
                    value={coin}
                    required
                  />
                </div>
              </div>
              <div className="sc-papXJ kWuNbq">
                <div className="sc-jqUVSM gqFjCn">
                  {datas
                    ? datas.map((x) => {
                        return (
                          <div
                            className="sc-kDDrLX jhtvXR"
                            key={x.id}
                            onClick={() => {
                              setCoin(x.symbol);
                              setDatas("");
                            }}
                          >
                            {x.symbol}
                            {` (${x.name})`}
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
            <div className="j-field">
              <label> Buy Price </label>
              <div className="contacts-search">
                <div className="contacts-search__input-container">
                  <input
                    placeholder="0.00"
                    type="number"
                    step="0.00001"
                    className="contacts-search__input ember-text-field input-send"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="j-field">
              <label> Quantity </label>
              <div className="contacts-search">
                <div className="contacts-search__input-container">
                  <input
                    placeholder="0.00"
                    type="number"
                    step="0.00001"
                    className="contacts-search__input ember-text-field input-send"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="c-panel__footer">
            <button
              className="btn btn-primary c-panel__btn"
              onClick={() => {
                handleSubmit();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalWallet;
