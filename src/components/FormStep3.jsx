import './FormStep3.css'


export default function FormStep3({data, updateFormData, forward, back }) {

  const toggleOption = (index) => {
    updateFormData({ addons: data.addons.map((val, i) => i === index ? !val : val) });
  };

  const options = data.options;
  

  return (
    <div className="form-step-3">
      <div className="form">
        <h1 className="title">Pick add-ons</h1>
        <p className="description">Add-ons help enhance your gaming experience.</p>
        <ul>
          {data.options.map((option) => (
            <li
              className={data.addons[option.id] ? "li selected" : "li"}
              key={option.id}
              onClick={() => toggleOption(option.id)}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleOption(option.id);
                }
              }}
            >
              <input type="checkbox" className="checkbox" id={option.id} checked={data.addons[option.id]} onChange={() => toggleOption(option.id)} />
              <div className='texts'>{option.name}
                <span className="option-description">{option.description}</span>
              </div>
              <span className="price">
                {data.selectedTerm === 'monthly' ? `+$${option.monthlyPrice}/mo` : `+$${option.yearlyPrice}/yr`}
              </span>
            </li>
          ))}
        </ul>
        <div className="btns">
          <button className="btn back" onClick={back}>Go Back</button>
          <button className="btn-next" onClick={forward}>Next Step</button>
        </div>
      </div>
    </div>
  );
}