import React, { Component } from 'react';
import { DragSource, DropTarget} from 'react-dnd';
import { compose } from 'redux'
import {connect} from 'react-redux';
import { findDOMNode } from 'react-dom';
import {moveCard} from '../../action'


const cardTarget = {

  canDrop(props, monitor, component) {
	return true
  },

  hover(props, monitor, component) {

	const item = monitor.getItem()
	const dragIndex = monitor.getItem().index;
	const hoverIndex = props.index;
	const sourceListId = monitor.getItem().listId;	
	const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
	const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
	const clientOffset = monitor.getClientOffset();
	const hoverClientY = clientOffset.y - hoverBoundingRect.top;
	
	if (dragIndex === hoverIndex) {
		return;

	}
	if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		component.moveCard(sourceListId, item.index, component.props.index);
		monitor.getItem().index = hoverIndex;
		return;
	}

	if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		component.moveCard(sourceListId, dragIndex, component.props.index);
		monitor.getItem().index = hoverIndex;
		return;
	}
	
  },

  drop(props, monitor, component) {
	return undefined
  }
}
const cardSource = {
	isDragging(props, monitor) {
		return monitor.getItem().id === props.id;

	},

	beginDrag(props, monitor, component) {
		props.removeCard(props.id, props.listId)
		const item = { 
			id: props.id,
			index: props.index,
			name: props.name,
			listId: props.listId
		 }
		return item
	},

	endDrag(props, monitor, component) {
		
		if (!monitor.didDrop()) {
			
			return 
		}
		
	},
}

function dragCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}
}
function dropCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		itemType: monitor.getItemType(),
  }
}

class Card extends Component {
	constructor(props)  {
		super();
		this.moveCard=this.moveCard.bind(this)
	}
	
	moveCard(listId, sourseCardIndex, targetCardIndex){

		let listIndex = this.props.myStore.lists.findIndex(list => list._id===listId);
		let sourseCard = this.props.myStore.lists[listIndex].cards[sourseCardIndex];
		sourseCard.index= sourseCardIndex;
		this.props.onMoveCard(listIndex, sourseCard, targetCardIndex);
	}
	cutCardName(name) {
			if(name.length>10){
				return name.slice(0, 24).concat("...")
			}
			return name
		}
	render() {
		const { isDragging, connectDragSource, connectDropTarget  } = this.props
		const opacity = isDragging ? 0.1 : 1;
		return connectDragSource(connectDropTarget(
			<div className="list__item card" style={{opacity}}>
				{this.cutCardName(this.props.name)}
			</div>
			))

	}
}
Card = DropTarget('card', cardTarget, dropCollect)(Card);
export default compose(
	
	DragSource('card', cardSource, dragCollect),
	connect(state => ({
	   myStore: state
	 }),
		dispatch => ({
			
			onMoveCard: (listIndex, sourseCard, targetCardIndex)=> {
				dispatch(moveCard({ listIndex: listIndex, sourseCard: sourseCard, targetCardIndex: targetCardIndex}));
			}
		})
	)
)(Card);