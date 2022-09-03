import React, { useState } from "react";
import Overview from "./Overview";
import ModalWallet from "./ModalWallet";
import Table from "./Table";

function Wallet({ setBody, walletNumber }) {
  let [modal, setModal] = useState(false);
  let [overall, setOverall] = useState();
  let [pnl, setPnl] = useState();
  return (
    <>
      <Overview pnl={pnl} overall={overall} setBody={setBody} />
      <Table
        setModal={setModal}
        walletNumber={walletNumber}
        modal={modal}
        setOverall={setOverall}
        setPnl={setPnl}
      />
      {modal ? (
        <ModalWallet setModal={setModal} walletNumber={walletNumber} />
      ) : (
        ""
      )}
    </>
  );
}

export default Wallet;
