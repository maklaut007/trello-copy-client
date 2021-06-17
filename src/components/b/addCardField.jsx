import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sendCardToServer} from '../../action'

class AddCardField extends Component {
	constructor(props)  {
			super();
				this.state= {
					nameOfCard: "",
					isAddingCard: false
				};
				this.handleCardNameChange=this.handleCardNameChange.bind(this);
				this.addCard=this.addCard.bind(this);
				this.addingCardMenu=this.addingCardMenu.bind(this);
				this.addingCardMenuStateChange=this.addingCardMenuStateChange.bind(this);
		}
	handleCardNameChange(e){
		this.setState({nameOfCard: e.target.value});
		
	}
	addCard(event){
		event.preventDefault();
		if(/\S/.exec(this.state.nameOfCard)){
		 this.props.onAddCard(this.state.nameOfCard, this.props.listId);
		 this.addingCardMenuStateChange();
	 }
	 this.setState({
		 nameOfCard: ""
	 })
	}
	addingCardMenuStateChange(){
		let oposit = !this.state.isAddingCard
		 this.setState({isAddingCard: oposit});
	}
	addingCardMenu(){
		if(!this.state.isAddingCard){
			return <div className="open-add-card" onClick={this.addingCardMenuStateChange}>+ Add another card</div>
		}else{  return <div className="add-card-field" >
						<textarea placeholder="Enter title for this card..." type="text" value={this.state.nameOfCard} onChange={this.handleCardNameChange}></textarea>
						<div className="add-card-menu">
							<button onClick={this.addCard}>Add card</button>
							<div className="cancel-button"  onClick={this.addingCardMenuStateChange}></div>
						</div>
					</div>
		}

	}
	render() {
		return (
				<div className="list_item">
						{this.addingCardMenu()}
				</div>
		);
	}
}

export default connect(
		 state => ({
			 myStore: state
		 }),
		 dispatch => ({

				onAddCard: (cn, id)=> {
					console.log(cn, id)
					dispatch(sendCardToServer({cardName : cn, listId:id}));
			 }
		 })
		 )(AddCardField);