import React, { useState } from "react";
import Overview from "./Overview";
import ModalWallet from "./ModalWallet";
import Table from "./Table";
import TradeModal from "./TradeModal";

function Wallet({ setBody, walletNumber, loading, setLoading }) {
  let [modal, setModal] = useState(false);
  let [modalTrade, setModalTrade] = useState(false);
  let [overall, setOverall] = useState();
  let [pnl, setPnl] = useState();
  let [coinTrade, setCoinTrade] = useState();
  let [items, setItems] = useState([]);
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
      {modalTrade ? (
        <TradeModal
          setModalTrade={setModalTrade}
          loading={loading}
          setLoading={setLoading}
          coinTrade={coinTrade}
          walletNumber={walletNumber}
          items={items}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Wallet;
