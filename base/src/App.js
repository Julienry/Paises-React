import "./App.css";
import { useState, useEffect } from "react";
import btnDelete from "./assets/delete.svg";

import Pais from "./componentes/Pais";
import PaisModal from "./componentes/PaisModal";

function App() {
  const [paises, setPaises] = useState([]);
  const [paisesSrc, setPaisesSrc] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [modal, setModal] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3/all")
      .then((resposta) => resposta.json())
      .then((data) => {
        setPaises(data);
        setPaisesSrc(data);
      });
  }, []);

  useEffect(() => {
    if (!pesquisa) {
      setPaisesSrc(paises);
      return;
    }

    setPaisesSrc(
      paises.filter((pais) => {
        return (
          pais.name.common
            .toLowerCase()
            .includes(pesquisa.trim().trim().toLowerCase()) ||
          pais.name.official
            .toLowerCase()
            .includes(pesquisa.trim().toLowerCase()) ||
          (pais.cca2 &&
            pais.cca2.toLowerCase().includes(pesquisa.trim().toLowerCase())) ||
          (pais.cca3 &&
            pais.cca3.toLowerCase().includes(pesquisa.trim().toLowerCase())) ||
          (pais.translations.por &&
            pais.translations.por.common
              .toLowerCase()
              .includes(pesquisa.trim().toLowerCase())) ||
          pais.translations.por.official
            .toLowerCase()
            .includes(pesquisa.trim().toLowerCase()) ||
          (pais.name.nativeName &&
            pais.name.nativeName[Object.keys(pais.name.nativeName)[0]].common
              .toLowerCase()
              .includes(pesquisa.trim().toLowerCase())) ||
          pais.continents[0]
            .toLowerCase()
            .includes(pesquisa.trim().toLowerCase())
        );
      })
    );
  }, [pesquisa, paises]);

  async function handlePesquisa(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <header>
        <form onSubmit={handlePesquisa}>
          <input
            type="text"
            placeholder="Search countries"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <img
            className="btn-limpar"
            onClick={() => setPesquisa("")}
            src={btnDelete}
            alt="limpar busca"
          />
        </form>
        <button
          className="btn-random"
          onClick={() =>
            setModal(
              paises[Math.floor(Math.random() * paises.length - 1)].name.common
            )
          }
        >
          <b>?</b>
        </button>
      </header>
      <div className="paises">
        {paisesSrc.map((pais) => {
          return (
            <Pais
              key={pais.cca2}
              nome={pais.name.common}
              bandeira={pais.flags[pais.flags.length - 1]}
              setModal={setModal}
            />
          );
        })}
      </div>
      {modal &&
        paises
          .filter(
            (pais) =>
              pais.name.common === modal ||
              pais.translations.por.common === modal
          )
          .map((paisFiltrado) => {
            console.log(paisFiltrado);
            return (
              <PaisModal
                key={paisFiltrado.cca3}
                bandeira={paisFiltrado.flags[paisFiltrado.flags.length - 1]}
                nomeComum={paisFiltrado.name.common}
                nomeOficial={paisFiltrado.name.official}
                nomePt={
                  paisFiltrado.translations.por
                    ? paisFiltrado.translations.por.common
                    : paisFiltrado.name.common
                }
                regiao={paisFiltrado.region}
                moedas={
                  paisFiltrado.currencies &&
                  paisFiltrado.currencies[
                    Object.keys(paisFiltrado.currencies)[0]
                  ].name
                }
                linguagens={paisFiltrado.languages || ""}
                populacao={paisFiltrado.population}
                fusoHorario={paisFiltrado.timezones}
                setModal={setModal}
              />
            );
          })}
    </div>
  );
}

export default App;
