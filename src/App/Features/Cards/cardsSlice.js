import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  currentImg: "",
  originalCardsState: [],
  favouritesList: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setData: (state, data) => {
      //Filter out only cards with minion type

      const newState = data.payload
        .map((card, index) => {
          return { ...card, isFav: false };
        })
        .filter((card) => card.img && card.type === "Minion");
      console.log(newState);
      // Filter out duplicate cards
      const noDuplicates = newState.filter(
        (value, index, self) =>
          index === self.findIndex((card) => card.name === value.name)
      );
      console.log(noDuplicates);
      // Create copy of an array and sort it alphabetically
      const sortedAlphabetically = [...noDuplicates].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      // Set new state
      state.cards = sortedAlphabetically;
      //Set original state for filterOptions
      state.originalCardsState = sortedAlphabetically;
    },
    //FILTER DATA FEATURE
    filterData: (state, data) => {
      if (data.payload === "All") {
        state.cards = state.originalCardsState;
      } else if (data.payload === "none") {
        state.cards = state.originalCardsState;
        const filteredCards = state.cards.filter((card) => !card.race);
        state.cards = [...filteredCards];
      } else {
        state.cards = state.originalCardsState;
        const filteredCards = state.cards.filter(
          (card) => card.race === data.payload
        );
        state.cards = [...filteredCards];
      }
    },
    //SET IMAGE URL  FEATURE
    setImg: (state, data) => {
      state.currentImg = data.payload;
    },
    //ADD CARD TO FAVOURITES
    setFavourite: (state, data, index) => {
      const id = data.payload;
      // Find the current card in state , copy its properties , and set isFav to true
      const newDisplayedCards = state.cards.map((card) => {
        if (card.cardId === id) {
          return { ...card, isFav: card.isFav === false ? true : false };
        }
        return { ...card };
      });
      //Find current card in state.cards and add it to favouritesList
      const currentCard = state.cards.find((card) => card.cardId === id);
      state.favouritesList.push(currentCard);
      // Display updated state
      state.cards = newDisplayedCards;

      //Find current card in originalState , copy its properties and change isFav to true
      const newOriginalCards = state.originalCardsState.map((card) => {
        if (card.cardId === id) {
          return { ...card, isFav: card.isFav === false ? true : false };
        }
        return { ...card };
      });
      //Set new originalState
      state.originalCardsState = newOriginalCards;
    },
    //REMOVE CARD FROM FAVOURITES
    removeFavourite: (state, data) => {
      const id = data.payload;
      // Find current card in cardsState , copy its properties and change isFav to false
      const newCards = state.cards.map((card) => {
        if (card.cardId === id) {
          return { ...card, isFav: card.isFav === false ? true : false };
        }
        return { ...card };
      });
      //Set new original State and cardsState

      state.cards = newCards;
      const currentCard = state.cards.find((card) => card.cardId === id);
      const newOriginalState = (state.originalCardsState = [
        ...state.originalCardsState.filter((card) => card.cardId !== id),
      ]);
      state.originalCardsState = [...newOriginalState, currentCard];
      //Filter out the current card from Favourites list
      state.favouritesList = state.favouritesList.filter(
        (card) => card.cardId !== id
      );
    },
  },
});
export const { setData, setImg, filterData, setFavourite, removeFavourite } =
  cardsSlice.actions;
export default cardsSlice.reducer;
