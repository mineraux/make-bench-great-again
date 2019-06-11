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
    likeCount: '20',
  },
  {
    id: '1',
    url: '#',
    image: imgRobin,
    author: 'rob1',
    likeCount: '12',
  },
  {
    id: '2',
    url: '#',
    image: imgManon,
    author: 'manonc',
    likeCount: '13',
  },
  {
    id: '3',
    url: '#',
    image: imgAlex,
    author: 'alexm',
    likeCount: '22',
  },
  {
    id: '4',
    url: '#',
    image: imgClara,
    author: 'clarav',
    likeCount: '28',
  },
  {
    id: '5',
    url: '#',
    image: imgRobin,
    author: 'rob1',
    likeCount: '21',
  },
  {
    id: '6',
    url: '#',
    image: imgManon,
    author: 'manonc',
    likeCount: '8',
  },
  {
    id: '7',
    url: '#',
    image: imgAlex,
    author: 'alexm',
    likeCount: '14',
  },
]

export default data
