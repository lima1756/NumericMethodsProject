import React from 'react';
import Resistor from '../Resistor';

class ResistorInput extends React.Component {

    constructor(props) {
        super(props);

        this.updateFrom = this.updateFrom.bind(this);
        this.updateTo = this.updateTo.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    updateFrom(event){
        // TODO: JUANPY o HARNEX The user must not be allowed to connect nodes 0 and 1 (is the power source, check first the to value) and the node must not be the same as to
        let res = Object.assign({}, this.props.resistor);
        res.nodeFrom = this.props.nodesList[event.target.value-1]
        let allResistors = [...this.props.allResistors]
        allResistors.splice(this.props.id, 1, res);
        this.props.onChange(allResistors);
        
    }

    updateTo(event){
        // TODO: JUANPY o HARNEX The user must not be allowed to connect nodes 0 and 1 (is the power source, check first the from value) and the node must not be the same as from
        let res = Object.assign({}, this.props.resistor);
        res.nodeTo = this.props.nodesList[event.target.value-1]
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