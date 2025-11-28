import type { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: '2',
    user: {
      name: 'Angelina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment: 'Perfect location, beautiful apartment, and great host. Highly recommend!',
    date: '2019-05-15',
  },
  {
    id: '3',
    user: {
      name: 'John',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-max.jpg',
      isPro: false,
    },
    rating: 3,
    comment: 'Nice place but could use some improvements. The location is great though.',
    date: '2019-06-20',
  },
];

