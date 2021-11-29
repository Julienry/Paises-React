import btnDelete from "../assets/delete.svg";

function handleClick(e) {
  e.stopPropagation();
}

function PaisModal({
  bandeira,
  nomeComum,
  nomeOficial,
  nomePt,
  regiao,
  moedas,
  linguagens,
  populacao,
  fusoHorario,
  setModal,
}) {
  const linguagemArray = [];
  for (const linguagem in Object.keys(linguagens)) {
    linguagemArray.push(linguagens[Object.keys(linguagens)[linguagem]]);
  }
  return (
    <div className="modal" onClick={() => setModal("")}>
      <div className="modal__dados" onClick={handleClick}>
        <img src={bandeira} alt={`bandeira do país ${nomeComum}`} />
        <ul>
          <li>
            <b>Common name: </b>
            {nomeComum}
          </li>
          <li>
            <b>Official name: </b>
            {nomeOficial}
          </li>
          <li>
            <b>Portuguese name: </b>
            {nomePt}
          </li>
          <li>
            <b>Region: </b>
            {regiao}
          </li>
          <li>
            <b>Currency: </b>
            {moedas}
          </li>
          <li>
            <b>Languages: </b>
            {linguagemArray.map((lingua, i) => {
              return i === linguagemArray.length - 1 ? lingua : `${lingua} - `;
            })}
          </li>
          <li>
            <b>Population: </b> {populacao}
          </li>
          <li>
            <b>Timezones: </b>
            {fusoHorario.map((utc, i) => {
              return i === fusoHorario.length - 1 ? utc : `${utc} - `;
            })}
          </li>
        </ul>
        <img
          className="btn-fechar"
          onClick={() => setModal("")}
          src={btnDelete}
          alt="fechar modal"
        />
      </div>
    </div>
  );
}

export default PaisModal;
