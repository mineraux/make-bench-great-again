import Home from '../pages/Home/Home'
import Map from '../pages/Map/Map'
import Twitter from '../pages/Twitter/Twitter'
import Admin from '../pages/Admin/Admin'
import Components from '../pages/Components/Components'
import Installation from '../pages/Installation/Installation'

export default {
  routes: {
    Home: {
      path: '/',
      name: 'Home',
      component: Home,
      inNav: true,
    },
    Map: {
      path: '/map',
      name: 'Map',
      component: Map,
      inNav: true,
    },
    Twitter: {
      path: '/twitter',
      name: 'Twitter',
      component: Twitter,
      inNav: true,
    },
    Admin: {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      inNav: true,
    },
    Components: {
      path: '/components',
      name: 'Components',
      component: Components,
      inNav: true,
    },
    Installation: {
      path: '/installation/:installationId',
      name: 'Installation',
      component: Installation,
      inNav: false,
    },
  },
}
