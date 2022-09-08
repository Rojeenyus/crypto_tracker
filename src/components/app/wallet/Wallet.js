import React, { useState } from "react";
import Overview from "./Overview";
import ModalWallet from "./ModalWallet";
import Table from "./Table";
import TradeModal from "./TradeModal";

function Wallet({ setBody, walletNumber, loading, setLoading, setLoadPage }) {
  let [modal, setModal] = useState(false);
  let [modalTrade, setModalTrade] = useState(false);
  let [overall, setOverall] = useState();
  let [pnl, setPnl] = useState();
  let [coinTrade, setCoinTrade] = useState();
  let [items, setItems] = useState([]);
  let [trigger, setTrigger] = useState(true);
  return (
    <>
      <Overview pnl={pnl} overall={overall} setBody={setBody} />
      <Table
        setModal={setModal}
        walletNumber={walletNumber}
        modal={modal}
        setOverall={setOverall}
        setPnl={setPnl}
        loading={loading}
        setLoading={setLoading}
        setModalTrade={setModalTrade}
        setCoinTrade={setCoinTrade}
        modalTrade={modalTrade}
        items={items}
        setItems={setItems}
        trigger={trigger}
        setTrigger={setTrigger}
        setLoadPage={setLoadPage}
      />
      {modal ? (
        <ModalWallet
          setModal={setModal}
          walletNumber={walletNumber}
          loading={loading}
          setLoading={setLoading}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      ) : (
        ""
      )}
      {modalTrade ? (
        <TradeModal
          setModalTrade={setModalTrade}
          loading={loading}
          setLoading={setLoading}
          coinTrade={coinTrade}
          walletNumber={walletNumber}
          items={items}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Wallet;
