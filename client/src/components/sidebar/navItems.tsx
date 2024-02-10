import { Icon } from "@iconify/react/dist/iconify.js";

export const NavItems: NavItem[] = [
    {
        label: 'Home',
        link: '/',
        icon: <Icon className='text-3xl' icon="ri:movie-2-line" />
    },
    {
        label: 'Browse',
        link: '/browse',
        icon: <Icon className='text-3xl' icon="arcticons:youtube-tv" />
    },
    {
        label: 'Recently Viewed',
        link: '/history',
        icon: <Icon className='text-3xl' icon="ph:clock-clockwise-light" />
    },
    {
        label: 'Favourites',
        link: '/favourites',
        icon: <Icon className='text-3xl' icon="material-symbols-light:kid-star-outline" />
    }
]