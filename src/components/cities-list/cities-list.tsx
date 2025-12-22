import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/action';
import { getCity } from '../../store/selectors';
import type { City } from '../../types/offer';

const CITIES: City['name'][] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function CitiesList(): JSX.Element {
  const dispatch = useDispatch();
  const currentCity = useSelector(getCity);

  const handleCityClick = useCallback((city: City['name']) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li key={city} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCityClick(city);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(CitiesList);

