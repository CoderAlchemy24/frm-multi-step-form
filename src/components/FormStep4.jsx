import './FormStep4.css';

export default function FormStep4({step,data, forward, back}) {
    
    const price = data.selectedTerm === 'monthly' ? 
                `${data.plans.find(p => p.id === data.selectedPlan).monthlyPrice}` 
                : `${data.plans.find(p => p.id === data.selectedPlan).yearlyPrice}`
    const addonsPrice = data.addons.reduce((acc, selected, index) => {
        if (selected) {
            const option = data.options[index];
            return acc + (data.selectedTerm === 'monthly' ?
                 Number(option.monthlyPrice) : Number(option.yearlyPrice));
        }
        return acc;
    }, 0);
    const totalPrice = data.selectedTerm === 'monthly' ? 
    `$${Number(price) + Number(addonsPrice)}/mo` 
    : `$${Number(price) + Number(addonsPrice)}/yr`;        
    
    return (<>
        <div className="form-step-4">
          <h1 className="title">Finishing up</h1>
          <p className='description'>Double-check everything looks OK before confirming.</p>
            
          <div className='summary'>  
            <h2 className='sub-title'><span >{data.selectedPlan.charAt(0).toUpperCase() 
            + data.selectedPlan.slice(1)}
             ({data.selectedTerm.charAt(0).toUpperCase() 
             + data.selectedTerm.slice(1)})</span>
             <span className='price'>{`$${price}/${data.selectedTerm === 'monthly' ? 'mo' : 'yr'}`}</span>
                </h2>
            
            <div className='addons'>
                {data.addons.map((selected, index) => {
                    if (!selected) return null;
                    const option = data.options[index];
                    return (
                        <div key={option.id} className='addon'>
                            <span>{option.name}:</span>
                            <span>{data.selectedTerm === 'monthly' ? `$${option.monthlyPrice}/mo` : `$${option.yearlyPrice}/yr`}</span>
                        </div>
                    );
                })}
            </div>
          
            
          </div> 
          <p className='sum'><span >{`Total ${data.selectedTerm === 'monthly' ? ' (per month): ' : ' (per year): '}`}</span>
               <span className='totalprice'>{totalPrice}</span>
            </p>
          <div className="btns">
                <button className="btn back" onClick={back}>Go Back</button>
                <button className="btn-confirm" onClick={forward}>Confirm</button>
          </div>
        </div>
    </>
    );
}
