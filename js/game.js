"use strict";

class Game {
  constructor() {
    this.cardTypes = ["jabba",
                      "obi",
                      "c3po",
                      "chewbacca",
                      "leia",
                      "luke",
                      "vader",
                      "yoda"
                      ];
    this.container = document.querySelector('.game-area');
    this.openedCouple = [];
    this.hiddenCouples = 0;
  }

  shuffle(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i),
        x = array[--i], array[i] = array[j], array[j] = x);
    return array;
  }

  createCards() {
    this.cardTypes = this.shuffle(this.cardTypes.concat(this.cardTypes));
    for(var i = 0; i < this.cardTypes.length; i++) {
      var card = document.createElement('div');
      card.setAttribute('class', 'card ' + this.cardTypes[i]);
      card.innerHTML = '<div class="flipper"><div class="front"></div><div class="back"></div></div>';
      this.container.appendChild(card);
    }
  }

  begin() {
    this.createCards();
    this.cards = document.querySelectorAll('.card');
    this.addClickListeners(this.cards);
  }

  checkWin() {
    if(this.hiddenCouples === 8) {
      setTimeout(() => { alert('Congratulations! You are the winner');
                        location.reload();
      }, 500);
    }
  }

  removeCards() {
    this.openedCouple[0].classList.add('hidden');
    this.openedCouple[1].classList.add('hidden');
    this.openedCouple.length = 0;
    this.hiddenCouples++;
    this.checkWin();
  }

  checkOpenedCards() {
    if(this.openedCouple[0].className === this.openedCouple[1].className) {
      setTimeout( () => { this.removeCards(); }, 100);
    }
  }

  openCard(el) {
    if(this.openedCouple.length <= 2) {
      var flipper = el.firstChild;
      flipper.classList.add('opened');
      this.openedCouple.push(el);
      if(this.openedCouple.length === 2) {
        this.checkOpenedCards();
      }
      if(this.openedCouple.length === 3) {
        this.closeCard(this.openedCouple[0]);
        this.closeCard(this.openedCouple[0]);
      }
    }
  }

  closeCard(el) {
    var flipper = el.firstChild;
    flipper.classList.remove('opened');
    this.openedCouple.shift();
  }

  addClickListeners(cards) {
    var thisObj = this;
    for(var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function(el) {
        if(!this.firstChild.className.includes('opened'))  {
          thisObj.openCard(this);
        }
      }, false);
    }
  }
}

const game = new Game();
game.begin();
