import { render, screen } from '@testing-library/react';
import EmptyMain from './empty-main';

describe('Component: EmptyMain', () => {
  it('должен выводить текст об отсутствии предложений', () => {
    render(<EmptyMain city="Amsterdam" />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/in Amsterdam/i)).toBeInTheDocument();
  });
});

