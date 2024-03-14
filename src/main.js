import './styles/main.css'
import 'range-slider-input/dist/style.css';

import { pets } from './data/pets.json';
import { estados } from './data/estados-cidades.json';

import PetCard from './components/PetCard';

import $ from 'jquery';
import Choices from 'choices.js';
import rangeSlider from 'range-slider-input';
import customCheckbox from './utils/customCheckbox';
import refreshCards from './utils/refreshCards';

// Input - Estado/Cidade
const stateCitySugestions = estados
    .reduce((content, { sigla, cidades }) => {
        const cityChoices = cidades.map(city => ({ value: `${city}, ${sigla}`, label: `${city}, ${sigla}` }));

        return [...content, ...cityChoices];
    }, [])
    .sort();

const stateCitySelect = new Choices('#filter_state_city', {
    choices: stateCitySugestions,
    placeholder: true,
    placeholderValue: 'Ex.: Rio de Janeiro',
    noResultsText: 'Nenhuma cidade/estado encontrado.',
    noChoicesText: 'Sem opções disponíveis.',
});


// Input - Sexo
const getStatusSex = customCheckbox($('#filter_sex').get(0), ['male', 'female']);

// Input - Idade
const rangerSliderAge = rangeSlider($('#filter_age').get(0), {
    max: 20,
    value: [0, 20],
    onInput: ([min, max]) => {
        $('.age_min').text(min);
        $('.age_max').text(max);
    },
});

// Input - Espécie
const speciesSugestions = [...new Set(pets.map(({ species }) => species))]
    .map(speciesName => ({ value: speciesName, label: speciesName }));

const speciesSelect = new Choices('#filter_species', {
    choices: speciesSugestions,
    placeholder: true,
    placeholderValue: 'Ex.: Gato',
    noResultsText: 'Nenhuma espécie encontrada.',
    noChoicesText: 'Sem opções disponíveis.',
});

// Input - Porte
const getStatusSize = customCheckbox($('#filter_size').get(0), ['small', 'medium', 'big']);

// Input - Instituição de Doação
const instituteSugestions = [...new Set(pets.map(({ institute }) => institute))]
    .map(instituteName => ({ value: instituteName, label: instituteName }));

const instituteSelect = new Choices('#filter_institute', {
    choices: instituteSugestions,
    placeholder: true,
    placeholderValue: 'Ex.: Projeto Esdras',
    noResultsText: 'Nenhuma instituição encontrada.',
    noChoicesText: 'Sem opções disponíveis.',
});

const filterButton = $('#filter_button').on('click', () => {
    const stateCityList = stateCitySelect.getValue(true);

    const sexSelected = getStatusSex();
    const { male: isMale, female: isFemale } = sexSelected;
    const [minAge, maxAge] = rangerSliderAge.value();
    const speciesList = speciesSelect.getValue(true);
    const sizeSelected = getStatusSize();
    const { small: isSmall, medium: isMedium, big: isBig } = sizeSelected;
    const instituteList = instituteSelect.getValue(true);

    const newPetsList = pets.filter(pet => {
        const { 
            birthday, city, institute,
            sex, size, species, state
        } = pet;

        const petAge = new Date().getUTCFullYear() - new Date(birthday).getUTCFullYear();

        const validation1 = stateCityList.length === 0 || stateCityList.includes(`${city}, ${state}`);
        const validation2 = !isMale && !isFemale || sexSelected[sex];
        const validation3 = petAge >= minAge && petAge <= maxAge;
        const validation4 = speciesList.length === 0 || speciesList.includes(species);
        const validation5 = !isSmall && !isMedium && !isBig || sizeSelected[size];
        const validation6 = instituteList.length === 0 || instituteList.includes(institute);

        return validation1 && validation2 && validation3 && validation4 && validation5 && validation6;
    });

    refreshCards(newPetsList);
});

const searchBar = $('#search_pet_name').on('input', (e) => {
    const searchValue = e.target.value;
    const newPetsList = pets.filter(pet => !searchValue || pet.name.startsWith(searchValue));

    refreshCards(newPetsList);
});

refreshCards(pets);
