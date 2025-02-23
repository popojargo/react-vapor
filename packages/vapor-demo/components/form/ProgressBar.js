import {useState} from 'react';

export default function ProgressBar() {
    const [width, setWidth] = useState(40);
    const setRandomWidth = () => setWidth(Math.floor(Math.random() * Math.floor(100)));
    return (
        <>
            <div className="bg-medium-blue progress-bar-example-container">
                <div className="progress-bar" style={{width: 400}}>
                    <div className="progress">
                        <span className="progress-bar-completed" style={{width: width + '%'}} />
                    </div>
                </div>
            </div>

            <button className="btn mod-primary mt2" onClick={setRandomWidth}>
                Test progression
            </button>
        </>
    );
}
