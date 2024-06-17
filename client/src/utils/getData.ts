import axios from "axios";

export default async function getData (url: string) {
  try {
    const res = await axios.get<Promise<any>>(`${url}?&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const data = res.data
    return data
  } catch (error) {
    console.error(error)
  }
}