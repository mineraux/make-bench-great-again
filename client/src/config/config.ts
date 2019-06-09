import HomeTransition from '../pages/Home/Transition'
import MapTransition from '../pages/Map/Transition'
import TwitterTransition from '../pages/Twitter/Transition'
import AdminTransition from '../pages/Admin/Transition'
import ComponentsTransition from '../pages/Components/Transition'
import MenuTransition from '../pages/Menu/Transition'
import AboutTransition from '../pages/About/Transition'
import ProgrammationTransition from '../pages/Programmation/Transition'
import Installation from '../pages/Installation/Installation'
import InstallationTransition from '../pages/Installation/Transition'
import FinishTransition from '../pages/Finish/Transition'
import SuccessTransition from '../pages/Success/Transition'

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
    About: {
      path: '/about',
      name: 'About',
      component: AboutTransition,
      inNav: true,
      isMapButtonVisible: true,
    },
    Programmation: {
      path: '/programmation',
      name: 'Programmation',
      component: ProgrammationTransition,
      inNav: true,
      isMapButtonVisible: true,
    },
    Installation: {
      path: '/installation/:installationSlug',
      name: 'Installation',
      component: Installation,
      inNav: false,
      isMapButtonVisible: true,
    },
    Success: {
      path: '/success/:installationSlug',
      name: 'Success',
      component: SuccessTransition,
      inNav: false,
      isMapButtonVisible: true,
    },
    Finish: {
      path: '/finish',
      name: 'Finish',
      component: FinishTransition,
      inNav: true,
      isMapButtonVisible: false,
    },
  },
}

export default config
