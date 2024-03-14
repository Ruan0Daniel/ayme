import PetCard from "../components/PetCard";

function refreshCards(petInfosList) {
    const containerCard = document.querySelector('.main__catalogy');
    containerCard.innerHTML = '';
    petInfosList.forEach((petInfos) => containerCard.appendChild(PetCard(petInfos)));
}

export default refreshCards;
