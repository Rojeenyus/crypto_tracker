import React, { useState } from "react";
import Overview from "./Overview";
import Wallets from "./Wallets";
import "./Dashboard.css";
import Modal from "./Modal";

function Dashboard({ setBody, setWalletNumber, loading, setLoading }) {
  let [modal, setModal] = useState(false);
  let [data, setData] = useState();
  return (
    <div>
      <Overview data={data} />
      <Wallets
        setModal={setModal}
        setBody={setBody}
        setWalletNumber={setWalletNumber}
        modal={modal}
        data={data}
        setData={setData}
      />
      {modal ? (
        <Modal setModal={setModal} setLoading={setLoading} loading={loading} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
