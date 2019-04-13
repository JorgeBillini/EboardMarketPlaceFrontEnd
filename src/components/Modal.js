import React from 'react';
const Modal = props => {
    if(!props.modalState) {
      return null;
    }
    
    return(
      <div  className="modal is-active">
        <div className="modal-background" onClick={props.closeModal} />
        <div className="modal-card">
        <div style={{textAlign:'right'}}>
        <button className="delete" onClick={props.closeModal} />

        </div>
          <section className="modal-card-body">
            <div className="content">
              {props.email}
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  
  
  export default class ModalComponent extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        modalState: false
      };
      
      this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal() {    
      this.setState((prev, props) => {
        const newState = !prev.modalState;
        
        return { modalState: newState };
      });
    }
    
    render() {
      return(

          <div className="container">
              <a className="button is-warning" onClick={this.toggleModal}>
                Contact this Store
              </a>
            
            <Modal 
              closeModal={this.toggleModal} 
              modalState={this.state.modalState} 
              title="Contact info"
              email = {this.props.email}
            >

            </Modal>
          </div>
      );
    }
  }