import * as React from 'react';
import MultipleData from './components/MultipleData';

const dataArray = [
  {
    image: 'https://i.ytimg.com/vi/kHjzuqq3b44/maxresdefault.jpg',
    cardTitle: 'Bob Dylan',
    cardDescription:
      'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
    button: {
      url: 'https://en.wikipedia.org/wiki/Bob_Dylan',
      label: 'Go to wikipedia',
    },
  },
  {
    image: 'https://i.ytimg.com/vi/kHjzuqq3b44/maxresdefault.jpg',
    cardTitle: 'Bob Dylan',
    cardDescription:
      'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
    button: {
      url: 'https://en.wikipedia.org/wiki/Bob_Dylan',
      label: 'Go to wikipedia',
    },
  },
];

export default function App() {
  return <MultipleData dataArray={dataArray} />;
}
