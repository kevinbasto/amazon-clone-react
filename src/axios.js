import axios from 'axios'

const instance = axios.create({
    //debug link
    //baseURL: 'https://us-central1-clone-4e95b.cloudfunctions.net/api'  //THE API (cloud function) URL
    //production
    baseURL: 'https://us-central1-clone-4e95b.cloudfunctions.net/api'
});

export default instance;