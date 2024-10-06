const numberFormater = new Intl.NumberFormat();
const ENDPOINT = "https://resultados.tse.jus.br/oficial/ele2024/619/dados/sp/sp71072-c0011-e000619-u.json";

const candidatosList = document.querySelector(".candidatos");
const atualizadoEm = document.querySelector(".atualizado-em");

ListarResultados();

setInterval(async () => {
  await ListarResultados()
}, 0.5 * 60000);

async function ListarResultados() {
  const response = await fetch(ENDPOINT);
  const result = await response.json();

  const candidatos = result.carg[0].agr.map(agr => agr.par[0].cand[0])
  const candidatosOrdenado = candidatos.sort((x, y) => x.vap == y.vap ? 0 : Number(x.vap) > Number(y.vap) ? -1 : 1)
  console.log(candidatosOrdenado)
  
  candidatosList.innerHTML = "";
  candidatosList.innerHTML += candidatosOrdenado.reduce((html, cand) => html += CreateCandidatoListItem(cand), "");

  atualizadoEm.innerHTML = `Atualizado em: <span> ${new Date().toLocaleTimeString()} </span>`;
}

function CreateCandidatoListItem(candidato) {
  return `
    <li class="candidato">
        <p class="candidato-nome">${candidato.n}-${candidato.nmu}</p>
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
