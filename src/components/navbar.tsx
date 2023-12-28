"use client"
import { Icon } from '@iconify/react';
import { Dispatch, SetStateAction } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

type NavbarProps = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
}

function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  return (
    <div className="flex ">
      <Sidebar collapsed={isOpen} backgroundColor='#121528' rootStyles={{
        border: 'none',
        position: 'fixed',
        height: '100%'
      }} >
         <Menu className='flex justify-center py-6'>
           <Icon className='cursor-pointer text-3xl' icon="fluent:chevron-right-24-regular" onClick={() => setIsOpen(!isOpen)} />
         </Menu>
        <Menu>
          <MenuItem icon={<Icon className='text-3xl' icon="mingcute:movie-line" />}>Movies</MenuItem>
          <MenuItem icon={ <Icon className='text-3xl' icon="clarity:clock-line" />}>History</MenuItem>
          <MenuItem icon={<Icon className='text-3xl' icon="solar:star-outline" />}>Favourites</MenuItem>
        </Menu>
        <div className='absolute bottom-6'>
          <Menu>
            <MenuItem  icon={ <Icon className='text-3xl' icon="ri:moon-line" />}>Footer</MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  )
}

export default Navbar

