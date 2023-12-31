import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

type UserBox = {
  username: string
}

function UserBox({ username }: { username: string }) {
  return (
    <section className='border border-blue-400 rounded-2xl'>
        <div className='flex flex-col'>
          <div className="w-full h-60 bg-slate-500 rounded-t-2xl movieBG"></div>
          <div className="w-32 h-32 bg-red-400 absolute mt-40 ml-12 rounded-full"></div>
          <div className='flex items-center justify-between ml-40 mt-6 px-10 mb-20'>
            <span>
              <h2 className="text-3xl font-bold">Joshua Uko</h2>
              <p>@{username}</p>
            </span>
            <Icon icon="heroicons:ellipsis-vertical-20-solid" className='text-3xl' />
          </div>
        </div>
    </section>
  )
}

export default UserBox