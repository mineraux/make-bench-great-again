import imgAlex from './alex.jpg'
import imgRobin from './robin.jpg'
import imgClara from './clara.jpg'
import imgManon from './manon.jpg'

interface Interface {
  id: string
  url: string
  image: any
  author: string
  likeCount: string
}

const data: Interface[] = [
  {
    id: '0',
    url: '#',
    image: imgClara,
    author: 'clarav',
    likeCount: '200',
  },
  {
    id: '1',
    url: '#',
    image: imgRobin,
    author: 'rob1',
    likeCount: '200',
  },
  {
    id: '2',
    url: '#',
    image: imgManon,
    author: 'manonc',
    likeCount: '200',
  },
  {
    id: '3',
    url: '#',
    image: imgAlex,
    author: 'alexm',
    likeCount: '200',
  },
  {
    id: '4',
    url: '#',
    image: imgClara,
    author: 'clarav',
    likeCount: '200',
  },
  {
    id: '5',
    url: '#',
    image: imgRobin,
    author: 'rob1',
    likeCount: '200',
  },
  {
    id: '6',
    url: '#',
    image: imgManon,
    author: 'manonc',
    likeCount: '200',
  },
  {
    id: '7',
    url: '#',
    image: imgAlex,
    author: 'alexm',
    likeCount: '200',
  },
]

export default data
