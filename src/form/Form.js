import React from 'react';
import ResistorInput from './ResistorInput';
import Node from '../Node'
import Resistor from '../Resistor'
import LoopInput from './LoopInput'
import gauss from '../gauss';

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
        loops: [],
        equations: []
    };

    this.myRef = React.createRef();

    this.handleNodes = this.handleNodes.bind(this);
    this.handleResistors = this.handleResistors.bind(this);
    this.resistorsInputGenerator = this.resistorsInputGenerator.bind(this);
    this.submitNodesResistors = this.nodeEquations.bind(this);
    this.resistorUpdate = this.resistorUpdate.bind(this)
    this.loopsUpdate = this.loopsUpdate.bind(this);
    this.loopsInputGenerator = this.loopsInputGenerator.bind(this);
    this.nodeEquations = this.nodeEquations.bind(this);
    this.loopEquations = this.loopEquations.bind(this);
    this.precise = this.precise.bind(this);

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

  loopsInputGenerator(){
    let loopsInput = [];
    for(let i = 0; i < this.state.requiredLoops; i++){
      loopsInput.push(<LoopInput key={i} id={i} loop={this.state.loops[i]} allLoops={this.state.loops} onChange={this.loopsUpdate}/>);
    }
    return loopsInput;
  }

  resistorUpdate(newResistors){    
    this.setState({
      resistors: newResistors
    })
  }

  loopsUpdate(newLoops){
    this.setState({
      loops: newLoops
    })
  }

  nodeEquations(){
    
    let fakeResistors = [...this.state.resistors]
    let fakeNodes = [...this.state.nodes]

    for(let i = 0; i < fakeNodes.length; i++){
      fakeNodes[i].cleanResistors();
    }

    for(let i = 0; i<fakeResistors.length; i++){
      if(!fakeNodes[fakeResistors[i].nodeFrom.id-1] || !fakeNodes[fakeResistors[i].nodeTo.id-1]){
          alert("Revise haber ingresado un nodo valido en todas las resistencias")
          return -1;
      }
      fakeNodes[fakeResistors[i].nodeFrom.id-1].setResistor(fakeResistors[i])
      fakeNodes[fakeResistors[i].nodeTo.id-1].setResistor(fakeResistors[i])
      fakeResistors[i].nodeFrom = fakeNodes[fakeResistors[i].nodeFrom.id-1];
      fakeResistors[i].nodeTo = fakeNodes[fakeResistors[i].nodeTo.id-1];
    }

    for (let i = 0; i < fakeNodes.length; i++){
      for (let j = 0; j < fakeNodes[i].resistors.length; j++){
        if (fakeNodes[i].resistors[j].nodeFrom.id == -1 || fakeNodes[i].resistors[j].nodeTo.id == -1){
          alert("Resistencias conectadas incorrectamente");
          return -1;
        }
      }
    }


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

    let loops = []
    for(let i = 0; i<equations.length-eqCounter; i++){
      loops.push('');
    }

    this.setState({
      nodes: fakeNodes,
      resistors: fakeResistors,
      requiredLoops:equations.length-eqCounter,
      equations: equations,
      loops: loops
    })

  }

  loopEquations(){
    let equations = [...this.state.equations];
    const inputLoops = this.state.loops.map(loop=>{
      return loop.split(',');
    })

    // Again the map function
    let loops = inputLoops.map(loop=>{
      return loop.map(nodeId=>{
        return this.state.nodes.find(node=>node.id===parseInt(nodeId))
      })
    })
    
    // Creating the loops equations
    for(let i = 0; i<loops.length; i++){
      let equation = ''
      let voltage = ''
      for(let j = 0; j < loops[i].length; j++){
        // Checking if the current node and the next is our power source
        if(loops[i][j].id===1 && loops[i][(j+1)%loops[i].length].id===2){
          voltage = `= -${this.state.voltage}`
          equations[this.state.equations.length-(this.state.requiredLoops-i)][this.state.totalResistors] = -parseFloat(this.state.voltage);
          continue;
        }
        else if(loops[i][j].id===2 && loops[i][(j+1)%loops[i].length].id===1){
          voltage = `= ${this.state.voltage}`
          equations[this.state.equations.length-(this.state.requiredLoops-i)][this.state.totalResistors] = parseFloat(this.state.voltage);
          continue;
        }

        // Obtaining the resistor that connects current node and next node
        const resistor = loops[i][j].resistors.find(
            resistor=>(
                resistor.nodeFrom===loops[i][j] && resistor.nodeTo===loops[i][(j+1)%loops[i].length] ||
                resistor.nodeTo===loops[i][j] && resistor.nodeFrom===loops[i][(j+1)%loops[i].length]
            )
        )

        // If the resistor exists, in javascript you can check the existence of object without checking if it is null
        // it would be the same as resistor !== null
        if(resistor){
            // Creating the equation and adding the part to our matrix
            if(resistor.nodeFrom == loops[i][j]){
                equations[this.state.equations.length-(this.state.requiredLoops-i)][this.state.resistors.indexOf(resistor)] = parseInt(resistor.value);
                equation+='+ I'+this.state.resistors.indexOf(resistor)+'*'+resistor.value;
            }
            else{
                equations[this.state.equations.length-(this.state.requiredLoops-i)][this.state.resistors.indexOf(resistor)] = parseInt(resistor.value) * -1;
                equation+='+ I'+this.state.resistors.indexOf(resistor)+'*'+(resistor.value*-1);
            }
        }
        else{
            throw alert("El nodo " + inputLoops[i][j] + " no tiene flujo en direccion al nodo: " + inputLoops[i][j+1] + ".");
        }
      }
    }
    this.setState({
      equations: equations
    })

    
    console.log(equations);
    console.log(gauss(equations));
    let answers = (gauss(equations));
    let answer = '';
    for (let i = answers.length-1; i >= 0; i--){
      answer = "Corriente " + (i+1) +  ": " + this.precise(answers[i]) + "Ampers \n" + answer;
    }
    alert(answer);
  }

  precise(x) {
    return Number.parseFloat(x).toPrecision(4);
  }

  render() {
    return (
        <div className="inputStyle">
          <div className="InputDatos">
          <label htmlFor="totalNodes" className="label">Nodos Totales: </label>
            <input className="Input" type="number" name="totalNodes" id="inputNodes" value={this.state.totalNodes}  onChange={this.handleNodes}/>
            <label htmlFor="voltage" className="label">Voltaje: </label>
            <input className="Input" type="number" name="voltage" id="inputVoltage" value={this.state.voltage}  onChange={event=>this.setState({voltage:event.target.value})}/>
            <label htmlFor="totalResistors" className="label">Resistores Totales: </label>
            <input className="Input" type="number" name="totalResistors" id="inputResistors" value={this.state.totalResistors} onChange={this.handleResistors}/>
          </div>

            { this.resistorsInputGenerator() }
            { this.state.requiredLoops > 0 && 
          

              <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className = "modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Malla</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Ingrese los nodos en orden de la malla, separado por comas</p>
                      <div className="modalInputs">
                        { this.loopsInputGenerator() }  
                      </div>                      
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" >Cerrar</button>
                      <button className="btn btn-primary" onClick={this.loopEquations}>Calcular!</button>
                    </div>
                  </div>                
                  </div>
              </div>
            }
            <button className="botoncin" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.nodeEquations} >Enviar</button>
        </div>     
        
    );
  }
}

export default Form;