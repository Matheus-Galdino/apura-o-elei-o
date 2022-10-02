const numberFormater = new Intl.NumberFormat();
const ENDPOINT = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json";

const candidatosList = document.querySelector(".candidatos");
const atualizadoEm = document.querySelector(".atualizado-em");

ListarResultados();

setInterval(async () => {
    await ListarResultados()
}, 1 * 60000);

async function ListarResultados() {
  const response = await fetch(ENDPOINT);
  const result = await response.json();

  candidatosList.innerHTML = "";
  for (const cand of result.cand) {
    candidatosList.innerHTML += CreateCandidatoListItem(cand);
  }

  atualizadoEm.innerHTML = "Atualizado em: " + new Date().toLocaleTimeString();
}

function CreateCandidatoListItem(candidato) {
  return `
    <li class="candidato">
        <p class="candidato-nome">${candidato.nm}</p>
        <p class="candidato-votos">
            Votos totais: 
            <strong> ${numberFormater.format(candidato.vap)} </strong>
        </p>
        <div class="percentual-container">
            <div class="percentual-bar">
                <div class="filler" style="--width: ${candidato.pvap.replace(",", ".")}"></div>
            </div>
            <p class="candidato-percentual">${candidato.pvap}%</p>
        </div>
    </li>
`;
}
