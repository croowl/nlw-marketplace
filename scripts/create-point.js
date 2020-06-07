
//Botao "Estado" - Buscando, configurando mudanças ao clicar no botão


//Cria a função de consultar os Estados na API do IBGE
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    //fetch: consulta algum lugar e volta com uma 'promessa'
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        //Cria a variavel 'state' e atribui um valor de 'states'(que foi designado como resposta da promessa do json) cada vez que o for é executado
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()


//Cria a função de consultar as Cidades baseado no Estado selecionado
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    //Pega a propriedade .value do objeto UF (nesse caso, corresponde ao ID do Estado)
    const ufValue = event.target.value

    //Pega de forma dinamica o numero do index do Estado selecionado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    fetch(url)
    .then( res => res.json() )
    .then ( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

    //Faz a busca por cidade após selecionar o estado ficar 'mais rapido'
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`

}


//Quando houver mudanças no id=uf, retorna pra função getCities
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Auditor de mudanças na console
//document
//    .querySelector("select[name=uf]")
//    .addEventListener("change", () => {
//        console.log("Mudei")
//   } )