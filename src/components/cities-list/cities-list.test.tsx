import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';
import { renderWithProviders } from '../../utils/test-utils';

describe('Component: CitiesList', () => {
  it('должен подсвечивать активный город', () => {
    renderWithProviders(<CitiesList />);

    const parisLink = screen.getByText('Paris').closest('a');
    expect(parisLink).toHaveClass('tabs__item--active');
  });

  it('должен менять город при клике', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<CitiesList />);

    await user.click(screen.getByText('Amsterdam'));

    expect(store.getState().offersProcess.city).toBe('Amsterdam');
  });
});

