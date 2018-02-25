import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col, Button, ButtonGroup, Jumbotron } from 'reactstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import fire from './fire';


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

var maze = '1';
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

const COMMANDS = {
  forward: {
    icon: '??',
    content: 'GO FORWARD',
    label: 'forward'
  },

  left: {
    icon: '??',
    content: 'GO LEFT',
    label: 'left'
  },
  right: {
    icon: '??',
    content: 'GO RIGHT',
    label: 'right'
  }
};

var jumboStyle = {
  color: "lightgrey",
  background: "#183446"
}

var mainStyle = {
  background: "#2b3e50"
}



class App extends Component {
  state = {
    commands: Object.keys(COMMANDS).map(k => ({ id: k, ...COMMANDS[k] })),
    actions: [],
    cSelected: []
  };


  handleClick() {
    var Directionstring = '';

    for (var i in this.state.actions){
    Directionstring = Directionstring + this.state.actions[i]['label'] + " ";
    }
    {console.log(Directionstring)}

    fire.database().ref('World/Maze' + maze).set({
    op1: Directionstring
    });
  };
  
  handleClick = this.handleClick.bind(this);

  deleteClick() {
    console.log(this.state.actions)
    this.state.actions = [];
    console.log(this.state.actions)
    console.log("hi")

    const { actions, commands } = this.state;
      const item = {
      };
      actions.splice();
      this.setState({ actions });
  }

  deleteClick = this.deleteClick.bind(this)

  

  mazeClick1() {
    maze = '1';
    console.log(maze)
  };

  mazeClick1 = this.mazeClick1.bind(this);

  mazeClick2() {
    maze = '2'
    console.log(maze)
  };

  mazeClick2 = this.mazeClick2.bind(this);

  mazeClick3() {
    maze = '3'
    console.log(maze)
  };

  mazeClick3 = this.mazeClick3.bind(this);


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
      <div className="app" style={mainStyle}>
       <div>
         <Jumbotron style={jumboStyle}>
        <Container fluid>
          <h2 className="display-3">Where's My CheddAR?</h2>
          <p className="lead">Instructions:</p>
          <p>Drag and drop to make the mouse move!</p>
        </Container>
        </Jumbotron>
      </div>
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
                <h5>Choose Maze:</h5>
        <ButtonGroup>
        <Button color="primary" onClick={this.mazeClick1} active={this.state.cSelected.includes(1)}>One</Button>
          <Button color="primary" onClick={this.mazeClick2} active={this.state.cSelected.includes(2)}>Two</Button>
          <Button color="primary" onClick={this.mazeClick3} active={this.state.cSelected.includes(3)}>Three</Button>
        </ButtonGroup>
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
                      {/* {console.log(provided, snapshot)} */}
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
                <div className="App-button text-center" >
                <Button onClick={this.handleClick} color="primary">Update!</Button>{' '}{' '}{' '}
                <Button onClick={this.deleteClick} color="primary">Remove All Actions</Button>
                </div>
              </Col>
            </DragDropContext>
         </Row>
        </Container>
      </div>

    );
  }
}

export default App;
