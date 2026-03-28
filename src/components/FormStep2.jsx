import { useState } from "react";
import "./FormStep2.css";



export default function FormStep2({data, updateFormData, forward, back}) {
   
    const [isMonthly, setIsMonthly] = useState(data.selectedTerm === 'monthly');
    const [selectedPlan, setSelectedPlan] = useState(data.selectedPlan ?? "arcade");
    const plans = data.plans;
    function togglePlan() {
        setIsMonthly(prev => !prev);
        updateFormData({ selectedTerm: isMonthly ? 'yearly' : 'monthly' });
    }

    return (<>
        <div className="form-step-2">
            <h1 className="title">Select your plan</h1>
            <p className="description">You have the option of monthly or yearly billing.</p>
            <div className="plans">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`plan-option ${selectedPlan === plan.id ? "active" : ""}`}
                        onClick={() => {
                            setSelectedPlan(plan.id);
                            updateFormData({ selectedPlan: plan.id });
                        }}
                    >
                        <img src={plan.icon} alt={plan.name.toLowerCase()} />
                        <div className="plan-info">
                        <p>{plan.name}</p>
                        <p>{isMonthly ? plan.monthlyPrice+'/mo' : plan.yearlyPrice + '/yr'}</p>
                        {!isMonthly && <p>2 months free</p>}
                       </div>
                    </div>
                ))}
            </div>
            <div className="billing-toggle" aria-label="Billing period switcher">
                <span className={isMonthly ? "toggle-label active" : "toggle-label"}>Monthly</span>
                <button
                    type="button"
                    className={`switch-toggle ${isMonthly ? "monthly" : "yearly"}`}
                    onClick={togglePlan}
                    role="switch"
                    aria-checked={!isMonthly}
                    aria-label={`Switch to ${isMonthly ? "yearly" : "monthly"} billing`}
                />
                <span className={!isMonthly ? "toggle-label active" : "toggle-label"}>Yearly</span>
            
             
            </div>
            <div className="btns">
               <button className="btn back" onClick={back}>Go Back</button>
               <button className="btn-next" onClick={forward}>Next Step</button>
             </div>
        </div>
        </>)
}