
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

  constructor(player, areaElement, cardTypes) {
    this.player = player;
    this.area = areaElement;
    this.cardTypes = this.shuffleCardTypes(cardTypes);
  }

  start() {
    this.fillArea();
    this.area.addEventListener('click', function() {

    });
  }

  finish() {}

  fillArea() {
    let area = '';

    this.cardTypes.forEach(function createCard(cardType) {
      area += ` <div class="card ${ cardType }">
                  <div class="flipper">
                    <div class="front"></div>
                    <div class="back"></div>
                  </div>
                </div> `;
    });

    this.area.innerHTML = area;
  }

  shuffleCardTypes(cardTypes) {
    const { numberOfCards, numberOfCardTypes } = this.player.levelParams;
    const randomTypes = shuffleArray(cardTypes).slice(0, numberOfCardTypes);
    let result = [];

    for (let i = 1; i <= numberOfCards / numberOfCardTypes; i++) {
      result = result.concat(randomTypes);
    }

    return shuffleArray(result);
  }

}


class Player {

  constructor(levelParams, container) {
    this.hearts = 0;
    this.level = 1;
    this.levelParams = levelParams;

    this.container = container;
  }

  getHeart() {

  }

  updateLevel() {

  }

  update() {
    this.container.innerHTML = `<span class="level">Level ${ this.level }</span>
                                <img class="logo-img" src="images/logo.png">
                                <span class="clicks">Clicks: ${ this.levelParams.clicks }</span> `;
  }

}


const player = new Player(LEVEL_0, header);
player.update();

const game = new Game(player, gameAreaElement, CARD_TYPES);
game.start();
