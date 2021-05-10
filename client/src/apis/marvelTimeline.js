import axios from 'axios';

const MarvelTimeline = axios.create({
    baseURL: process.env.REACT_APP_MARVEL_TIMELINE_API,
});

export default MarvelTimeline;
