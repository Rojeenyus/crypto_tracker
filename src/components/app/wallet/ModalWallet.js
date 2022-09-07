import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./ModalWallet.css";
import ReactLoading from "react-loading";

function ModalWallet({
  setModal,
  walletNumber,
  loading,
  setLoading,
  trigger,
  setTrigger,
}) {
  let [coin, setCoin] = useState("");
  let [price, setPrice] = useState();
  let [quantity, setQuantity] = useState();
  let [datas, setDatas] = useState();
  const [error, setError] = useState();
  const [error2, setError2] = useState(false);
  let [nofetch, setNoFetch] = useState(false);
  let [dataPrice, setDataPrice] = useState();
  let data = {};
  const cgurl = `https://api.coingecko.com/api/v3/search?query=${coin.toLowerCase()}`;
  let url = `https://crypto-tracker-ada97.herokuapp.com/wallets/${walletNumber}/cryptocurrencies`;
  let priceurl = `https://api.coingecko.com/api/v3/simple/price?ids=${
    dataPrice ? dataPrice[0].id : ""
  }&vs_currencies=usd`;

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
        setDataPrice(response.data.coins.slice(0, 1));
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
    input(coin, price, quantity);
    let headers = { headers: JSON.parse(Cookies.get("auth")) };
    try {
      await axios.post(url, data, headers);
      setTrigger(!trigger);
      setModal(false);
      setLoading(false);
      setError2(false);
    } catch (error) {
      setError(Object.values(error.response.data)[0]);
      setError2(true);
      setLoading(false);
    }
  };

  let handleSetPrice = async () => {
    let fetch = async () => {
      try {
        const response = await axios.get(priceurl);
        console.log(response);
        setPrice(Object.values(response.data)[0].usd);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (coin) {
      fetch();
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
                    placeholder="ex: BTC"
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
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                  />
                  <div
                    className="set-price"
                    onClick={() => {
                      handleSetPrice();
                    }}
                  >
                    set current price
                  </div>
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
                  {error2 ? <div style={{ color: "red" }}>{error[0]}</div> : ""}
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

export default ModalWallet;
