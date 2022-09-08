import React, { useState, useEffect } from "react";
import "./Transactions.css";
import axios from "axios";
import Cookies from "js-cookie";

function Transactions() {
  let [history, setHistory] = useState();
  let url = `https://crypto-tracker-ada97.herokuapp.com/all`;
  var m_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    let wallet = async () => {
      try {
        let headers = { headers: JSON.parse(Cookies.get("auth")) };
        const response = await axios.get(url, headers);
        setHistory(
          response.data.sort((a, b) => {
            return b.id - a.id;
          })
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    wallet();
  }, []);

  return (
    <div className="history">
      {history
        ? history.map((x) => {
            return (
              <div className="c-activity-list__item" key={x.id}>
                <div className="c-activity-list__date">
                  <div className="c-activity-list__month">
                    {m_names[parseInt(x.created_at.substring(5, 7)) - 1]}
                  </div>
                  <div className="c-activity-list__day">
                    {x.created_at.substring(8, 10)}
                  </div>
                </div>
                <div className="c-activity-list__meta">
                  <div className="c-activity-list__title">
                    <span className="red">
                      {" "}
                      {`${
                        x.quantity > 0 ? "Bought" : "Sold"
                      } ${x.symbol.toUpperCase()} for`}{" "}
                    </span>
                    <span className="c-activity-list__subtitle">
                      ${x.buy_price}
                    </span>
                  </div>
                </div>
                <div className="c-activity-list__amount is-outgoing">
                  {x.quantity > 0 ? (
                    <span className="positive">
                      + {`${x.quantity} ${x.symbol.toUpperCase()}`}
                    </span>
                  ) : (
                    <span className="negative">
                      - {`${x.quantity * -1} ${x.symbol.toUpperCase()}`}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Transactions;
