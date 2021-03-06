import axios from "axios";

const API_KEY = 'fa561345c2b39efd3b1c321431b53387';
const path = 'https://api.themoviedb.org/3/person/popular?api_key=fa561345c2b39efd3b1c321431b53387&page='


axios.interceptors.response.use(undefined, err => {
    console.log(err);
    console.log(err.response);
})

const responseBody = (response) => response.data;
const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
}

const People = {
    GetPeoples: q => requests.get(path + '' + q.page),
    searchPeoples: q => requests.get(`https://api.themoviedb.org/3/search/person?api_key=fa561345c2b39efd3b1c321431b53387&page=${q.page}&query=${q.search}`),
    getDetails: q => {
        console.log('https://api.themoviedb.org/3/person/:' + q.id + '?api_key=' + API_KEY)
        return requests.get('https://api.themoviedb.org/3/person/:' + q.id + '?api_key=' + API_KEY)
    },
    getDetails2: {
            "adult": false,
            "also_known_as": ["برد پیت", "Бред Пітт", "Брэд Питт", "畢·彼特", "ブラッド・ピット", "브래드 피트", "براد بيت", "แบรด พิตต์", "William Bradley \"Brad\" Pitt", "William Bradley Pitt", "Μπραντ Πιτ", "布拉德·皮特", "Breds Pits"],
            "biography": "William Bradley Pitt is an American actor and film producer. He has received multiple awards, including two Golden Globe Awards and an Academy Award for his acting, in addition to another Academy Award and a Primetime Emmy Award as producer under his production company, Plan B Entertainment. Pitt first gained recognition as a cowboy hitchhiker in the road movie Thelma & Louise (1991). His first leading roles in big-budget productions came with the drama films A River Runs Through It (1992) and Legends of the Fall (1994), and the horror film Interview with the Vampire (1994). He gave critically acclaimed performances in the crime thriller Seven (1995) and the science fiction film 12 Monkeys (1995), the latter earning him a Golden Globe Award for Best Supporting Actor and an Academy Award nomination. Pitt starred in Fight Club (1999) and the heist film Ocean's Eleven (2001), as well as its sequels, Ocean's Twelve (2004) and Ocean's Thirteen (2007). His greatest commercial successes have been Ocean's Eleven (2001), Troy (2004), Mr. & Mrs. Smith (2005), World War Z (2013), and Once Upon a Time in Hollywood (2019), for which he won a second Golden Globe Award and the Academy Award for Best Supporting Actor. Pitt's other Academy Award nominated performances were in The Curious Case of Benjamin Button (2008) and Moneyball (2011). He produced The Departed (2006) and 12 Years a Slave (2013), both of which won the Academy Award for Best Picture, and also The Tree of Life (2011), Moneyball (2011), and The Big Short (2015), all of which were nominated for Best Picture. As a public figure, Pitt has been cited as one of the most influential and powerful people in the American entertainment industry. For a number of years, he was cited as the world's most attractive man by various media outlets, and his personal life is the subject of wide publicity. From 2000 to 2005, he was married to the actress Jennifer Aniston, and from 2014 to 2019, he was married to the actress Angelina Jolie. Pitt and Jolie have six children together, three of whom were adopted internationally.",
            "birthday": "1963-12-18",
            "deathday": null,
            "gender": 2,
            "homepage": null,
            "id": 287,
            "imdb_id": "nm0000093",
            "known_for_department": "Acting",
            "name": "Brad Pitt",
            "place_of_birth": "Shawnee, Oklahoma, USA",
            "popularity": 17.099,
            "profile_path": "/ajNaPmXVVMJFg9GWmu6MJzTaXdV.jpg"
    },
    getImage: q => 'https://image.tmdb.org/t/p/w500' + q.img,
}

export default {
    People
}