import React, { useState } from "react";
import Overview from "./Overview";
import Wallets from "./Wallets";
import "./Dashboard.css";
import Modal from "./Modal";

function Dashboard({ setBody, setWalletNumber }) {
  let [modal, setModal] = useState(false);
  return (
    <div>
      <Overview />
      <Wallets
        setModal={setModal}
        setBody={setBody}
        setWalletNumber={setWalletNumber}
      />
      {modal ? <Modal setModal={setModal} /> : ""}
    </div>
  );
}

export default Dashboard;
