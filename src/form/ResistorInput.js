import React from 'react';
import Resistor from '../Resistor';
import swal from 'sweetalert';

class ResistorInput extends React.Component {

    constructor(props) {
        super(props);

        this.updateFrom = this.updateFrom.bind(this);
        this.updateTo = this.updateTo.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    updateFrom(event){
        let res = Object.assign({}, this.props.resistor);
        res.nodeFrom = this.props.nodesList[event.target.value-1]
        if(res.nodeFrom === res.nodeTo){
            swal("","Porfavor ingrese nodos distintos a la resistencia","error")
            return -1;
        }
        else if(res.nodeFrom.id===1 && res.nodeTo.id ===2 || res.nodeFrom.id===2 && res.nodeTo.id ===1){
            swal("","La bateria esta entre los nodos 1 y 2, porfavor ingrese la resistencia en otros nodos","error")
            return -1;
        }
        if(res.nodeTo.id!== -1 && res.nodeFrom.id!== -1){
            console.log("YEI")
            for(let i = 0; i<this.props.allResistors.length; i++){
                
                if(this.props.allResistors[i].nodeFrom.id===res.nodeFrom.id && this.props.allResistors[i].nodeTo.id===res.nodeTo.id){
                    swal("","Ya tiene una resistencia entre los dos nodos seleccionados","error")
                    return -1;
                }
            }
        }
        let allResistors = [...this.props.allResistors]
        allResistors.splice(this.props.id, 1, res);
        this.props.onChange(allResistors);
        
    }

    updateTo(event){
        let res = Object.assign({}, this.props.resistor);
        res.nodeTo = this.props.nodesList[event.target.value-1]
        if(res.nodeFrom === res.nodeTo){
            swal("","Porfavor ingrese nodos distintos a la resistencia","error")
            return -1;
        }
        else if(res.nodeFrom.id===1 && res.nodeTo.id ===2 || res.nodeFrom.id===2 && res.nodeTo.id ===1){
            swal("","La bateria esta entre los nodos 1 y 2, porfavor ingrese la resistencia en otros nodos","error")
            return -1;
        }
        if(res.nodeFrom.id!== -1 && res.nodeTo.id!== -1){
            console.log("YEI2")
            for(let i = 0; i<this.props.allResistors.length; i++){
                if(this.props.allResistors[i].nodeFrom.id===res.nodeFrom.id && this.props.allResistors[i].nodeTo.id===res.nodeTo.id){
                    swal("","Ya tiene una resistencia entre los dos nodos seleccionados","error")
                    return -1;
                }
            }
        }
        let allResistors = [...this.props.allResistors]
        allResistors.splice(this.props.id, 1, res);
        this.props.onChange(allResistors);
    }

    updateValue(event){
        if(event.target.value>0)
        {
            let res = Object.assign({}, this.props.resistor);
            res.value = event.target.value
            let allResistors = [...this.props.allResistors]
            allResistors.splice(this.props.id, 1, res);
            this.props.onChange(allResistors);
        }
    }


    render() {
        return (
            <div className="resistorStyle">
                <select className="selectR" value={this.props.resistor.nodeFrom.id} onChange={this.updateFrom}>
                    <option value={-1}>node from</option>
                    {
                        this.props.nodesList.map(value=>{
                            return (<option key={value.id} value={value.id}>{value.id}</option>)
                        })
                    }
                </select>

                <input className="InputR" type="number" name="totalNodes" id="inputNodes" value={this.props.resistor.value}  onChange={this.updateValue}/>
                <b style={{fontSize:"25px"}}>Ω</b>
                <select className="selectR" value={this.props.resistor.nodeTo.id} onChange={this.updateTo}>
                    <option  value={-1}>node to</option>
                    {
                        this.props.nodesList.map(value=>{
                            return (<option key={value.id} value={value.id}>{value.id}</option>)
                        })
                    }
                </select>

            </div>
            
        );
    }
}

export default ResistorInput;