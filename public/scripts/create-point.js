                // Dados da Entidade

// Botao "Estado" - Buscando, configurando mudanças ao clicar no botão
// Cria a função de consultar os Estados na API do IBGE
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


// Cria a função de consultar as Cidades baseado no Estado selecionado
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    //Pega a propriedade .value do objeto UF (nesse caso, corresponde ao ID do Estado)
    const ufValue = event.target.value

    //Pega de forma dinamica o numero do index do Estado selecionado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    //Faz a busca por cidade após selecionar o estado ficar 'mais rapido'
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then ( cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })


}

// Quando houver mudanças no id=uf, retorna pra função getCities
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Auditor de mudanças na console
//document
//    .querySelector("select[name=uf]")
//    .addEventListener("change", () => {
//        console.log("Mudei")
//   } )





                // Itens de coleta

// Pegar todos os li's

// Primeiro defino um local que vou 'monitorar'
const itemsToCollect = document.querySelectorAll(".items-grid li")


// Depois, crio uma estrutura de repetição pra monitorar todos os items desse local
for ( const item of itemsToCollect ) {
    item.addEventListener("click", handleSelectedItem) //jogo o valor pra função handleSelectedItems
}

const collectedItems = document.querySelectorAll("input[name=items]")


let selectedItems = []

// Em seguida, crio a função pra (de)selecionar o item da lista
function handleSelectedItem(event) {

    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id // dataset = data.id no html

    console.log('ITEM ID: ', itemId)
  
    // verificar se existem selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })


    // se já estiver selecionado
    if( alreadySelected >= 0 ) {       //se nao estiver nada selecionado, o valor padrao é -1
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)        
    }

    console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}


