const gameAreaElement = document.querySelector('.game-area');
const header = document.querySelector('header');

const CARD_TYPES = ["jabba", "obi", "c3po", "chewbacca", "leia", "luke", "vader", "yoda"];
const LEVEL_0 = {
  clicks: 32,
  numberOfCards: 16,
  numberOfCardTypes: 4
}

function shuffleArray(array) {
  for(var j, x, i = array.length; i; j = parseInt(Math.random() * i),
      x = array[--i], array[i] = array[j], array[j] = x);

  return array;
}


class Game {

  constructor(areaElement, cardTypes) {
    this.area = areaElement;
    this.cardTypes = cardTypes;
  }

  get openedCards() {
    const cardTypes = [];
    const openedFlippers = document.querySelectorAll('.opened');

    openedFlippers.forEach(function saveOpenedCardType(flipper) {
      cardTypes.push(this.findCardType(flipper.closest('.card')));
    }.bind(this));

    return { cardTypes, openedFlippers };
  }

  set opened(flipper) {
    flipper.classList.add('opened');
  }

  set closed(flippers) {
    flippers.forEach(function(flipper) {
      setTimeout(function closeFlipper() {
        flipper.classList.add('closed');
      }, 100);
    });
  }

  set hidden(flippers) {
    flippers.forEach(function hideFlipper(flipper) {
      flipper.classList.remove('opened');
    })
  }

  start(levelParams) {
    this.fillArea(levelParams);
    this.area.addEventListener('click', function(event) {
      if (event.target.closest('.card')) {
        this.handleCardClick(event.target.closest('.card'));
      }
    }.bind(this));
  }

  finish() {
  }

  fillArea(levelParams) {
    let area = '';
    const cardTypes = this.shuffleCardTypes(this.cardTypes, levelParams)

    cardTypes.forEach(function createCard(cardType) {
      area += ` <div class="card ${ cardType }">
                  <div class="flipper">
                    <div class="front"></div>
                    <div class="back"></div>
                  </div>
                </div> `;
    });

    this.area.innerHTML = area;
  }

  handleCardClick(card) {
    const flipperElement = card.querySelector('.flipper');
    const cardType = this.findCardType(card);

    if (!flipperElement.classList.contains('closed') && !flipperElement.classList.contains('opened')) {

      this.clicksRemain--;

      if (clicksRemain === 0) {
      }

      if (this.openedCards.openedFlippers.length === 2) {
        this.hidden = this.openedCards.openedFlippers;
      }

      this.opened = flipperElement;
      this.checkCardsEquality();
    }
  }

  findCardType(card) {
    return card.className.split(' ').find(function getType(name) {
      return name !== 'card';
    });
  }

  checkCardsEquality() {
    const { openedFlippers, cardTypes } = this.openedCards;

    if (openedFlippers.length === 2)  {
      if (cardTypes[0] === cardTypes[1]) {
        this.closed = openedFlippers;
      }
    }
  }

  shuffleCardTypes(cardTypes, levelParams) {
    const { numberOfCards, numberOfCardTypes } = levelParams;
    const randomTypes = shuffleArray(cardTypes).slice(0, numberOfCardTypes);
    let result = [];

    for (let i = 1; i <= numberOfCards / numberOfCardTypes; i++) {
      result = result.concat(randomTypes);
    }

    return shuffleArray(result);
  }

}


class Player {

  constructor(container, game, levelParams) {
    this.hearts = 1;
    this.level = 1;
    this.levelParams = levelParams;

    this.game = game;
    game.start(this.levelParams);

    this.clicksRemain = this.levelParams.clicks;

    this.container = container;
  }

  getHeart() {

  }

  updateLevel() {

  }

  hasClicked() {
    this.clicksRemain--;
    this.update();

    if (this.clicksRemain === 0) {
      this.restart();
    }
  }

  restart() {
    if (this.hearts > 0) {
      Game.restart();
    }
  }

  update() {
    this.container.innerHTML = `<span class="level">Level ${ this.level }</span>
                                <img class="logo-img" src="images/logo.png">
                                <span class="clicks">Clicks: ${ this.clicksRemain }</span> `;
  }

}

const game = new Game(gameAreaElement, CARD_TYPES);

const player = new Player(header, game, LEVEL_0);
player.update();
