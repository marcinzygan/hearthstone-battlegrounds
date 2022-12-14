import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadingData,
  notLoadingData,
  appStarted,
} from "./App/Features/Loader/loaderSlice";
import {
  setPage,
  showPagination,
} from "./App/Features/Pagination/paginateSlice";
import { setData, setFavList } from "./App/Features/Cards/cardsSlice";
import Loading from "./App/Features/Loader/Loading.js";
import Card from "./App/Features/Cards/Card";
import Pagination from "./App/Features/Pagination/Pagination";
import Header from "./App/Features/Header/Header";
import Footer from "./App/Features/Footer/Footer";
import Welcome from "./App/Features/WelcomeScreen/Welcome";
import Modal from "./App/Features/Modal/Modal";

function App() {
  //STATE
  const cards = useSelector((state) => state.cards.cards);
  const loading = useSelector((state) => state.loader.loading);
  const appStarting = useSelector((state) => state.loader.appStarted);
  const pageNumber = useSelector((state) => state.page.pageNumber);
  const favoriteList = useSelector((state) => state.cards.favoriteList);
  const showPaginationButtons = useSelector(
    (state) => state.page.showPagination
  );
  const dispatch = useDispatch();

  //CALL API FUNCTION TO FETCH DATA
  const callAPI = function () {
    dispatch(loadingData());

    const options = {
      method: "GET",
      // url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/minion",
      url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/battlegrounds",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        dispatch(loadingData());
        const data = response.data;

        dispatch(setData(data));

        dispatch(showPagination());
        dispatch(setPage(1));
        dispatch(appStarted());
        dispatch(notLoadingData());
      })

      .catch(function (error) {
        console.error(error);
        dispatch(notLoadingData());
      });
  };

  // USE EFFECT TO FETCH LOCAL STORAGE
  React.useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      dispatch(setFavList(favorites));
    } catch (e) {}
  }, [dispatch]);

  // SAVE AND REMOVE FAVORITES TO LOCAL STORAGE
  // save and remove items to local storage everytime favorites array changes

  React.useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favoriteList));
  }, [favoriteList]);

  // API CALL FOR BACKEND
  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     url: "http://localhost:8000/cards",
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       dispatch(loadingData());
  //       const data = response.data;

  //       dispatch(setData(data));
  //       console.log(data);
  //       dispatch(notLoadingData());
  //     })

  //     .catch(function (error) {
  //       console.error(error);
  //       dispatch(notLoadingData());
  //     });
  // }, [dispatch]);
  // PAGINATION LOGIC
  const cardsPerPage = 2;
  const cardsSeen = pageNumber * cardsPerPage;
  const numberOfPages = Math.ceil(cards.length / cardsPerPage);

  //Display cards function
  const displayCards = cards.slice(cardsSeen - 2, cardsPerPage - 2 + cardsSeen);

  return (
    <>
      {!loading && <Header />}
      {!appStarting && !loading && <Welcome callAPI={callAPI} />}
      {loading && <Loading />}
      {!loading && appStarting && (
        <div className="card-container">
          {displayCards.map((card) => (
            <Card key={card.cardId} {...card} />
          ))}
        </div>
      )}
      {showPaginationButtons && <Pagination numberOfPages={numberOfPages} />}
      {!loading && <Footer />}
      {!loading && appStarting && <Modal />}
    </>
  );
}

export default App;
