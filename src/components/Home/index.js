import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as movieActions from "../../actions/movies";
import * as promotionAction from "../../actions/promotion";
import * as sliderBarActions from "../../actions/sliderBars";
import "../../sass/home.scss";
import * as authActions from "../../actions/auth";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [tag, setTag] = useState(true);
  const sliderBar = useSelector((state) => state.sliderBar.sliderBar);
  const promotionInfo = useSelector((state) => state.promotionReducer.promotions)
  const movies = useSelector((state) => state.movies.movies);
  const [movie, setMovie] = useState(movies);
  const user = useSelector(state => state.currentUser.currentUser);
  const accounts = useSelector(state => state.currentUser.accounts);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    dispatch(sliderBarActions.sliderBar());
  }, [dispatch]);

  useEffect(() => {
    dispatch(movieActions.movies());
  }, [dispatch]);


  useEffect(() => {
    dispatch(promotionAction.promotionRequest())
  }, [dispatch])

  useEffect(() => {
    dispatch(authActions.account());
  }, [dispatch]);

  useEffect(() => {
    if (user && accounts) {
      const result = [...accounts].filter(account => {
        return account.email === user.email;
      });
      dispatch(authActions.accountInformation(result));
    }
  }, [user, accounts, dispatch]);

  useEffect(() => {
    if (movies) {
      const result = [...movies].filter((movie) => {
        if (tag === true) {
          return movie.trangThai === 1;
        } else {
          return movie.trangThai === 0;
        }
      });
      setMovie([...result]);
    }
  }, [tag, movies]);

  const plusSlides = (n, length) => {
    let count = n;
    n > length ? (count = 1) : n <= 0 ? (count = length) : (count = n);
    setSlideIndex(count);
  };

  const currentSlide = (count) => {
    setSlideIndex(count);
  };

  const showBar = () => {
    let result = [];
    if (sliderBar) {
      sliderBar.forEach((bar, i) => {
        return result.push(
          <div
            key={i}
            className={
              bar.id === slideIndex
                ? "mySlides fade slideBarBlock"
                : "mySlides fade slideBarNone"
            }
          >
            <img className='bar' src={bar.hinhAnh} alt='banner' />
          </div>
        );
      });
    }
    return result;
  };

  const showDot = () => {
    let result = [];
    if (sliderBar) {
      sliderBar.forEach((bar, i) => {
        return result.push(
          <span
            key={i}
            className={bar.id === slideIndex ? "dot active" : "dot"}
            onClick={() => currentSlide(bar.id)}
          ></span>
        );
      });
    }
    return result;
  };

  const showMovie = () => {
    let result = [];

    if (movie && typeof movie !== "undefined" && movie !== null) {
      for (let i = 0; i < 4; i++) {
        result.push(
          <div className='movie' key={i}>
            <img
              src={movie[i].hinhAnh}
              alt='image__movie'
              className='movie__image'
            />
            <div className='movie__name'>{movie[i].tenPhim}</div>
            <div className="wrap-movie__btn"><span className='movie__btn'>{t("home.booking")}</span></div>
          </div>
        );
      }
    }
    return result;
  };

  // const autoSlidebar = () => {
  //   if (sliderBar) {
  //     let time = setInterval(() => {
  //       setSlideIndex(slideIndex + 1);
  //     }, 4000);
  //     setTimeout(() => {
  //       clearInterval(time);
  //       setSlideIndex(1);
  //     }, 24000);
  //   }
  // };

  return (
    <div className='home'>

      <div className='slideshow-container'>
        {showBar(sliderBar, slideIndex)}

        <span
          className='prev'
          onClick={() => plusSlides(slideIndex - 1, sliderBar.length)}
        >
          &#10094;
        </span>
        <span
          className='next'
          onClick={() => plusSlides(slideIndex + 1, sliderBar.length)}
        >
          &#10095;
        </span>
      </div>
      <br />

      <div className='wrapperDot'>{showDot()}</div>
      {/* {autoSlidebar(sliderBar)} */}
      <div className='movies container'>
        <div className='movies__header row'>
          <span
            className={
              tag ? "movies__header__tag active" : "movies__header__tag"
            }
            onClick={() => setTag(true)}
          >
            {t("home.nowShowing")}
          </span>
          <span
            className={
              !tag ? "movies__header__tag active" : "movies__header__tag"
            }
            onClick={() => setTag(false)}
          >
            {t("home.comingSoon")}
          </span>
        </div>
        <div className='movies__main row'>
          {showMovie()}
        </div>
        <div className="movies__btn">{t("home.viewMore")}</div>
      </div>

      <div className="promotion ">
        <div className="container">
          <span className="movies__header__tag ">{t("home.promotionInformation")}</span>

          <div className="row">
            {
              promotionInfo && promotionInfo.map((item, i) =>
                <div className="col-12 col-sm-6 col-lg-3" key={i}>
                  <div className="promotion__item">
                    <img className="promotion__img" src={item.promotion_image} alt="promotion information" />
                    <div className="wrap-promotion__btn">
                      <div className="promotion__btn">{t("home.detail")}</div>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
