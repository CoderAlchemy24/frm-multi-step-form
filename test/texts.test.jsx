import { render, screen } from '@testing-library/react';
import App from '../src/App';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

describe('App', () => {
  it('renders', async () => {
    
    render(<App/>);

    
   expect(screen.getByText('Personal info')).toBeVisible();
   expect(screen.getByText('Please provide your name, email address and phone number.')).toBeVisible();
   expect(screen.getByText('Name')).toBeVisible();
   expect(screen.getByText('Email Address')).toBeVisible();
   expect(screen.getByText('Phone Number')).toBeVisible();

    
})});

 
    it('Next button is visible', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'Next Step' })).toBeVisible();
});

 it('inputs have these placeholders', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('e.g. Stephen King')).toBeVisible();   //Name
    expect(screen.getByPlaceholderText('e.g. stephenking@lorem.com')).toBeVisible(); // Email
    expect(screen.getByPlaceholderText('e.g. +1 234 567 890')).toBeVisible();      // Phone
  })

it('Error messages are shown on empty name input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Name');
    await user.click(nameInput);
    await user.tab();

  const nameLabel = screen.getByText('Name');
  const nameError = nameLabel.parentElement.querySelector('.error-label');

  expect(nameError).toHaveTextContent('This field is required');
  expect(nameError).toHaveClass('active');
});


it('Error messages are shown on invalid emailinput', async () => {
    const user = userEvent.setup();
  render(<App />);

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    expect(screen.getByText('Invalid email address')).toBeVisible();
});

it('Error messages are shown on invalid phone input', async () => {
    const user = userEvent.setup();
  render(<App />);

    const phoneInput = screen.getByLabelText('Phone Number');
    await user.type(phoneInput, 'invalid-phone');
    await user.tab();

    expect(screen.getByText('Invalid phone number')).toBeVisible();
});

it('moves to step 2 if all fields are valid', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'Stephen King');
    await user.tab();

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'stephenking@lorem.com');
    await user.tab();

    const phoneInput = screen.getByLabelText('Phone Number');
    await user.type(phoneInput, '+1 234 567 890');
    await user.tab();

    const nextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(nextButton);

   
    expect(screen.getByText('Select your plan')).toBeVisible();
    expect(screen.getByText('You have the option of monthly or yearly billing.')).toBeVisible();
    expect(screen.getByText('Arcade')).toBeVisible();
    expect(screen.getByText('Advanced')).toBeVisible();
    expect(screen.getByText('Pro')).toBeVisible();
    expect(screen.getByRole('switch', { name: /switch to yearly billing/i })).toBeVisible();  
  
  });

  it('it moves to step3 if user clicks the Next button on step2', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'Stephen King');
    await user.tab();

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'stephenking@lorem.com');
    await user.tab();

    const phoneInput = screen.getByLabelText('Phone Number');
    await user.type(phoneInput, '+1 234 567 890');
    await user.tab();

    const step1NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step1NextButton);

    expect(screen.getByText('Select your plan')).toBeVisible();
    await user.click(screen.getByText('Pro'));

    const step2NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step2NextButton);

    expect(screen.getByText('Pick add-ons')).toBeVisible();
    expect(screen.getByText('Add-ons help enhance your gaming experience.')).toBeVisible();
    expect(screen.getByText('Online service')).toBeVisible();
    expect(screen.getByText('Access to multiplayer games')).toBeVisible();
    expect(screen.getByText('Larger storage')).toBeVisible();
    expect(screen.getByText('Extra 1TB of cloud save')).toBeVisible();  
    expect(screen.getByText('Customizable profile')).toBeVisible();
    expect(screen.getByText('Custom theme on your profile')).toBeVisible();
  });

  it('it moves to step4 if user clicks the Next button on step3', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'Stephen King');
    await user.tab();

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'stephenking@lorem.com');
    await user.tab();

    const phoneInput = screen.getByLabelText('Phone Number');
    await user.type(phoneInput, '+1 234 567 890');
    await user.tab();

    const step1NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step1NextButton);

    expect(screen.getByText('Select your plan')).toBeVisible();
    await user.click(screen.getByText('Pro'));

    const step2NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step2NextButton);

    const step3NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step3NextButton); 
    expect(screen.getByText('Finishing up')).toBeVisible();
    expect(screen.getByText('Double-check everything looks OK before confirming.')).toBeVisible();
  });

  it('it moves to step5 if user clicks the Next button on step4', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'Stephen King');
    await user.tab();

    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'stephenking@lorem.com');
    await user.tab();

    const phoneInput = screen.getByLabelText('Phone Number');
    await user.type(phoneInput, '+1 234 567 890');
    await user.tab();

    const step1NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step1NextButton);


    const step2NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step2NextButton);

    const step3NextButton = screen.getByRole('button', { name: 'Next Step' });
    await user.click(step3NextButton); 
    expect(screen.getByText('Finishing up')).toBeVisible();
    expect(screen.getByText('Double-check everything looks OK before confirming.')).toBeVisible();
  
  
    const step4NextButton = screen.getByRole('button', { name: 'Confirm'  });
    await user.click(step4NextButton);

    expect(screen.getByText('Thank you!')).toBeVisible();
    expect(screen.getByText('Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.')).toBeVisible(); 
  }); 