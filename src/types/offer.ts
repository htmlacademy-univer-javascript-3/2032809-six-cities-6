export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
  location: Location;
};

export type Host = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  type: 'room' | 'apartment' | 'house' | 'hotel';
  price: number;
  images: string[];
  city: City;
  location: Location;
  goods: string[];
  host: Host;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number; // 0-5
  bedrooms: number;
  maxAdults: number;
};


