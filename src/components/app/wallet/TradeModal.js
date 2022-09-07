import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import "./TradeModal.css";
import axios from "axios";
import Cookies from "js-cookie";

function TradeModal({
  loading,
  setLoading,
  setModalTrade,
  coinTrade,
  walletNumber,
  items,
}) {
  let [coin, setCoin] = useState("");
  let [sellPrice, setSellPrice] = useState();
  let [buyPrice, setBuyPrice] = useState();
  let [sellQuantity, setSellQuantity] = useState(0);
  let [buyQuantity, setBuyQuantity] = useState();
  let [datas, setDatas] = useState();
  let [nofetch, setNoFetch] = useState(false);
  let [errorQty, setErrorQty] = useState();
  const cgurl = `https://api.coingecko.com/api/v3/search?query=${coin.toLowerCase()}`;
  let url = `https://crypto-tracker-ada97.herokuapp.com/wallets/${walletNumber}/cryptocurrencies`;
  let data = {};
  let headers = { headers: JSON.parse(Cookies.get("auth")) };

  function input(coin, price, quantity) {
    data = {
      cryptocurrency: { symbol: coin, buy_price: price, quantity: quantity },
    };
  }

  useEffect(() => {
    if (
      items.find((x) => {
        return x.symbol === coinTrade.toLowerCase();
      }).quantity < sellQuantity
    ) {
      setErrorQty("You don't have enough balance");
    } else {
      setErrorQty("");
    }
    if (sellPrice && buyPrice && sellQuantity) {
      setBuyQuantity((sellPrice * sellQuantity) / buyPrice);
    }
  }, [sellPrice, buyPrice, sellQuantity]);

  useEffect(() => {
    let fetch = async () => {
      try {
        const response = await axios.get(cgurl);
        setDatas(response.data.coins.slice(0, 5));
      } catch (error) {
        console.log(error.response);
      }
    };
    if (coin && nofetch === false) {
      fetch();
    }
  }, [cgurl, coin]);

  let handleSubmit = async () => {
    setLoading(true);
    input(coinTrade, sellPrice, sellQuantity * -1);
    try {
      let response = await axios.post(url, data, headers);
      console.log(response);
      handleSubmit2();
    } catch (error) {
      // setError(Object.values(error.response.data)[0]);
      // setError2(true);
      setLoading(false);
      console.log(error.response);
    }
  };

  let handleSubmit2 = async () => {
    input(coin, buyPrice, buyQuantity);
    try {
      let response = await axios.post(url, data, headers);
      console.log(response);
      setModalTrade(false);
      setLoading(false);
      // setError2(false);
    } catch (error) {
      // setError(Object.values(error.response.data)[0]);
      // setError2(true);
      setLoading(false);
      console.log(error.response);
    }
  };

  return (
    <div className="modal c-modal">
      <div className="c-panel c-panel--default c-modal__inner">
        <div
          className="ui-panel--modal__close"
          onClick={() => {
            setModalTrade(false);
          }}
        >
          &#10006;
        </div>
        <div className="c-panel__titles">
          <div className="c-panel__title c-modal__title">Swap Crypto</div>
        </div>
        <div className="c-panel__body">
          <div className="js-transition-to-left-right liquid-container flex">
            <div>
              <div className="j-field">
                <label> Coin Symbol </label>
                <div className="contacts-search">
                  <div className="contacts-search__input-container">
                    <input
                      type="text"
                      className="contacts-search__input ember-text-field input-send"
                      value={coinTrade}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="j-field">
                <label> Sell Price </label>
                <div className="contacts-search">
                  <div className="contacts-search__input-container">
                    <input
                      placeholder="0.00"
                      type="number"
                      step="0.00001"
                      className="contacts-search__input ember-text-field input-send"
                      onChange={(e) => setSellPrice(e.target.value)}
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
                      onChange={(e) => setSellQuantity(e.target.value)}
                      required
                    />
                    {/* {error2 ? <div style={{ color: "red" }}>{error[0]}</div> : ""} */}
                    <div style={{ color: "red" }}>{errorQty}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="middle">&rarr;</div>
            <div>
              <div className="j-field">
                <label> Coin Symbol </label>
                <div className="contacts-search">
                  <div className="contacts-search__input-container">
                    <input
                      placeholder="ex: USDT"
                      type="text"
                      className="contacts-search__input ember-text-field input-send"
                      onChange={(e) => {
                        setCoin(e.target.value);
                        setNoFetch(false);
                      }}
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
                                setNoFetch(true);
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
                      onChange={(e) => setBuyPrice(e.target.value)}
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
                      value={buyQuantity}
                      readOnly
                    />
                  </div>
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
            ) : coin && buyQuantity && errorQty === "" ? (
              <button
                className="btn btn-primary c-panel__btn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Swap
              </button>
            ) : (
              <button className="btn c-panel__btn" style={{ cursor: "none" }}>
                Swap
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
