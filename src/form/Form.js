import React from 'react';
import ResistorInput from './ResistorInput';
import Node from '../Node'
import Resistor from '../Resistor'

class Form extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = 
    { 
        totalNodes: 4,
        voltage: 0,
        nodes: [],
        totalResistors: 3,
        resistors: [],
        requiredLoops: 0,
        equations: []
    };

    this.handleNodes = this.handleNodes.bind(this);
    this.handleResistors = this.handleResistors.bind(this);
    this.resistorsInputGenerator = this.resistorsInputGenerator.bind(this);
    this.submitNodesResistors = this.submitNodesResistors.bind(this);
    this.resistorUpdate = this.resistorUpdate.bind(this)

    let nodesList = [];
    for(let i = 0; i < 4; i++){
        nodesList.push(new Node(i+1));
    }
    this.state.nodes = nodesList;

    let resistors = [];
    for(let i = 0; i < 3; i++){
      resistors.push(new Resistor());
    }
    this.state.resistors = resistors;
    
  }

  handleNodes(event){
    if(event.target.value>=4){
      if(event.target.value<this.state.totalNodes){
        this.setState({
          nodes: this.state.nodes.slice(0, -1)
        });
      }
      else{
        let allNodes = [...this.state.nodes];
        for(let i = parseInt(this.state.totalNodes); i < event.target.value; i++){
            allNodes.push(new Node(i+1));
        }
        this.setState({
          nodes: allNodes
        })
      }
      this.setState({totalNodes:event.target.value})
    }
  }

  handleResistors(event){
    if(event.target.value>=3)
    {
      if(event.target.value<this.state.totalResistors){
        this.setState({
          resistors: this.state.resistors.slice(0,-1),
          totalResistors:event.target.value
        })
      }
      else{
        let resistors = [...this.state.resistors]
        for(let i = resistors.length; i<event.target.value; i++){
          resistors.push(new Resistor());
        }
        this.setState({
          resistors: resistors,
          totalResistors:event.target.value
        });
      }
    }
    
  }

  resistorsInputGenerator(){
    let resistorsInput = [];
    for(let i = 0; i < this.state.totalResistors; i++){
      resistorsInput.push(<ResistorInput key={i} id={i} nodesList={this.state.nodes} resistor={this.state.resistors[i]} allResistors={this.state.resistors} onChange={this.resistorUpdate}/>);
    }
    return resistorsInput;
  }

  resistorUpdate(newResistors){    
    this.setState({
      resistors: newResistors
    })
  }

  submitNodesResistors(){
    let fakeResistors = [...this.state.resistors]
    let fakeNodes = [...this.state.nodes]
    for(let i = 0; i<fakeResistors.length; i++){
      fakeNodes[fakeResistors[i].nodeFrom.id-1].setResistor(fakeResistors[i])
      fakeNodes[fakeResistors[i].nodeTo.id-1].setResistor(fakeResistors[i])
      fakeResistors[i].nodeFrom = fakeNodes[fakeResistors[i].nodeFrom.id-1];
      fakeResistors[i].nodeTo = fakeNodes[fakeResistors[i].nodeTo.id-1];
    }

    // TODO: JUANPY o HARNEX Check through the nodes (and its resistors) that everything is connected with everything (there are no isles in the graph)



    

    let equations = fakeResistors.map(val=>{
        let eq = [];
        for(let i = 0; i<fakeResistors.length+1; i++){
            eq.push(0);
        }
        return eq;
    })

    let eqCounter = 0;
    // Creating the equations from the nodes
    for(let i = 0; i < fakeNodes.length; i++){
        let currentInNode = '';
        if(fakeNodes[i].resistors.length>1){
          for(let j = 0; j < fakeNodes[i].resistors.length; j++){
              // if the current goes outside the node its negative
              if(fakeNodes[i].resistors[j].nodeFrom===fakeNodes[i]){
                  equations[eqCounter][fakeResistors.indexOf(fakeNodes[i].resistors[j])] = -1;
                  currentInNode+='-I'+fakeResistors.indexOf(fakeNodes[i].resistors[j]);
              }
              // if the current goes inside the node its positive
              else{
                  equations[eqCounter][fakeResistors.indexOf(fakeNodes[i].resistors[j])] = 1;
                  currentInNode+='+I'+fakeResistors.indexOf(fakeNodes[i].resistors[j]);
              }
          }
          eqCounter++;
        }
    }

    this.setState({
      nodes: fakeNodes,
      resistors: fakeResistors,
      requiredLoops:equations.length-eqCounter,
      equations: equations
    })

    console.log(equations);

    console.log("Required loops: "+(equations.length-eqCounter))

  }

  render() {
    return (
        <div className="inputStyle">
            <label htmlFor="totalNodes" className="label">Total Nodes: </label>
            <input className="Input" type="number" name="totalNodes" id="inputNodes" value={this.state.totalNodes}  onChange={this.handleNodes}/>
            <label htmlFor="voltage" className="label">Voltage: </label>
            <input className="Input" type="number" name="voltage" id="inputVoltage" value={this.state.voltage}  onChange={event=>this.setState({voltage:event.target.value})}/>
            <label htmlFor="totalResistors" className="label">Total Resistors: </label>
            <input className="Input" type="number" name="totalResistors" id="inputResistors" value={this.state.totalResistors} onChange={this.handleResistors}/>
            { this.resistorsInputGenerator() }
            { this.state.requiredLoops > 0 && <div>{this.state.equations}</div>}
            <button onClick={this.submitNodesResistors}>Submit</button>
        </div>

        
        
        
        
    );
  }
}

export default Form;