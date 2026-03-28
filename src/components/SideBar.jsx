import './SideBar.css';

export default function SideBar({ step }) {

    return (
        <div className="side-bar">
            <div className="side-bar_steps">
              <div id="step-1">
                <div className={`num ${step === 1 ? 'selected' : ''}`}><span className='numchr'>1</span></div>
                <div className="texts">
                    <p className="text1"> Step 1</p>
                    <p className='text2'>
                       Your info
                    </p>
                </div>
              </div>
              <div id="step-2">
                <div className={`num ${step === 2 ? 'selected' : ''}`}><span className='numchr'>2</span></div>
                <div className="texts">
                    <p className="text1"> Step 2</p>
                    <p className='text2'>
                       Select plan
                    </p>
                </div>
              </div>
              <div id="step-3">
                <div className={`num ${step === 3 ? 'selected' : ''}`}><span className='numchr'>3</span></div>
                <div className="texts">
                    <p className="text1"> Step 3</p>
                    <p className='text2'>
                       Add-ons
                    </p>
                </div>
              </div>
              <div id="step-4">
                <div className={`num ${step === 4 ? 'selected' : ''}`}><span className='numchr'>4</span></div>
                <div className="texts">
                    <p className="text1"> Step 4</p>
                    <p className='text2'>
                       Summary
                    </p>
                </div>
              </div>
            </div>
        </div>
    );
}