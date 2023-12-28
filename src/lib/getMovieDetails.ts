import getData from "./getData";

export default async function getMovieDetails(id: number, endpoint?: string) {
    const url = endpoint ? `https://api.themoviedb.org/3/movie/${id}/${endpoint}` : `https://api.themoviedb.org/3/movie/${id}`
    try {
        const movieDetails = await getData({ url: url })
        const movie = await movieDetails
        return movie
    } catch (error) {
        console.error(error)
        return null
    }
}
