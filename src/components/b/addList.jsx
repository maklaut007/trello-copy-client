import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sendListToServer} from '../../action'

class AddList extends Component {
	constructor(props)  {
    	super();
      this.state= {
        nameOfList: "",
        isAddingList: false
      };
      this.handleListNameChange=this.handleListNameChange.bind(this);
      this.addList=this.addList.bind(this);
      this.addingListMenu=this.addingListMenu.bind(this);
      this.addingListStateChange=this.addingListStateChange.bind(this);
  	}

    addList(e){
    if(/\S/.exec(this.state.nameOfList)){
      this.props.onAddList(this.state.nameOfList)
      this.setState({
        nameOfList: ""
     })
    }
    this.addingListStateChange();
  }
  handleListNameChange(e){
     this.setState({nameOfList: e.target.value});
  }
  addingListStateChange(){
    let oposit = !this.state.isAddingList
     this.setState({isAddingList: oposit});
  }
  addingListMenu(){
    if(!this.state.isAddingList){
      return <div className="open-add-list lists-menu__item" onClick={this.addingListStateChange}>+ Add another list</div>
    }else{  return <div  className="add-list lists-menu__item">
            <input  type="text" placeholder="Enter list title..." value={this.state.nameOfList} onChange={this.handleListNameChange}/>
            <div className="add-card-menu">
              <button onClick={this.addList}>Add list</button>
              <div className="cancel-button"  onClick={this.addingListStateChange}></div>
            </div>
      </div>
    }

  }
  render() {
    return (
	    <>
          {this.addingListMenu()}
	    </>
    );
  }
}

export default connect(
     state => ({
       myStore: state
     }),
     dispatch => ({

        onAddList: (ln)=> {
          dispatch(sendListToServer({listName : ln}));
       }
     })
     )(AddList);

