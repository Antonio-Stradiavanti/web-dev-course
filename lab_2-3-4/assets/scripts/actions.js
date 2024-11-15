window.addEventListener(
    'load',
    () => {
        const spinnerWrapperElement = document.querySelector('.spinner-wrapper');
        spinnerWrapperElement.style.opacity = '0';

        setTimeout(
            () => {
                spinnerWrapperElement.style.display = 'none';
            }, 1000
        );
    }
);


const sortOptions = {
    default: 'По умолчанию',
    newest: 'Сначала новые',
    oldest: 'Сначала старые'
};

const filterOptions = {
    all: 'Все типы',
    pdf: 'PDF',
    doc: 'DOC',
    xls: 'XLS',
    png: 'PNG'
};


const dateFormatOptions = {year: 'numeric', month: 'long', day: '2-digit'};
const ruLocale = 'ru-RU';


async function loadCards(
    sortOption = sortOptions.default, 
    filterOption = filterOptions.all
) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';
    
    const cards = await (await fetch('/lab_2-3-4/assets/data/cards.json')).json();

    const filteredCards = filterOption === filterOptions.all
        ? cards
        : cards.filter(
            (element) => element.details.suffix == filterOption.toLowerCase()
        )
    ;

    const sortedCards = sortOption === sortOption.all 
        ? filteredCards
        : filteredCards.toSorted(
            (cardA, cardB) => {
                // Множитель определяет порядок сортировки: cardA - cardB -- сначала старые, если идут снгачала новые, то их надо просто домножить на -1.
                const mult = sortOption === sortOptions.newest ? -1 : 1;
                return mult * (cardA.details.lastModified - cardB.details.lastModified);
            }
        )
    ; 


    sortedCards.forEach(
        card => {
        const cardContainer = document.createElement('article');
        cardContainer.classList.add('card', 'flex-row');

        const cardImg = document.createElement('img');
        cardImg.src = card.imgSrc;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        cardBody.innerHTML = `
            <h5>${card.title}</h5>
            <p class="card-text">
                Создал: <strong>${card.details.author}</strong>  
            </p>
            <p class="card-text">
                Последние изменения: ${new Date(card.details.lastModified).toLocaleDateString(ruLocale, dateFormatOptions)}
            </p>
        `;

        cardContainer.appendChild(cardImg);
        cardContainer.appendChild(cardBody);

        cardsContainer.appendChild(cardContainer);
    });
}

const dropdownButton = document.getElementById('dropdownButton');
const dropdownButtonIcon = `
    <svg id="arrow-icon-size" class="ms-3">
        <use id="arrow-icon" href="./assets/icons/icons.svg#arrow"/>
    </svg>
`;

const sortDropdownItems = Array.from(document.querySelector('.section-header .dropdown').getElementsByClassName('dropdown-item'));
let currentSortOption = sortDropdownItems[0];
currentSortOption.classList.add('active');

const filterButtonGroupItems = Array.from(document.querySelector('.main-content .btn-group').getElementsByClassName('btn-check'));
let currentFilterOption = filterButtonGroupItems[0];
currentFilterOption.setAttribute('checked', true);


function sortCards(event) {
    loadCards(event.target.innerText, currentFilterOption.nextElementSibling.innerText);
    dropdownButton.innerHTML = `
        ${sortOptions.newest}
        ${dropdownButtonIcon}    
    `;

    currentSortOption.classList.remove('active');
    event.target.classList.add('active');    
    currentSortOption = event.target; 
}

function filterCards(event) {
    loadCards(currentSortOption, event.target.nextElementSibling.innerText);
}

sortDropdownItems.forEach(element => element.addEventListener('click', sortCards));

filterButtonGroupItems.forEach(element => element.addEventListener('input', filterCards));

document.addEventListener('DOMContentLoaded', loadCards);