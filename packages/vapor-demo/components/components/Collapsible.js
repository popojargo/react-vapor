import {useState} from 'react';

const Collapsible = () => {
    const [expanded1, setExpanded1] = useState(true);
    const [expanded2, setExpanded2] = useState(false);

    return (
        <ul className="collapsible" data-collapsible="expandable">
            <li>
                <button
                    type="button"
                    className="collapsible-header active btn with-icon"
                    onClick={() => setExpanded1(!expanded1)}
                >
                    Text example
                </button>
                <div className="collapsible-body" style={{display: expanded1 ? 'block' : ''}}>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </li>
            <li>
                <button
                    type="button"
                    className="collapsible-header btn with-icon"
                    onClick={() => setExpanded2(!expanded2)}
                >
                    Inputs
                </button>
                <div className="collapsible-body" style={{display: expanded2 ? 'block' : ''}}>
                    <div className="coveo-form">
                        <fieldset className="form-group input-field mod-fixed-width">
                            <input type="text" required />
                            <label>Input 1</label>
                        </fieldset>
                        <fieldset className="form-group input-field mod-fixed-width">
                            <input type="text" required />
                            <label>Input 2</label>
                        </fieldset>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default Collapsible;
