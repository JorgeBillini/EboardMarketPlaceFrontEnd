import React from 'react';
import { faTachometerAlt, faAngleDoubleRight,faCog,faCookie} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Specs = props => {
    console.log(props.specs)
    return (
        <>
            <section className="hero is-medium is-info is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                        Product Specifications
                         </h1>
                        <h2 className="subtitle">
                        <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon>
                        <p style={{marginLeft:'10px',display:'inline'}}> {props.specs.topSpeed} MPH </p>
                        <hr></hr>
                        <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                        <p style={{marginLeft:'10px',display:'inline'}}> {props.specs.range} Miles </p>
                        <hr></hr>
                        <FontAwesomeIcon icon={faCog} />
                        <p style={{marginLeft:'10px',display:'inline'}}> {props.specs.drive} </p>
                        <hr></hr>
                        <FontAwesomeIcon icon={faCookie} />
                        <p style={{marginLeft:'10px',display:'inline'}}> {props.specs.deck} </p>
                        </h2>
                    </div>
                    </div>
                </section>
        </>
    )
   
}
export default Specs;