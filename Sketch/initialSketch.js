const cards = [];
const loadedCards = [];
var loaded = false;
var selectedCards = [];
var card1;
var card2;
var card3;
var card1Name = "";
var card2Name = "";
var card3Name = "";
var myButton;
var refreshCadrsBtn;
var card1XPosition;
var card2XPosition;
var card3XPosition;
var cardYPosition = 130;
var card1Width;
var card2Width;
var card3Width;
var card1Height;
var card2Height;
var card3Height;
var mouseOverCard1 = false;
var mouseOverCard2 = false;
var mouseOverCard3 = false;

function preload() {
    for (var i = 1; i < 79; i++) {
        cards[i - 1] = `cards/${i}.jpg`;
        loadedCards[i - 1] = loadImage(`cards/${i}.jpg`);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    myButton = new button();
    myButton.style.color = '#000';
    myButton.style.background = ' #b4b4b4';
    myButton.hoverStyle.background = '#6c6968';
    myButton.place(width / 2.5, 460, 200, 50);
    myButton.align(0, 0);
    myButton.content = 'Comenzar';
    myButton.onClick = function () { start(); };
    refreshCadrsBtn = new button();
    refreshCadrsBtn.style.color = '#000';
    refreshCadrsBtn.style.background = '#b4b4b4';
    refreshCadrsBtn.hoverStyle.background = '#6c6968';
    refreshCadrsBtn.place(width / 1.5, 460, 200, 50);
    refreshCadrsBtn.align(0, 0);
    refreshCadrsBtn.content = 'Tirar cartas';
    refreshCadrsBtn.onClick = function () { drawCards(); };
    card1XPosition = windowWidth / 9;
    card2XPosition = windowWidth / 2.5;
    card3XPosition = windowWidth / 1.5;
}

function draw() {
    background('#E8E8E8');
    myButton.draw();
    refreshCadrsBtn.draw();
    if (selectedCards.length > 0) {
        card1Width = card1.width / 3;
        card2Width = card2.width / 3;
        card3Width = card3.width / 3;
        card1Height = card1.height / 3;
        card2Height = card2.height / 3;
        card3Height = card3.height / 3;
        image(card1, card1XPosition, cardYPosition, card1Width, card1Height);
        image(card2, card2XPosition, cardYPosition, card2Width, card2Height);
        image(card3, card3XPosition, cardYPosition, card3Width, card3Height);
        if (mouseOverCard1) {
            squareColor = color(100, 50, 100);
            squareColor.setAlpha(120);
            fill(squareColor);
            rect(card1XPosition + card1Width, cardYPosition, 155, 155, 20);
            textSize(11);
            fill(50);
            text(getCardDescription(card1Name), card1XPosition + card1Width + 5, cardYPosition - 60, card1Width, card1Height);
        } else if (mouseOverCard2) {
            squareColor = color(100, 50, 100);
            squareColor.setAlpha(120);
            fill(squareColor);
            rect(card2XPosition + card2Width, cardYPosition, 155, 155, 20);
            textSize(11);
            fill(50);
            text(getCardDescription(card2Name), card2XPosition + card2Width + 5, cardYPosition - 60, card2Width, card2Height);
        } else if (mouseOverCard3) {
            squareColor = color(100, 50, 100);
            squareColor.setAlpha(120);
            fill(squareColor);
            rect(card3XPosition + card3Width, cardYPosition, 155, 155, 20);
            textSize(11);
            fill(50);
            text(getCardDescription(card3Name), card3XPosition + card3Width + 5, cardYPosition - 60, card3Width, card3Height);
        }
    }
    return;
}

function drawCards() {
    background('#E8E8E8');

    card1Name = cards[int(random(0, 78))];
    card2Name = cards[int(random(0, 78))];
    card3Name = cards[int(random(0, 78))];

    while (card2Name == card1Name) {
        card2Name = cards[int(random(0, 78))];
    }

    while (card3Name == card1Name || card3Name == card2Name) {
        card3Name = cards[int(random(0, 78))];
    }

    selectedCards[0] = card1Name;
    selectedCards[1] = card2Name;
    selectedCards[2] = card3Name;

    card1 = loadImage(card1Name);
    card2 = loadImage(card2Name);
    card3 = loadImage(card3Name);

    loaded = true;
}

function start() {
    if (loaded) {
        if (selectedCards.length > 0) {
            window.location.href = `cards.html?card1=${card1Name}&card2=${card2Name}&card3=${card3Name}`;
        }
    }
}

function keyPressed() {
    if (loaded) {
        if (selectedCards.length > 0 && keyCode == ENTER) {
            window.location.href = `cards.html?card1=${card1Name}&card2=${card2Name}&card3=${card3Name}`;
        }
    }
}

function mouseMoved() {
    mouseOverCard1 = (mouseX >= card1XPosition && mouseX <= (card1XPosition + card1Width))
        && (mouseY >= cardYPosition && mouseY <= (cardYPosition + card1Height));

    mouseOverCard2 = (mouseX >= card2XPosition && mouseX <= (card2XPosition + card2Width))
        && (mouseY >= cardYPosition && mouseY <= (cardYPosition + card2Height));

    mouseOverCard3 = (mouseX >= card3XPosition && mouseX <= (card3XPosition + card3Width))
        && (mouseY >= cardYPosition && mouseY <= (cardYPosition + card3Height));
}

function getCardDescription(cardName) {
    return cardDescriptions.find(cd => cd.name == cardName.substring(cardName.indexOf('/') + 1, cardName.indexOf('.'))).description;
}