import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteListRequest} from '../../action'
class DeleteListButton extends Component {
	
  render() {
    
    return (
	    <p  className="delete-list cancel-button" onClick={()=>{this.props.onDeleteList(this.props.listId)}}>
	      
      </p>
    );
  }
}

export default connect(
     state => ({
       myStore: state
     }),
     dispatch => ({
        onDeleteList: (res)=> {

          dispatch(deleteListRequest({listId: res}));
       }
     })
     )(DeleteListButton);

