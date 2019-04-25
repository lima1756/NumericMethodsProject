'use strict';

const e = React.createElement;

class ResistorInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    { 
        resistorValue:1,
        nodeTo:-1,
        nodeFrom:-1
    };
    this.handleNodes = this.handleNodes.bind(this);
  }

  handleNodes(event){
    if(event.target.value<this.state.nodes){
        this.state.nodesList.pop();
    }
    else{
        for(let i = this.state.nodes; i < event.target.value; i++){
            nodes.push(new Node(i+1));
        }
    }
    this.setState({nodes:event.target.value})
  }


  render() {
    return (
        <div className="resistorStyle">
            <select className="select" value={this.state.nodeFrom} onChange={event=>this.setState({nodeFrom:event.targe.value})}>
                <option value={-1}>node from</option>
                {
                    this.props.nodesList.map(value=>{
                        return (<option key={value} value={value}>{value}</option>)
                    })
                }
            </select>

            <input className="InputS" type="number" name="totalNodes" id="inputNodes" value={this.state.resistorValue}  onChange={event=>this.setState({resistorValue:event.target.value})}/>

            <select className="select" value={this.state.nodeTo} onChange={event=>this.setState({nodeTo:event.targe.value})}>
                <option value={-1}>node to</option>
                {
                    this.props.nodesList.map(value=>{
                        return (<option key={value} value={value}>{value}</option>)
                    })
                }
            </select>

        </div>
        
    );
  }
}

const domContainer = document.querySelector('#form');
ReactDOM.render(e(Form), domContainer);