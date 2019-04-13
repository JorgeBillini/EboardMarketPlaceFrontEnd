import React from 'react';

const SubTotalTile = props => { 
    return (
        <>
        <div style={{justifyContent:'center',marginTop:"2rem"}} className="tile is-ancestor">
        <div className="tile is-4 is-vertical is-parent">
        <div className="tile is-child box">
        <p className="title">Subtotal</p>
        <p>${props.subtotal}</p>
      <p>This is your subtotal price before taxes & fees</p>
      <button className="button is-success">Proceed to checkout </button>
    </div>
    </div>
    </div>
        </>
    )
}

export default SubTotalTile;