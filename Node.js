class Node{
    
    constructor(id){
        this.id = id;
        this.resistors = []
        this.nextNodes = []
    }

    setResistor(resistor/*, nextNode*/){
        this.resistors.push(resistor);
        //this.nextNodes.push(nextNode);
    }
}

export default Node;