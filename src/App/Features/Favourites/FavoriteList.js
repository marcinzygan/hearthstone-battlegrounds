import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { setFavourite, removeFavourite } from "../Cards/cardsSlice";
const FavoriteList = () => {
  const dispatch = useDispatch();
  const favList = useSelector((state) => state.cards.favoriteList);
  const favCards = favList.map((card) => {
    return (
      <div key={card.cardId} className="favorite__card">
        <h1 className="card-name">{card.name}</h1>
        <img className="card-img" src={card.img} alt={card.name} />
        <div className="card-buttons">
          <button className="btn ">
            {!card.isFav ? (
              <Icon
                icon="fa-solid:heart"
                onClick={() => dispatch(setFavourite(card.cardId))}
              />
            ) : (
              <Icon
                icon="fa-solid:heart-broken"
                onClick={() => dispatch(removeFavourite(card.cardId))}
              />
            )}
          </button>
        </div>
      </div>
    );
  });
  return <div className="favorites__container">{favCards}</div>;
};

export default FavoriteList;
