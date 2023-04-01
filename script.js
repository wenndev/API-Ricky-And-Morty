const characterId = document.querySelector('#characterId');
const content = document.querySelector('#content');
const image = document.querySelector('img');
const btnGo = document.querySelector('#btn-go');
const btnReset = document.querySelector('#btn-reset');

const fetchAPI = (value) => {
    const getAPI = fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then(response => response.json())
        .then((data) => {
            return data;
        });
    return getAPI;
};

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
    name:'Nome',
    status: 'Status',
    species: 'Espécie',
    gender: 'Gênero',
    origin: 'Planeta de origem',
    episode: 'Episódios'
}
const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
        .map((elem) => {
            if (elem.checked === true && Array.isArray(result[elem.name]) === true) {
                const arrayResult = result[elem.name].join('\r\n');
                
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`
                content.appendChild(newElement);

            } else if (elem.checked === true && (elem.name === 'origin')) {
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`;
                content.appendChild(newElement);

            }  else if (elem.checked === true && typeof (result[elem.name]) !== "object") {
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`
                content.appendChild(newElement);
            }
        });
}

btnGo.addEventListener('click', async (event) => {
    event.preventDefault();

    if (characterId.value === '') {
        return content.innerHTML = 'É necessário fazer um filtro.';
    }

    const result = await fetchAPI(characterId.value);
    if (content.firstChild === null) {
        image.src = `${result.image}`;
        buildResult(result);
    } else {
        content.innerHTML = '';
        image.src = `${result.image}`;
        buildResult(result);
    }
})

btnReset.addEventListener('click', () => location.reload());