import offerProcessReducer from './offer-process';
import { loadNearbyOffers, loadOffer, loadReviews, updateOfferFavoriteStatus } from '../action';
import { makeFakeOffer, makeFakeReview } from '../../utils/test-mocks';

describe('Reducer: offerProcess', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = offerProcessReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      currentOffer: null,
      nearbyOffers: [],
      reviews: [],
    });
  });

  it('должен загрузить предложение при loadOffer', () => {
    const offer = makeFakeOffer({ id: '42' });

    const state = offerProcessReducer(undefined, loadOffer(offer));

    expect(state.currentOffer).toEqual(offer);
  });

  it('должен загрузить соседние предложения при loadNearbyOffers', () => {
    const nearbyOffers = [makeFakeOffer({ id: 'n-1' }), makeFakeOffer({ id: 'n-2' })];

    const state = offerProcessReducer(undefined, loadNearbyOffers(nearbyOffers));

    expect(state.nearbyOffers).toEqual(nearbyOffers);
  });

  it('должен загрузить отзывы при loadReviews', () => {
    const reviews = [makeFakeReview({ id: 'r-1' })];

    const state = offerProcessReducer(undefined, loadReviews(reviews));

    expect(state.reviews).toEqual(reviews);
  });

  it('должен обновить признак избранного в текущем и соседних предложениях', () => {
    const targetId = 'offer-fav';
    const initialOffers = [makeFakeOffer({ id: targetId, isFavorite: false }), makeFakeOffer({ id: 'other', isFavorite: false })];
    const initialState = {
      currentOffer: makeFakeOffer({ id: targetId, isFavorite: false }),
      nearbyOffers: initialOffers,
      reviews: [],
    };

    const state = offerProcessReducer(initialState, updateOfferFavoriteStatus(targetId, true));

    expect(state.currentOffer?.isFavorite).toBe(true);
    expect(state.nearbyOffers.find((offer) => offer.id === targetId)?.isFavorite).toBe(true);
    expect(state.nearbyOffers.find((offer) => offer.id === 'other')?.isFavorite).toBe(false);
  });
});

