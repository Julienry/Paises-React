function Pais({ nome, bandeira, setModal }) {
  return (
    <div className="pais" onClick={() => setModal(nome)}>
      <img className="pais__bandeira" src={bandeira} alt={nome} />
      <h1 className="pais__nome">{nome}</h1>
    </div>
  );
}

export default Pais;
