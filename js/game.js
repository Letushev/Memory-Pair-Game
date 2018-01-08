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

  removeCards(cards) {
    cards[0].classList.add('hidden');
    cards[1].classList.add('hidden');
    this.openedCouple.length = 0;
  }
 
  checkOpenedCards() {
    var checkedCards = document.querySelectorAll('.' + this.openedCouple[0]);
    console.log(checkedCards);
    if(this.openedCouple[0] === this.openedCouple[1]) {
      setTimeout( () => { this.removeCards(checkedCards); }, 800);
    }else {
      this.closeCard(checkedCards[0].firstChild);
      this.closeCard(checkedCards[1].firstChild);
    }
  }

  openCard(e) {
    if(this.openedCouple.length <= 2) {
      if(this.openedCouple.length === 2) {
        this.checkOpenedCards();
      }
      var target = e.target;
      var parentNode = target.parentNode;
      parentNode.classList.add('opened');
      var type = parentNode.parentNode.className.split(' ')[1];
      this.openedCouple.push(type);
    }
  }

  closeCard(el) {
    var type = el.className.split(' ')[1];
    el.classList.remove('opened');
    this.openedCouple.pop();
  }
  
  closeCardEvent(e) {
    var target = e.target;
    var parentNode = target.parentNode;
    var type = parentNode.parentNode.className.split(' ')[1];
    parentNode.classList.remove('opened');
    this.openedCouple.pop();
  }

  isOpen(e) {
    if(e.target.parentNode.className.includes('opened')) {
      return true;
    }else {
      return false;
    }
  }

  addClickListeners(cards) {
    var that = this;
    for(var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function(e) {
        if(that.isOpen(e)) {
          that.closeCardEvent(e);
        }else {
          that.openCard(e);
        }
      }, false);
    }
  }
}

const game = new Game();
game.begin();

