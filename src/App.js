import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col } from 'reactstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

const COMMANDS = {
  forward: {
    icon: '??',
    content: 'GO FORWARD'
  },
  back: {
    icon: '??',
    content: 'GO BACK'
  },
  left: {
    icon: '??',
    content: 'GO LEFT'
  },
  right: {
    icon: '??',
    content: 'GO RIGHT'
  }
};

class App extends Component {
  state = {
    commands: Object.keys(COMMANDS).map(k => ({ id: k, ...COMMANDS[k] })),
    actions: []
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) return;

    // Ignore commands
    if (result.destination.droppableId === 'commands') return;

    // Add a new command
    if (
      result.source.droppableId === 'commands' &&
      result.destination.droppableId === 'callstack'
    ) {
      const { actions, commands } = this.state;
      const item = {
        id: `${new Date().getTime()}-${result.draggableId}`,
        ...COMMANDS[result.draggableId]
      };
      actions.splice(result.destination.index, 0, item);
      this.setState({ actions });
    }

    // Re order call stack
    if (
      result.source.droppableId === 'callstack' &&
      result.destination.droppableId === 'callstack'
    ) {
      const actions = reorder(
        this.state.actions,
        result.source.index,
        result.destination.index
      );
  
      this.setState({
        actions,
      });
    }
  }
  
  render() {
    return (
      <div className="app">
        <Container fluid>
          <Row>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Col md={3}>
                <Droppable droppableId="commands">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      Commands
                      {this.state.commands.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {item.content}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col md={9}>
                <Droppable droppableId="callstack">
                  {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    className="d-flex flex-column"
                    style={{
                      ...getListStyle(snapshot.isDraggingOver),
                      width: null
                    }}
                    >
                      <div>Instructions</div>
                      {console.log(provided, snapshot)}
                      {this.state.actions.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {item.content}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </Col>
            </DragDropContext>
         </Row>
        </Container>
      </div>
    );
  }
}

export default App;
