import $ from 'jquery';

function PetCard(props) {
    const birthDate = props.birthday.split('/').reverse().join('/');
    const age = new Date().getUTCFullYear() - new Date(props.birthday).getUTCFullYear();

    const component = $(`<section class="main__card"></section>`);

    const imageEl = $(`<img class="main__card__image" src="${props.imageUrl}">`);
    imageEl.on('mouseover', () => imageEl.attr('src', `${props.gifUrl}`));
    imageEl.on('mouseleave', () => imageEl.attr('src', `${props.imageUrl}`));

    const infosContainerEl = $(
        `<div class="main__card__infos_container">
            <span class="main__card__info association">${props.institute}</span>
            <span class="main__card__info name">${props.name}</span>
            <span class="material-symbols-outlined main__card__info sex" ${props.sex}>${props.sex}</span>
            <span class="main__card__info birthday"><img src="src/images/bolo.png" class="emoji"> ${birthDate} (${age} anos)</span>
            <span class="main__card__info location"><img src="src/images/globo.png" class="emoji"> ${props.city}, ${(props.state)} </span>
        </div>
    `);

    const buttonEl = $(`<button class="main__card__button">Quero Adotar! <img src="src/images/sorridente.png" class="emoji"></button>`);
    buttonEl.on('mouseover', () => buttonEl.find('img').attr('src', 'src/images/apaixonado.gif'));
    buttonEl.on('mouseleave', () => buttonEl.find('img').attr('src', 'src/images/sorridente.png'));

    component.append(imageEl, infosContainerEl);
    infosContainerEl.append(buttonEl);
    return component.get(0);
}

export default PetCard;
