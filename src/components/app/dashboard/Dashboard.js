import React, { useState } from "react";
import Overview from "./Overview";
import Wallets from "./Wallets";
import "./Dashboard.css";
import Modal from "./Modal";
import Transactions from "./Transactions";

function Dashboard({ setBody, setWalletNumber, loading, setLoading }) {
  let [modal, setModal] = useState(false);
  let [data, setData] = useState();
  let [transaction, setTransaction] = useState(false);
  return (
    <div>
      <Overview
        data={data}
        setTransaction={setTransaction}
        transaction={transaction}
      />
      {transaction ? (
        <Transactions />
      ) : (
        <Wallets
          setModal={setModal}
          setBody={setBody}
          setWalletNumber={setWalletNumber}
          modal={modal}
          data={data}
          setData={setData}
        />
      )}

      {modal ? (
        <Modal setModal={setModal} setLoading={setLoading} loading={loading} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
