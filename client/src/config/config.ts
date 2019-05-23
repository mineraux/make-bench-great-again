import HomeTransition from '../pages/Home/Transition'
import MapTransition from '../pages/Map/Transition'
import TwitterTransition from '../pages/Twitter/Transition'
import AdminTransition from '../pages/Admin/Transition'
import ComponentsTransition from '../pages/Components/Transition'
import MenuTransition from '../pages/Menu/Transition'
import InstallationTransition from '../pages/Installation/Transition'
import FinishTransition from '../pages/Finish/Transition'

export default {
  routes: {
    Home: {
      path: '/',
      name: 'Home',
      component: HomeTransition,
      inNav: true,
    },
    Map: {
      path: '/map',
      name: 'Map',
      component: MapTransition,
      inNav: true,
    },
    Twitter: {
      path: '/twitter',
      name: 'Twitter',
      component: TwitterTransition,
      inNav: true,
    },
    Admin: {
      path: '/admin',
      name: 'Admin',
      component: AdminTransition,
      inNav: true,
    },
    Components: {
      path: '/components',
      name: 'Component',
      component: ComponentsTransition,
      inNav: true,
    },
    Menu: {
      path: '/menu',
      name: 'Menu',
      component: MenuTransition,
      inNav: true,
    },
    Installation: {
      path: '/installation/:installationId',
      name: 'Installation',
      component: InstallationTransition,
      inNav: false,
    },
    Finish: {
      path: '/finish',
      name: 'Finish',
      component: FinishTransition,
      inNav: false,
    },
  },
}
