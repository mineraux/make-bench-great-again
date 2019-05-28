import HomeTransition from '../pages/Home/Transition'
import MapTransition from '../pages/Map/Transition'
import TwitterTransition from '../pages/Twitter/Transition'
import AdminTransition from '../pages/Admin/Transition'
import ComponentsTransition from '../pages/Components/Transition'
import InstallationTransition from '../pages/Installation/Transition'
import FinishTransition from '../pages/Finish/Transition'
import SuccessTransition from '../pages/Success/Transition'

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
      name: 'Components',
      component: ComponentsTransition,
      inNav: true,
    },
    Installation: {
      path: '/installation/:installationSlug',
      name: 'Installation',
      component: InstallationTransition,
      inNav: false,
    },
    Success: {
      path: '/success/:installationName',
      name: 'Success',
      component: SuccessTransition,
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
