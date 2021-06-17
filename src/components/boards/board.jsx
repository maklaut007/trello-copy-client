import React, { Component } from 'react';
import {deleteBoardRequest} from '../../action'
import {connect} from 'react-redux';
class Board extends Component {
	constructor(props)  {
    	super();
      this.cutBoardName=this.cutBoardName.bind(this);
      this.deleteBoard=this.deleteBoard.bind(this);
  	}
    cutBoardName(name) {
      if(name.length>10){
        return name.slice(0, 14).concat("...")
      }
      return name
    }
    deleteBoard(e){
      e.preventDefault();
      this.props.onDeleteBoard(this.props.id)
    }
  render() {

    return (
	    <a href={`http://localhost:3000/b/${this.props.id}`} className="boards-menu__item board">
	    	 {this.cutBoardName(this.props.name)}
         <button type="button" onClick={this.deleteBoard} className="delete-board cancel-button"></button>
	    </a>
    );
  }
}

export default connect(
     state => ({
       myStore: state
     }),
     dispatch => ({

       onDeleteBoard: (id)=> {
          dispatch(deleteBoardRequest({boardId : id}));
       }
     })
     )(Board);

