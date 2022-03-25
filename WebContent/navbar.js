const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const wrap = document.getElementById("wrap");

const greeting = document.querySelector('#greeting');
const reset = document.querySelector("#reset");
const loginsuccess = document.querySelector('#login');


if (window.location.pathname === "/index.html"
    ||window.location.pathname === "/"){
    showMovies(apiUrl + "&language=ko-KR");
}

function showMovies(url){
    fetch(url).then(res => res.json())
        .then(function(data){
            console.log(data.results);
            data.results.forEach(element => {
                const el = document.createElement('div');
                const a = document.createElement('a');
                a.setAttribute("href", `https://www.themoviedb.org/movie/${element.id}&lanuage=ko-KR`);
                const image = document.createElement('img');
                image.classList.add('imgM');
                const text = document.createElement('h2');
                text.innerHTML = `${element.title}`;
                image.src = IMGPATH + element.poster_path;
                el.appendChild(a);
                a.appendChild(image);
                a.appendChild(text);
                main.appendChild(el);
            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    if (window.location.pathname !== "/"
        && window.location.pathname !== "/index.html") {
        wrap.innerHTML = '<link rel="stylesheet" href="/index.css">';
    }

    const searchTerm = search.value;
    if (searchTerm) {
        showMovies(SEARCHAPI + searchTerm + "&language=ko-KR");
        search.value = "";
    }
});

let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')
let dropdownIsOpen = false

if (dropdowns.length) {
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', (event) => {
            let target = document.querySelector(`#${event.target.dataset.dropdown}`)
            if (target) {
                if (target.classList.contains('show')) {
                    target.classList.remove('show')
                    dropdownIsOpen = false
                } else {
                    target.classList.add('show')
                    dropdownIsOpen = true
                }
            }
        })
    })
}

window.addEventListener('mouseup', (event) => {
    if (dropdownIsOpen) {
        dropdowns.forEach((dropdownButton) => {
            let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
            let targetIsDropdown = dropdown == event.target
            if (dropdownButton == event.target) {
                return
            }
            if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
                dropdown.classList.remove('show')
            }
        })
    }
})
function handleSmallScreens() {
    document.querySelector('.navbar-toggler')
        .addEventListener('click', () => {
            let navbarMenu = document.querySelector('.navbar-menu');
            if (navbarMenu.style.display === 'flex') {
                navbarMenu.style.display = 'none'
                return
            }
            navbarMenu.style.display = 'flex'
        })
}
handleSmallScreens()

const savedUsername = localStorage.getItem("username");

if (savedUsername !== null) {
    paintGreeting(savedUsername);
    greeting.classList.remove("hidden");
    reset.classList.remove("hidden");
    loginsuccess.classList.add("loginsuccess");
    reset.addEventListener('click', () => {
        localStorage.removeItem("username");
        reset.classList.add("hidden");
        greeting.classList.add("hidden");
        loginsuccess.classList.remove("loginsuccess");
    })
} else {
    reset.classList.add("hidden");
    greeting.classList.add("hidden");
}
function paintGreeting(username){
    greeting.innerText = `반갑습니다 ${username} !`;
}
