import {useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import FormStep1 from './components/FormStep1';
import FormStep2 from './components/FormStep2';
import FormStep3 from './components/FormStep3';
import FormStep4 from './components/FormStep4';
import Step5Panel from './components/Step5Panel';

export default function App() {

  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
  // Step1
  name: '',
  email: '',
  phone: '',
  // Step2
  plans: [
    {
        id: "arcade",
        name: "Arcade",
        monthlyPrice: "9",
        yearlyPrice: "90",
        icon: "./assets/images/icon-arcade.svg",
    },
    {
        id: "advanced",
        name: "Advanced",
        monthlyPrice: "12",
        yearlyPrice: "120",
        icon: "./assets/images/icon-advanced.svg",
    },
    {
        id: "pro",
        name: "Pro",
        monthlyPrice: "15",
        yearlyPrice: "150",
        icon: "./assets/images/icon-pro.svg",
    },
],
  options: [
  { id: 0, name: "Online service", description: "Access to multiplayer games", monthlyPrice: 1, yearlyPrice: 10 },
  { id: 1, name: "Larger storage", description: "Extra 1TB of cloud save", monthlyPrice: 2, yearlyPrice: 20 },
  { id: 2, name: "Customizable profile", description: "Custom theme on your profile", monthlyPrice: 2, yearlyPrice: 20 },
],
  selectedPlan: "arcade",      // "arcade" | "advanced" | "pro"
  selectedTerm: 'monthly',  // "monthly" | "yearly"
  // Step3
  addons: [false, false, false]
});

  const updateFormData = (updates) => {
   setFormData(prev => ({ ...prev, ...updates }));
};

  return (
    <div className="app">
      <SideBar step={step} className="sidebar-cont"/>
      {step === 1 && <FormStep1 data={formData} updateFormData={updateFormData} step={1} forward={() => setStep(2)}/>}
      {step === 2 && <FormStep2 data={formData} updateFormData={updateFormData} step={2} forward={() => setStep(3)} back={() => setStep(1)}/>}
      {step === 3 && <FormStep3 data={formData} updateFormData={updateFormData} step={3} forward={() => setStep(4)} back={() => setStep(2)}/>}
      {step === 4 && <FormStep4 data={formData} step={4} forward={() => setStep(5)} back={() => setStep(3)}/>}
      {step === 5 && <Step5Panel data={formData} />}
    </div>
  )
}