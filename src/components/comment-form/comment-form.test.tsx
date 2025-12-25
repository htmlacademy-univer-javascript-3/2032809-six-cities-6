import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './comment-form';

describe('Component: CommentForm', () => {
  it('активирует отправку после выбора рейтинга и текста и сбрасывает форму', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CommentForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();

    await user.click(screen.getByLabelText('5 stars'));
    await user.type(screen.getByRole('textbox'), 'a'.repeat(50));
    await user.click(submitButton);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(5, 'a'.repeat(50)));
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('radio', { name: '5 stars' })).not.toBeChecked();
  });
});

