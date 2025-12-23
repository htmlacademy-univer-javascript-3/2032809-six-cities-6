import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './sort-options';
import { renderWithProviders } from '../../utils/test-utils';

describe('Component: SortOptions', () => {
  it('должен открывать список сортировки по клику', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SortOptions />);

    const toggle = screen.getAllByText('Popular')[0];
    await user.click(toggle);

    const list = screen.getByRole('list');
    expect(list).toHaveClass('places__options--opened');
  });

  it('должен менять тип сортировки и закрывать список', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<SortOptions />);

    await user.click(screen.getAllByText('Popular')[0]);
    await user.click(screen.getByText('Top rated first'));

    expect(store.getState().offersProcess.sortType).toBe('Top rated first');
    const list = screen.getByRole('list');
    expect(list).not.toHaveClass('places__options--opened');
  });
});

