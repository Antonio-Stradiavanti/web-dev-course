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

const cards = [
    {
        imgSrc: './assets/icons/pdf-icon.png',
        title: 'Супер важный PDF-файл с расписанием на 2023 год',
        details: {
            author: 'Мананников Антон',
            lastModified: new Date(Date.parse('2024-09-27'))
        }
    },
    {
        imgSrc: './assets/icons/doc-icon.png',
        title: 'Критерии оценки на экзамене в 2024 году',
        details: {
            author: 'Мананников Антон',
            lastModified: new Date(Date.parse('2024-10-05'))
        }    
    },
    {
        imgSrc: './assets/icons/xls-icon.png',
        title: 'Табличка со списком покупок',
        details: {
            author: 'Мананников Антон',
            lastModified: new Date(Date.parse('2024-12-16'))
        }    
    },
    {
        imgSrc: './assets/icons/png-icon.png',
        title: 'Фотка с отпуска, в который я так хочу вернуться ...',
        details: {
            author: 'Мананников Антон',
            lastModified: new Date(Date.parse('2024-12-05'))
        }    
    },
    {
        imgSrc: './assets/icons/doc-icon.png',
        title: 'Алексеев В. А. Базы данных лабораторная работа №3',
        details: {
            author: 'Мананников Антон',
            lastModified: new Date(Date.parse('2024-11-15'))
        }    
    }
];

const dateFormatOptions = {year: 'numeric', month: 'long', day: '2-digit'};
const ruLocale = 'ru-RU';



function loadCards(category = 'default') {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';
    
    let sortedCards;

    if (category == 'newest') {
        sortedCards = cards.toSorted(
            (cardA, cardB) => {
                // Большие идут вперед
                return cardB.details.lastModified - cardA.details.lastModified;
            }
        );
    }
    else if (category == 'oldest') {
        sortedCards = cards.toSorted(
            (cardA, cardB) => {
                // Меньшие идут вперед
                return cardA.details.lastModified - cardB.details.lastModified;
            }
        );
    }
    else {
        sortedCards = cards;
    }

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
                    Последние изменения: ${card.details.lastModified.toLocaleDateString(ruLocale, dateFormatOptions)}
                </p>
            `;

            cardContainer.appendChild(cardImg);
            cardContainer.appendChild(cardBody);

            cardsContainer.appendChild(cardContainer);
        }
    );
}

const dropdownButton = document.getElementById('dropdownButton');
const dropdownButtonIcon = `
    <svg id="arrow-icon-size" class="ms-3">
        <use id="arrow-icon" href="./assets/icons/icons.svg#arrow"/>
    </svg>
`;

const dropdownItems = Array.from(document.querySelector('.section-header .dropdown').getElementsByClassName('dropdown-item'));

const sortOptions = {
    default: 'По умолчанию',
    newest: 'Сначала новые',
    oldest: 'Сначала старые'
};

dropdownItems.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (event.target.innerText == sortOptions.newest) {
            loadCards('newest');
            dropdownButton.innerHTML = `
                ${sortOptions.newest}
                ${dropdownButtonIcon}    
            `;
        }
        else if (event.target.innerText == sortOptions.oldest) {
            loadCards('oldest');
            dropdownButton.innerHTML = `
                ${sortOptions.oldest}
                ${dropdownButtonIcon}    
            `;
        }
        else {
            loadCards();
            dropdownButton.innerHTML = `
                ${sortOptions.default}
                ${dropdownButtonIcon}    
            `; 
        }
    });
});

document.addEventListener('DOMContentLoaded', () => loadCards());