const TMDB_API_KEY = "3a377862d155dc0b034c393fad709b13"; // env파일 만들지?
const IMAGE_URL = "https://image.tmdb.org/t/p";
const BASE_URL = "https://api.themoviedb.org/3/movie";
const LANGUAGE = "ko-KR";
const backdropImage = document.querySelector(".backdrop_image");
const moviePoster = document.querySelector(".poster_image");
const movieTitle = document.querySelector(".detail_title");
const movieGenres = document.querySelector(".detail_genres");
const movieRating = document.querySelector(".detail_rating");
const movieOverview = document.querySelector(".detail_overview");

const craeteBackdrop = () => {
    backdropImage.src = `${IMAGE_URL}/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg`;
}

const getMovie = async () => {
    craeteBackdrop();
    // 스파이더맨 : 634649
    const detail = await fetch(`${BASE_URL}/634649?api_key=${TMDB_API_KEY}&language=${LANGUAGE}`)
        .then(res => res.text())
        .then(data => JSON.parse(data));

    return detail;
}

async function init() {
    const movie = await getMovie();
    createMoiveElements(movie);
}
init();

const createMoiveElements = (movie) => {
    moviePoster.src = `${IMAGE_URL}/w500${movie.poster_path}`;
    movieTitle.innerText = `${movie.title} (${movie.release_date.slice(0, 4)})`;
    movieGenres.innerText = movie.genres.map(genre => genre.name);
    movieRating.innerText = `평점 : ⭐️ ${movie.vote_average} / 10`;
    movieOverview.innerText = movie.overview === "" ? "(이 영화는 아직 한글 영화 소개가 제공되지 않습니다.)" : movie.overview;
}

function detail() {
    location.href = "https://www.youtube.com/watch?v=pQFb4-7raMs";
}

function detailPage() {
    location.href="https://www.spidermannowayhome.movie/"
}