import { Icon } from "@iconify/react/dist/iconify.js";

export const NavItems: NavItem[] = [
    {
        label: 'Home',
        link: '/',
        icon: <Icon className='text-3xl' icon="ri:movie-2-line" />
    },
    {
        label: 'Upcoming',
        link: '/upcoming',
        icon: <Icon className='text-3xl' icon="arcticons:jiotv" />
    },
    {
        label: 'Recently Viewed',
        link: '/history',
        icon: <Icon className='text-3xl' icon="clarity:clock-line" />
    },
    {
        label: 'Favourites',
        link: '/favourites',
        icon: <Icon className='text-4xl' icon="material-symbols-light:kid-star-outline" />
    }
]