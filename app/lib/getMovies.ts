import getData from "./getData";
import { newResults } from "./mock";

export async function getNewMovies () {
    try {
        const response = await getData({ url: 'https://api.themoviedb.org/3/movie/now_playing' })
        const newMovies = await response.results
        return newMovies
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getRecommendedMovies () {
    try {
        const response = await getData({ url: 'https://api.themoviedb.org/3/movie/popular' })
        const newMovies = await response.results
        return newMovies
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getTRatedMovies () {
    try {
        const response = await getData({ url: 'https://api.themoviedb.org/3/movie/top_rated' })
        const newMovies = await response.results
        return newMovies
    } catch (error) {
        console.error(error)
        return null
    }
}