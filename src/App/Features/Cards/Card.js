import React from "react";
import { useDispatch } from "react-redux";
import { setImg, setFavourite, removeFavourite } from "./cardsSlice";
import { openModal, isFavListOpened } from "../Modal/modalSlice";
import { Icon } from "@iconify/react";
const Card = (card) => {
  const { cardId, name, text, img, race, isFav } = card;
  // MODAL

  const dispatch = useDispatch();
  const openImgModal = function (img) {
    dispatch(openModal());
    dispatch(isFavListOpened(false));
    dispatch(setImg(img));
  };

  let newText;
  if (text) {
    newText = text
      .replace("[x]", "")
      .replaceAll("_", "")
      .replace("(@ Gold left!)", "");
  }

  return (
    <div className="card">
      <h1 className="card-name">{name}</h1>

      <img
        src={img}
        alt={name}
        className="card-img"
        onClick={() => openImgModal(img)}
      />

      <div className="card-details">
        <div className="card-race">
          <span className="race-span">Race:</span>
          {!race ? ` none` : ` ${race}`}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: newText }}
          className="card-text"
        />
      </div>
      <div className="card-buttons">
        <button className="btn card__btn">
          {!isFav ? (
            <Icon
              className="fav__icon"
              icon="mdi:heart-plus"
              onClick={() => dispatch(setFavourite(cardId))}
            />
          ) : (
            <Icon
              className="fav__icon"
              icon="mdi:heart-minus"
              onClick={() => dispatch(removeFavourite(cardId))}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
