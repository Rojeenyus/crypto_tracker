import React, { useState } from "react";
import Overview from "./Overview";
import Wallets from "./Wallets";
import "./Dashboard.css";
import Modal from "./Modal";
import Transactions from "./Transactions";

function Dashboard({
  setBody,
  setWalletNumber,
  loading,
  setLoading,
  setLoadPage,
  trigger,
  setTrigger,
}) {
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
          setLoadPage={setLoadPage}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}

      {modal ? (
        <Modal
          setModal={setModal}
          setLoading={setLoading}
          loading={loading}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
