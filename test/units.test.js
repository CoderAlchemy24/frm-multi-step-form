import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

const renderApp = () => render(React.createElement(App));

describe('App multi-step form flow', () => {
  it('renders step 1 by default and blocks forward on invalid data', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      screen.getByRole('heading', { name: 'Personal info', level: 1 })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next Step' }));

    // Still on step 1 because required fields are invalid.
    expect(
      screen.getByRole('heading', { name: 'Personal info', level: 1 })
    ).toBeInTheDocument();

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'not-an-email');
    await user.tab();

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('keeps form data when navigating back from step 2 to step 1', async () => {
    const user = userEvent.setup();
    renderApp();

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email Address');
    const phoneInput = screen.getByLabelText('Phone Number');

    await user.type(nameInput, 'Jane Doe');
    await user.type(emailInput, 'jane@example.com');
    await user.type(phoneInput, '+36 30 123 4567');

    await user.click(screen.getByRole('button', { name: 'Next Step' }));

    expect(
      screen.getByRole('heading', { name: 'Select your plan', level: 1 })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Go Back' }));

    expect(nameInput).toHaveValue('Jane Doe');
    expect(emailInput).toHaveValue('jane@example.com');
    expect(phoneInput).toHaveValue('+36 30 123 4567');
  });

  it('completes the full yearly flow with add-ons and shows final thank-you panel', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByLabelText('Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email Address'), 'jane@example.com');
    await user.type(screen.getByLabelText('Phone Number'), '+36 30 123 4567');
    await user.click(screen.getByRole('button', { name: 'Next Step' }));

    expect(
      screen.getByRole('heading', { name: 'Select your plan', level: 1 })
    ).toBeInTheDocument();

    await user.click(screen.getByText('Pro'));

    const billingSwitch = screen.getByRole('switch', {
      name: /switch to yearly billing/i,
    });
    expect(billingSwitch).toHaveAttribute('aria-checked', 'false');

    await user.click(billingSwitch);

    expect(
      screen.getByRole('switch', { name: /switch to monthly billing/i })
    ).toHaveAttribute('aria-checked', 'true');

    await user.click(screen.getByRole('button', { name: 'Next Step' }));

    expect(
      screen.getByRole('heading', { name: 'Pick add-ons', level: 1 })
    ).toBeInTheDocument();

    await user.click(screen.getByText('Online service'));
    await user.click(screen.getByText('Customizable profile'));

    await user.click(screen.getByRole('button', { name: 'Next Step' }));

    expect(
      screen.getByRole('heading', { name: 'Finishing up', level: 1 })
    ).toBeInTheDocument();

    expect(screen.getByText(/Pro\s*\(\s*Yearly\s*\)/)).toBeInTheDocument();
    expect(screen.getByText('$150/yr')).toBeInTheDocument();
    expect(screen.getByText(/Online service\s*:/)).toBeInTheDocument();
    expect(screen.getByText(/Customizable profile\s*:/)).toBeInTheDocument();
    expect(screen.getByText('$180/yr')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Go Back' }));

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Next Step' }));
    await user.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(
      screen.getByRole('heading', { name: 'Thank you!', level: 1 })
    ).toBeInTheDocument();
  });
});
