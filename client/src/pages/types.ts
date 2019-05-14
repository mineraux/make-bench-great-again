interface pageInterface {
  // show?: boolean
  // A refacto pour un type match ?
  match?: any
  history?: any
}

interface pageTransitionInterface {
  show: boolean
  match?: any
  history?: any
}

export type pageProps = pageInterface

export type pageTransitionProps = pageTransitionInterface
