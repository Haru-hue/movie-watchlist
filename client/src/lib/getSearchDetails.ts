import getData from "./getData"

export default async function getSearchDetails (term: string, page: number){
    const url = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=${page}`
    try {
        const movieDetails = await getData({ url: url })
        const movies = await movieDetails
        return movies
    } catch (error) {
        console.error(error)
        return null
    }
}