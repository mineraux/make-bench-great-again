import Home from '../pages/Home/Home'
import Map from '../pages/Map/Map'
import Admin from '../pages/Admin/Admin';

export default {
  routes: {
    Home: {
      path: '/',
      name: 'Home',
      component: Home
    },
    Map: {
      path: '/map',
      name: 'Map',
      component: Map
    },
    Admin: {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  }
}