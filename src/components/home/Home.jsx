import React, { useEffect, useState } from "react";
import { fetchGenre, fetchMovieByGenre, fetchMovies, fetchPersons, fetchTopRatedMovie } from "../../service";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
//import  ReactBootstrapCarousel  from "react-bootstrap-carousel";
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const[persons, setPersons] = useState([]);
  const[topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      setPersons(await fetchPersons());
      setTopRated(await fetchTopRatedMovie());
    };

    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  }

  const movies = nowPlaying.slice(0, 10).map((item, index) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center" style={{width: "100%"}}>
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button type="button" className="btn btn-outline-info" onClick={() => {
          handleGenreClick(item.id);
        }}>
          {item.name}
        </button>
      </li>
    )
  })

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count='10'
            value={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  const trendingPersons = persons.slice(0,4).map((p,i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img 
          className="img-fluid rounded-circle mx-auto d-block"
          src={p.profileImg}
          alt={p.name}
        ></img>
        <p className="font-weight-bold text-center">{p.name}</p>
        <p
          className="font-weight-light text-center"
          style={{color: '#5a606b'}}
        >
          Trending for {p.known}
        </p>
      </div>
    );
  });

  //console.log(topRated.slice(0, 4));
  const topRatedList = topRated.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title} />
          </Link> 
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count='10'
            value={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });
  /*        pauseOnVisibility={true}
            slidesshowSpeed={4000}
            version={4}
            indicators={false}
            
            infiniteLoop={true}
            autoFocus={true}
            emulateTouch={true}
            pauseOnVisibility={true}
            interval={4000}*/

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            autoFocus={true}
            emulateTouch={true}
            interval={3000}
          >
            {movies}
          </Carousel>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <ul className="list-inline"> {genreList} </ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{color: "#5a606b"}}>
            TRENDING PERSONS ON THIS WEEK
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{trendingPersons} </div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{color: '#5a606b'}}>
            TOR RATED MOVIES
          </p >
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{topRatedList} </div>

      <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}></hr>

      <div className="row mt-3 mb-5">
        <di className="col-md-8 col-sm-6" style={{color: '#5a606b'}}>
          <h3>ABOUT ME</h3>
          <p>
              I am a software developer graduated from the technological university of Mar del Plata
              who enjoys learning many programming languajes and frameworks.
          </p>
          <p>
              If you want to know more about me, feel free to contac me.
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://github.com/SergioDiaz99" target="_blank" style={{color: '#f4c10f'}}>
                <i className="fab fa-github fa-2x"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com/in/diaz-sergio-software-developer/" target="_blank" style={{color: '#f4c10f'}}>
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </li>
          </ul>
        </di>
        
        <div className="col-md-4 col-sm-6" style={{color: '#5a606b'}}>
          <h3>KEEP IN TOUCH</h3>
          <ul className="list-unstyled">
            <li>
             <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Adress:
                </strong>{" "}
                Mar del Plata, Buenos Aires, Argentina
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Phone:
                </strong>{" "}
                +54 9 223 5820906
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:
                </strong>{" "}
                @diazsergioricardo99@gmail.com
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
