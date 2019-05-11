interface pageInterface {
  // show?: boolean
  // A refacto pour un type match ?
  match?: any
}

interface pageTransitionInterface {
  show: boolean
  match?: any
}

export type pageProps = pageInterface

export type pageTransitionProps = pageTransitionInterface
