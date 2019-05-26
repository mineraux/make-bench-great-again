import HomeTransition from '../pages/Home/Transition'
import MapTransition from '../pages/Map/Transition'
import TwitterTransition from '../pages/Twitter/Transition'
import AdminTransition from '../pages/Admin/Transition'
import ComponentsTransition from '../pages/Components/Transition'
import MenuTransition from '../pages/Menu/Transition'
import InstallationTransition from '../pages/Installation/Transition'
import FinishTransition from '../pages/Finish/Transition'

interface routeInterface {
  path: string
  name: string
  component: any
  inNav: boolean
  isMapButtonVisible: boolean
}

interface routesInterface {
  [k: string]: routeInterface
}

interface configInterface {
  routes: routesInterface
}

const config: configInterface = {
  routes: {
    Home: {
      path: '/',
      name: 'Home',
      component: HomeTransition,
      inNav: true,
      isMapButtonVisible: false,
    },
    Map: {
      path: '/map',
      name: 'Map',
      component: MapTransition,
      inNav: true,
      isMapButtonVisible: false,
    },
    Twitter: {
      path: '/twitter',
      name: 'Twitter',
      component: TwitterTransition,
      inNav: true,
      isMapButtonVisible: true,
    },
    Admin: {
      path: '/admin',
      name: 'Admin',
      component: AdminTransition,
      inNav: true,
      isMapButtonVisible: true,
    },
    Components: {
      path: '/components',
      name: 'Component',
      component: ComponentsTransition,
      inNav: true,
      isMapButtonVisible: true,
    },
    Menu: {
      path: '/menu',
      name: 'Menu',
      component: MenuTransition,
      inNav: true,
      isMapButtonVisible: false,
    },
    Installation: {
      path: '/installation/:installationSlug',
      name: 'Installation',
      component: InstallationTransition,
      inNav: false,
      isMapButtonVisible: true,
    },
    Finish: {
      path: '/finish',
      name: 'Finish',
      component: FinishTransition,
      inNav: false,
      isMapButtonVisible: false,
    },
  },
}

export default config
