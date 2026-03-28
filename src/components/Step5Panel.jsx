import './Step5Panel.css'


export default function Step5Panel({step}) {

return (
        <div className="form-step-5">
            <img src={'/assets/images/icon-thank-you.svg'} alt="thank you" className="thank-you"/>
            <h1 className="title">Thank you!</h1>
            <p className="description">
              Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
            </p>
          </div>
       
        
    );
}