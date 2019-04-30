import Home from '../pages/Home/Home'
import Map from '../pages/Map/Map'
import Admin from '../pages/Admin/Admin';
import Twitter from '../pages/Twitter/Twitter'
import Bench from '../pages/Bench/Bench'

export default {
  routes: {
    Home: {
      path: '/',
      name: 'Home',
      component: Home,
      inNav: true
    },
    Map: {
      path: '/map',
      name: 'Map',
      component: Map,
      inNav: true
    },
    Twitter: {
      path: '/twitter',
      name: 'Twitter',
      component: Twitter,
      inNav: true
    },
    Admin: {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      inNav: true
    },
    Bench: {
      path: '/bench/:benchId',
      name: 'Bench',
      component: Bench,
      inNav: false
    }
  }
}