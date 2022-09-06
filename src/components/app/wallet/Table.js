import React, { useEffect, useState } from "react";
import "./Table.css";
import axios from "axios";
import ReactLoading from "react-loading";

function Table({
  setModal,
  walletNumber,
  modal,
  setOverall,
  setPnl,
  loading,
  setLoading,
}) {
  let [items, setItems] = useState([]);
  let [trigger, setTrigger] = useState(true);
  let arrayList = {};

  let url = `https://crypto-tracker-ada97.herokuapp.com/wallets/${walletNumber}/cryptocurrencies`;

  let final = (buy_price, symbol, price, quantity, id) => {
    arrayList = {
      buy_price: buy_price,
      symbol: symbol,
      price: price,
      quantity: quantity,
      id: id,
    };
  };

  const addItem = (arrayList) => {
    setItems((prevData) => {
      return [arrayList, ...prevData];
    });
  };

  useEffect(() => {
    let fetch = async () => {
      try {
        const response = await axios.get(url);
        setItems([]);
        let uniqueObjArray = [
          ...new Map(
            response.data.map((item) => [item["symbol"], item])
          ).values(),
        ];

        let money = uniqueObjArray.map((x) => {
          return response.data.filter((data) => {
            return data.symbol === x.symbol;
          });
        });

        let qty = money.map((x) => {
          return x
            .map((y) => {
              return parseFloat(y.quantity);
            })
            .reduce((a, b) => {
              return a + b;
            });
        });

        let total = money.map((x) => {
          return x
            .map((y) => {
              return y.buy_price * y.quantity;
            })
            .reduce((a, b) => {
              return a + b;
            });
        });

        let symbol = money.map((x) => {
          return x
            .map((y) => {
              return y.symbol;
            })
            .reduce((a, b) => {
              return a;
            });
        });

        let id = money.map((x) => {
          return x
            .map((y) => {
              return y.id;
            })
            .reduce((a, b) => {
              return a;
            });
        });

        let price = money.map((x) => {
          return x
            .map((y) => {
              return y.price;
            })
            .reduce((a, b) => {
              return a;
            });
        });

        for (let x = 0; x < total.length; x++) {
          let a = total[x] / qty[x];
          final(a, symbol[x], price[x], qty[x], id[x]);
          addItem(arrayList);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetch();
  }, [trigger, modal]);

  useEffect(() => {
    if (items !== undefined) {
      let a = 0;
      items.map((x) => {
        return (a = a + x.quantity * x.price);
      });
      setOverall(a);

      let b = 0;
      items.map((x) => {
        return (b = b + x.quantity * x.price - x.quantity * x.buy_price);
      });
      setPnl(b);
    }
  }, [items]);

  let handleRemove = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${url}/${id}`);
      setTrigger(!trigger);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  return (
    <div className="css-14w9sv9">
      <div className="css-74d07z">
        <div className="css-1x0mdq">
          <div data-bn-type="text" className="css-1lzhfdj">
            Holdings
          </div>
          <div className="css-ho61tr">
            <button
              onClick={() => {
                setModal(true);
              }}
              className="btn btn-primary"
            >
              + Crypto
            </button>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">Average buy price</th>
            <th scope="col" className="hide">
              Current Price
            </th>
            <th scope="col" className="hide">
              Current Holdings
            </th>
            <th scope="col">Total Value</th>
            <th scope="col">PNL</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {items
            ? items.map((x) => {
                return (
                  <tr key={x.symbol}>
                    <th scope="row">{x.symbol.toUpperCase()}</th>
                    <td>
                      $
                      {x.buy_price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="hide">
                      $
                      {x.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="hide">
                      {x.quantity.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {(x.quantity * x.price).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      $
                      {(
                        x.quantity * x.price -
                        x.quantity * x.buy_price
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td>
                      {loading ? (
                        <button className="btn btn-remove" disabled={true}>
                          <ReactLoading
                            type="spin"
                            height={"16px"}
                            width={"16px"}
                          />
                        </button>
                      ) : (
                        <button
                          className="btn btn-remove"
                          onClick={() => {
                            handleRemove(x.id);
                          }}
                        >
                          remove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
