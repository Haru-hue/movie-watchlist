import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeLayout from '@/layouts/homeLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <HomeLayout/>
}
