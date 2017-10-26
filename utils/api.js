import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "UdaciCards:decks";

/**
 * Returns all decks in the app
 */
export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      return data;
    })
    .catch(e => console.log(e));
}

/**
 * Returns a single deck on id
 * @param {string} id 
 */
export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      if (data[id]) {
        return data[id];
      }
      return null;
    })
    .catch(e => console.log(e));
}

/**
 * Adds a deck to our app
 * @param {string} title 
 */
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  );
}

/**
 * Adds a card to a deck
 * @param {string} title 
 * @param {object} card string question, string answer
 */
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    const decks = Object.assign({}, data, {
      [title]: Object.assign({}, data[title], {
        questions: [...data[title].questions, card]
      })
    });

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function clearAllDecks() {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({}));
}
