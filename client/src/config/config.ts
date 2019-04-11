import Home from '../pages/Home/Home'
import Map from '../pages/Map/Map'

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
  }
}