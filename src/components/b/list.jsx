import React, { Component } from 'react';
import {connect} from 'react-redux';
import Card from './card';
import DeleteListButton from './deleteListButton';
import AddCardField from './addCardField';
import { deleteCardRequest, addCard, deleteCard, sendChangedList} from '../../action'
import { DropTarget } from 'react-dnd';

const targetReact = {

	canDrop(props, monitor, component) {
		return true
	},

	hover(props, monitor, component) {
		const item = monitor.getItem();
		if(item.listId!==props.id){
			component.moveCardToAnotherList({_id: item.id, cardName: item.name}, props.id, item.listId);
			item.listId=props.id;
			item.index=props.cards.length-1;
		}
		
	},

	drop(props, monitor, component) {
		component.sendChangedList(monitor.getItem().index)
		return undefined
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		isOver: monitor.isOver(),	
		isOverCurrent: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		itemType: monitor.getItemType(),
		item: monitor.getItem(),
	}
}



class List extends Component {
	constructor(props)  {
			super();
			this.state={
				addingCard: false
			}
			this.addCardMenu=this.addCardMenu.bind(this);
			this.changeAddCardMenu=this.changeAddCardMenu.bind(this);
			this.returnCards=this.returnCards.bind(this);
			this.moveCardToAnotherList=this.moveCardToAnotherList.bind(this);
			this.sendChangedList=this.sendChangedList.bind(this);
			this.removeCard=this.removeCard.bind(this);
		}


		moveCardToAnotherList(card, targetListId, sourceListId){
				this.props.onMoveCardToAnotherList(card, targetListId, sourceListId)
			}

		sendChangedList(){
			this.props.onSendChangedList(this.props.id, this.props.cards)
		}	

		changeAddCardMenu(){
			this.setState({
				addingCard: !this.state.addingCard
			})
		}
		
		removeCard(cardId, listId){
			this.props.onRemoveCard(cardId, listId)
		}
		returnCards(){
			let cardsArr=this.props.cards
			let arr=cardsArr.map((card, i)=>
				{  
					return <Card key={card._id} index={i} removeCard={this.removeCard} listId={this.props.id} id={card._id}  name={card.cardName}/>
				});
			return arr
		}
		addCardMenu(){
			if(this.state.addingCard){
				return <div className="add-card" onClick={this.changeAddCardMenu}>Add Card</div>
			}
			else
			{
				return <AddCardField listId={this.props.id}/>
			}
		}
		moveItem(){
			console.log("delete item")
		}
	render() {
		const {  connectDropTarget } = this.props;
		
		return connectDropTarget(
				<div className="lists-menu__item list" >
					<h3 className=" list__item">
						<p className="list-title">{this.props.name}</p>
						<DeleteListButton listId={this.props.id}/>
					</h3>
					
					{this.returnCards()}
					{this.addCardMenu()}
					
				</div>
				
			
		);
	}
}
List = DropTarget('card', targetReact, collect)(List);
export default connect(
		 state => ({
			 myStore: state
		 }),
		 dispatch => ({
		 	onRemoveCard: (cardId, listId)=> {
					dispatch(deleteCardRequest({cardId : cardId, listId: listId}));
			 },
			 onMoveCardToAnotherList: (card, targetListId, sourceListId)=> {
					dispatch(addCard({card : card, listId: targetListId}));
					dispatch(deleteCard({cardId : card._id, listId: sourceListId}));
			 },
			 onSendChangedList: (listId, cards)=> {
					dispatch(sendChangedList({listId: listId, cards: cards}));
			 }
		 })
)(List);
