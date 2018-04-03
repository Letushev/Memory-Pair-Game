const rootElement = document.getElementById('root');
const CARD_TYPES = ["jabba", "obi", "c3po", "chewbacca", "leia", "luke", "vader", "yoda"];
const LEVEL_1_PARAMS = {
  clicks: 32,
  numberOfCards: 16,
  numberOfCardTypes: 4
};

function shuffleArray(array) {
  for(var j, x, i = array.length; i; j = parseInt(Math.random() * i),
      x = array[--i], array[i] = array[j], array[j] = x);

  return array;
}

class Game {
  constructor(container, cardTypes, levelParams) {
    this.container = container;

    this.level = 1;
    this.hearts = 1;

    this.cardTypes = cardTypes;
    this.levelParams = levelParams;
  }

  start() {
    this.clicksRemain = this.levelParams.clicks;

    this.container.innerHTML = '';
    this.fillGameState();
    this.fillGameArea();

    this.container.addEventListener('click', function(event) {
      this.handleClick(event);
    }.bind(this));
  }

  fillGameState() {
    const header = document.createElement('header');
    header.innerHTML = `
      <p>Level <span class="level">${ this.level }</span></p>
      <img class="logo-img" src="images/logo.png">
      <p>Clicks: <span class="clicks">${ this.clicksRemain }</span></p> `;

    this.container.appendChild(header);
  }

  fillGameArea() {
    const gameArea = document.createElement('div');
    gameArea.className = 'game-area';

    const cards = this.shuffleCardTypes();

    cards.forEach(function addCard(cardType) {
      gameArea.innerHTML += `
          <div class="card ${ cardType }">
            <div class="front"></div>
            <div class="back"></div>
          </div> `;
    });

    this.container.appendChild(gameArea);
  }

  get openedCards() {
    return document.querySelectorAll('.opened');
  }

  get closedCards() {
    return document.querySelectorAll('.closed');
  }

  open(card) {
    card.classList.add('opened');

    this.hasClicked();
  }

  close(cards) {
    setTimeout(function() {
      cards.forEach(function(card) {
        card.classList.add('closed');
      });

      this.checkVictory();
    }.bind(this), 300);
  }

  hide(cards) {
    cards.forEach(function(card) {
      card.classList.remove('opened');
    })
  }

  shuffleCardTypes() {
    const { numberOfCards, numberOfCardTypes } = this.levelParams;
    const randomTypes = shuffleArray(this.cardTypes).slice(0, numberOfCardTypes);
    let result = [];

    for (let i = 1; i <= numberOfCards / numberOfCardTypes; i++) {
      result = result.concat(randomTypes);
    }

    return shuffleArray(result);
  }

  handleClick(event) {
    const card = event.target.closest('.card');

    if (card && !this.isCardOpened(card)) {
      if (this.openedCards.length === 2) {
        this.hide(this.openedCards);
      }

      this.open(card);
    }

    if (this.openedCards.length === 2) {
      this.compareOpenCards();
    }
  }

  isCardOpened(card) {
    return card.classList.contains('opened');
  }

  compareOpenCards() {
    if (this.openedCards[0].className === this.openedCards[1].className) {
      this.close(this.openedCards);
    }
  }

  hasClicked() {
    this.clicksRemain--;

    if (this.clicksRemain === 0) {
      return this.restart();
    }

    this.updateCurrentState();
  }

  updateCurrentState() {
    document.querySelector('.clicks').textContent = this.clicksRemain;
    document.querySelector('.level').textContent = this.level;
  }

  restart() {
    if (this.hearts === 0) {

    } else {
      this.start();
    }
  }

  checkVictory() {
    if (this.closedCards.length === this.levelParams.numberOfCards) {
      console.log('victory');
    }
  }
}

const game = new Game(rootElement, CARD_TYPES, LEVEL_1_PARAMS);
game.start();
