"use client"
import { Icon } from '@iconify/react';

function Navbar() {
  return (
    <div className="flex flex-col justify-between min-h-screen p-6 text-2xl">
      <div className="navigation space-y-6">
        <Icon icon="fluent:chevron-right-24-regular" />
        <div className="flex space-x-2 items-center">
        <Icon icon="mingcute:movie-line" />
        <p>Movies</p>
        </div>
        <div className="flex space-x-2 items-center">
        <Icon icon="clarity:clock-line" />
        <p>History</p>
        </div>
        <div className="flex space-x-2 items-center">
        <Icon icon="solar:star-outline" />
        <p>Favourites</p>
        </div>
      </div>
      <div className="footer">
      <Icon icon="ri:moon-line" />
      </div>
    </div>
  )
}

export default Navbar

