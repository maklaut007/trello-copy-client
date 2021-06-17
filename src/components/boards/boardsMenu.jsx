import React, { Component } from 'react';
import {connect} from 'react-redux';
import Board from './board';
import AddBoard from './addBoard';
import {requestBoardsList} from '../../action'
class BoardsMenu extends Component {
	constructor(props){
		super();
		this.returnBoardsList=this.returnBoardsList.bind(this);

	}
  componentDidMount(){
    this.props.onRequestBoardsList()
  }
	returnBoardsList(){
		let boardsArr=this.props.myStore.boards
		let arr=[];
		for (var i = 0; i <=boardsArr.length - 1; i++) {
			arr.push(<Board key={boardsArr[i]._id} id={boardsArr[i]._id} name={boardsArr[i].boardName}/>)
		}
		return arr
	}
  	render() {
    	return (
      	<div className="boards-menu">
          
        		{this.returnBoardsList()}
          
        	<AddBoard/>
        	
      	</div>
    	);
  	}
}

export default connect(
     state => ({
     	myStore: state
     }),
     dispatch => ({
       onRequestBoardsList: ()=>{
         dispatch(requestBoardsList())
       }
     })
     )(BoardsMenu);
