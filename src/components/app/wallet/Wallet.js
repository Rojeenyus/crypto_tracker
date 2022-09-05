import React, { useState } from "react";
import Overview from "./Overview";
import ModalWallet from "./ModalWallet";
import Table from "./Table";

function Wallet({ setBody, walletNumber, loading, setLoading }) {
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
        <ModalWallet
          setModal={setModal}
          walletNumber={walletNumber}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Wallet;
