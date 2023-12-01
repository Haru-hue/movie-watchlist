import axios from "axios";

interface DataProps {
    url: string
}

export default async function getData ({ url }: DataProps) {
  try {
    const res = await axios.get<Promise<any>>(`${url}?&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const data = res.data
    return data
  } catch (error) {
    console.error(error)
  }
}