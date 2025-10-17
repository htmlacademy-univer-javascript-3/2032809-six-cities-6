export type Offer = {
  id: number;
  city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
  isPremium: boolean;
  previewImage: string;
  price: number;
  isFavorite: boolean;
  rating: number; // 0-5
  title: string;
  type: 'Apartment' | 'Room' | 'House' | 'Hotel';
};

export const offers: Offer[] = [
  {
    id: 1701,
    city: 'Amsterdam',
    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    isFavorite: false,
    rating: 4.8,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 1702,
    city: 'Amsterdam',
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    isFavorite: true,
    rating: 4.0,
    title: 'Wood and stone place',
    type: 'Room',
  },
  {
    id: 1703,
    city: 'Cologne',
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    isFavorite: true,
    rating: 4.0,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 1704,
    city: 'Amsterdam',
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    isFavorite: true,
    rating: 5.0,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
];


