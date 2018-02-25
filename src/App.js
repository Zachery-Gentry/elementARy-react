import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col, Button, ButtonGroup, Jumbotron } from 'reactstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import fire from './fire';
import Nav from './Nav';
import Tutorial from './Tutorial';


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
  background: isDragging ? '#FFC74D' : '#EDB230',
  borderRadius: 8,
  color: 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

var maze = '1';
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : '#0075C4',
  padding: grid,
  width: 250,
  borderRadius: 4,
  boxShadow: 'rgba(0,0,0,.05) 0 12px 40px 0'
});

const COMMANDS = {
  forward: {
    icon: '??',
    content: 'Move Forward',
    label: 'forward'
  },

  left: {
    icon: '??',
    content: 'Turn Left',
    label: 'left'
  },
  right: {
    icon: '??',
    content: 'Turn Right',
    label: 'right'
  },
  switch: {
    icon: '??',
    content: 'Flip Switch',
    label: 'switch'
  }
};

var jumboStyle = {
  color: "lightgrey",
  background: "#183446"
}

var mainStyle = {
  background: "#2b3e50"
}

var buttonStyle = {
  background: "#A6D340",
  color: "white"
}

class App extends Component {
  state = {
    commands: Object.keys(COMMANDS).map(k => ({ id: k, ...COMMANDS[k] })),
    actions: [],
    cSelected: [],
    showInstructions: false
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

  onShowInstructions = () => this.setState({ showInstructions: true });
  onCloseInstructions = () => this.setState({ showInstructions: false });

  
  render() {
    return (
      <div className="app">
        <Nav onShowInstructions={this.onShowInstructions} />
       {/* <div>
         <Jumbotron>
        <Container fluid>
          <h2 className="display-3">Where's My CheddAR?</h2>
          <p className="lead">Instructions:</p>
          <p>Click on the Maze Number to choose a mase, default is 1.</p>
          <p>Drag commands from the Command List to the Instruction List.</p>
          <p>Press Update to share the new commands to the App.</p>
        </Container>
        </Jumbotron>
      </div> */}
        <Container fluid>
          <Row className="py-4">
            <Col md="6">
              <h5>Choose Maze</h5>
              <ButtonGroup>
              <Button color = "info"onClick={this.mazeClick1} active={this.state.cSelected.includes(1)}>One</Button>
                <Button color="info" onClick={this.mazeClick2} active={this.state.cSelected.includes(2)}>Two</Button>
                <Button color="info" onClick={this.mazeClick3} active={this.state.cSelected.includes(3)}>Three</Button>
              </ButtonGroup>
            </Col>
            <Col md="6" className="text-right">
              <h5>Actions</h5>
                <Button onClick={this.handleClick} color="info">Upload Instructions</Button>{' '}{' '}{' '}
                <Button onClick={this.deleteClick} color="danger">Remove All Actions</Button>
            </Col>
          </Row>
          <Row className="pt-4">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Col md={3}>
                <Droppable droppableId="commands">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <div className="title">Commands</div>
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
                      <div className="title">Mouse Instructions</div>
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
              </Col>
            </DragDropContext>
         </Row>
        </Container>
        <Tutorial
          isOpen={this.state.showInstructions}
          onClose={this.onCloseInstructions}
        />
      </div>

    );
  }
}

export default App;
