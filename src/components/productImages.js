import React from 'react';
import loading from '../assets/Ball-1s-200px.gif'
const imageHero = props => {
    return (
        <>
            <section key={"hero"} className="hero is-small">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns" >
                            {
                                props.images.map((e, i) => {
                                    return (<>
                                        <div key={i}>
                                            <div key={i} className="column">
                                                <figure key={i} className="image 256x256">
                                                    <img key={i} src={e} alt={loading} />
                                                </figure>
                                            </div>
                                        </div>

                                    </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
export default imageHero