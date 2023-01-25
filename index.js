// Elements Ref

const rightSideRef = document.querySelector(".right-side");
const newCardForm = document.querySelector("#mainForm");

// Datas

const cards = {
    "Proxies": {
        description: "Use the Proxy() constructor to create a new Proxy object. This constructor takes two mandatory arguments"
    }
};

const cardHandler = {
    set(_target, prop, value) {
        addCardIntoScreen(createCard(prop, value.description))
    }
}

const proxyCards = new Proxy(cards, cardHandler);

// Functions

function renderAllCards() {
    Object.entries(cards).forEach((card) => {

        addCardIntoScreen(createCard(card[0], card[1].description))
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
        description: cardDescription
    };

    newCardForm.reset();
}

// Attribution

newCardForm.addEventListener("submit", formSubmit)

// Invoking
renderAllCards();