'use strict';

const e = React.createElement;

class Form extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = 
    { 
        nodes: 4,
        voltage: 0,
        resistors: 3
    };
    this.handleNodes = this.handleNodes.bind(this);
    this.handleResistors = this.handleResistors.bind(this);
    let nodesList = [];
    for(let i = 0; i < 4; i++){
        //nodesList.push(new Node(i+1));
    }
    this.state.nodesList = nodesList;
  }

  handleNodes(event){
    if(event.target.value<this.state.nodes){
        this.state.nodesList.pop();
    }
    else{
        for(let i = this.state.nodes; i < event.target.value; i++){
            this.state.nodesList.push(new Node(i+1));
        }
    }
    this.setState({nodes:event.target.value})
  }

  handleResistors(event){
    this.setState({resistors:event.target.value})
  }


  render() {
    return (
        <div>
            <input type="number" name="totalNodes" id="inputNodes" value={this.state.nodes}  onChange={this.handleNodes}/>
            <input type="number" name="voltage" id="inputVoltage" value={this.state.voltage}  onChange={event=>this.setState({voltage:event.target.value})}/>
            <input type="number" name="totalResistors" id="inputResistors" value={this.state.resistors} onChange={this.handleResistors}/>
            <ResistorInput nodesList={this.state.nodesList}/>
        </div>
        
    );
  }
}

const domContainer = document.querySelector('#form');
ReactDOM.render(e(Form), domContainer);