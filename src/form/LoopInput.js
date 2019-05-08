import React from 'react';
import Resistor from '../Resistor';

class ResistorInput extends React.Component {

    constructor(props) {
        super(props);
        this.updateLoop = this.updateLoop.bind(this);
    }

    updateLoop(event){
        let loop = event.target.value;
        let allLoops = [...this.props.allLoops]
        allLoops.splice(this.props.id, 1, loop);
        this.props.onChange(allLoops);
    }


    render() {
        return (
            <div>
                <label>Malla {this.props.id + 1}: </label>
                <input type="text" name="loop" id="loop" value={this.props.loop}  onChange={this.updateLoop}/>
            </div>
            
        );
    }
}

export default ResistorInput;