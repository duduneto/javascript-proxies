// Elements Ref

const rightSideRef = document.querySelector(".right-side");
const newCardForm = document.querySelector("#mainForm");

// Datas

const cards = {
};

const cardHandler = {
    set(_target, prop, value) {
        addCardIntoScreen(createCard(prop, value.cardDescription))
    }
}

const proxyCards = new Proxy(cards, cardHandler);

// Functions

function renderAllCards() {
    Object.entries(cards).forEach((card) => {

        addCardIntoScreen(createCard(card[0]))
    })
};

function createCard(titleValue, descriptionValue) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    const cardItem = document.createElement("div");
    cardItem.classList.add("card-item");
    const title = document.createElement("h2");
    title.classList.add("card-title");
    const description = document.createElement("p");
    description.classList.add("card-description");
    description.innerHTML = descriptionValue || "";
    title.innerHTML = titleValue || "";
    cardItem.append(title);
    cardItem.append(description);
    cardContainer.append(cardItem);
    return cardContainer;
}

function addCardIntoScreen(cardContainer) {
    rightSideRef.append(cardContainer);
}

function formSubmit(event) {
    event.preventDefault();
    const {
        cardName: {
            value: cardTitle,
        },
        cardDescription: {
            value: cardDescription
        }
    } = event.target;
    proxyCards[cardTitle] = {
        cardDescription
    };
}

// Attribution

newCardForm.addEventListener("submit", formSubmit)

// Invoking
renderAllCards();