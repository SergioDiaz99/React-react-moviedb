import React, { useEffect, useState } from "react";
import { fetchCasts, fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie } from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom';
import ScrollToTop from "../../utils/ScrollToTop";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [detail, setDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovies(await fetchSimilarMovie(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  const MoviePlayerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0,4).map((c,i)=>{
    return (
        <div className="col-md-3 text-center" key={i}>
          <img 
            className="img-fluid rounded-circle mx-auto d-block"
            src={c.img}
            alt={c.name}
          ></img>
          <p className="font-weight-bold text-center">{c.name}</p>
          <p
            className="font-weight-light text-center"
            style={{color: '#5a606b'}}
          >
            {c.character}
          </p>
        </div>
    );
  }); 

  const similarMovieList = similarMovies.slice(0,4).map((item,index)=>{
      return(
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
      )
  })
  return (
    <div className="container">
      
      <div className="row mt-2">
        <MoviePlayerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePlayerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col">
          <div className="text-center">
            <ReactStars
                count='10'
                value={detail.rating}
                size={20}
                color1={"#f4c10f"}
            ></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
             <p style={{ color: "#f4c10f", fontWeight: "bolder" }}>RELEASE DATE</p>
             <p style={{ color: "#f4c10f"}}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
            <p style={{ color: "#f4c10f", fontWeight: "bolder" }}>RUN TIME</p>
            <p style={{ color: "#f4c10f"}}>{detail.runtime} minutes</p>
        </div> 
        <div className="col-md-3">
            <p style={{ color: "#f4c10f", fontWeight: "bolder" }}>BUDGET</p>
            <p style={{ color: "#f4c10f"}}>${detail.budget}</p>
        </div>
        <div className="col-md-3">
            <p style={{ color: "#f4c10f", fontWeight: "bolder" }}>HOMEPAGE</p>
            <a href={detail.homepage} target="_blank" style={{ color: "#f4c10f"}}>{detail.homepage}</a>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>

      <div className="row mt-3">
          {castList}
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">
        {similarMovieList}
      </div>

      <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}></hr>

      <div className="row mt-3 mb-5">
        <di className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>ABOUT ME</h3>
          <p>
            I am a software developer graduated from the technological
            university of Mar del Plata who enjoys learning many programming
            languajes and frameworks.
          </p>
          <p>If you want to know more about me, feel free to contac me.</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="https://github.com/SergioDiaz99"
                target="_blank"
                style={{ color: "#f4c10f" }}
              >
                <i className="fab fa-github fa-2x"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://www.linkedin.com/in/diaz-sergio-software-developer/"
                target="_blank"
                style={{ color: "#f4c10f" }}
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </li>
          </ul>
        </di>

        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
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
