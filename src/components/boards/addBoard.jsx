import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sendBoardToServer} from '../../action'

class AddBoard extends Component {
	constructor(props)  {
    	super();
      this.state= {
        nameOfBoard: ""
      };
      this.handleBaordNameChange=this.handleBaordNameChange.bind(this);
      this.addBoard=this.addBoard.bind(this);
  	}
  addBoard(event){
    event.preventDefault();
      if(/\S/.exec(this.state.nameOfBoard)){
          this.props.onAddBoard(this.state.nameOfBoard)
      }
      
  }
   handleBaordNameChange(e){
     this.setState({nameOfBoard: e.target.value});
  }
  render() {
    return (
	    <div  className="add-board boards-menu__item">
          <p className="add-board__title"> Create new board...</p>
          <form>
	    	    <input type="text" value={this.state.nameOfBoard} onChange={this.handleBaordNameChange} className="add-board__input"/>
            <button onClick={this.addBoard} className="add-board__button">Submit</button>
          </form>
	    </div>
    );
  }
}

export default connect(
     state => ({
       myStore: state
     }),
     dispatch => ({

        onAddBoard: (bn)=> {
          dispatch(sendBoardToServer({boardName : bn}));
       }
     })
     )(AddBoard);

