
// TODO: The user must not be allowed to connect nodes 0 and 1 (is the power source)
// TODO: Check through the nodes (and its resistors) that everything is connected with everything (there are no isles in the graph)
// TODO: the resistor values must be positive






// Retrieve the input voltage from the user as well as the total nodes
const inputVoltage = 20;
const totalNodes = 10;

let nodes = []

for(let i = 0; i < totalNodes; i++){
    nodes.push(new Node(i+1));
}

let resistors = []

// TODO: With the input nodes and the connections (and resistors value), create them
// This are fake values

let res; 

res = new Resistor(nodes[0], nodes[2], 100);
nodes[0].setResistor(res)
nodes[2].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[4], nodes[0], 1000);
nodes[0].setResistor(res)
nodes[4].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[1], nodes[3], 5);
nodes[1].setResistor(res)
nodes[3].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[1], nodes[9], 25);
nodes[1].setResistor(res)
nodes[9].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[2], nodes[5], 10)
nodes[2].setResistor(res)
nodes[5].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[2], nodes[3], 10)
nodes[2].setResistor(res)
nodes[3].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[3], nodes[7], 60)
nodes[3].setResistor(res)
nodes[7].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[5], nodes[4], 1)
nodes[5].setResistor(res)
nodes[4].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[5], nodes[6], 500)
nodes[5].setResistor(res)
nodes[6].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[7], nodes[6], 200)
nodes[7].setResistor(res)
nodes[6].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[7], nodes[8], 45)
nodes[7].setResistor(res)
nodes[8].setResistor(res)
resistors.push(res);

res = new Resistor(nodes[8], nodes[9], 30)
nodes[8].setResistor(res)
nodes[9].setResistor(res)
resistors.push(res);


// TODO: check the total equations required and the total nodes and request the user for the loops to obtain the rest of the equations

// Here we are creating the matrix, map is a function of the javascript's array
let equations = resistors.map(val=>{
    let eq = [];
    for(let i = 0; i<resistors.length+1; i++){
        eq.push(0);
    }
    return eq;
})

// Creating the equations from the nodes
for(let i = 0; i < totalNodes; i++){
    let currentInNode = '';
    for(let j = 0; j < nodes[i].resistors.length; j++){
        // if the current goes outside the node its negative
        if(nodes[i].resistors[j].nodeFrom===nodes[i]){
            equations[i][resistors.indexOf(nodes[i].resistors[j])] = -1;
            currentInNode+='-I'+resistors.indexOf(nodes[i].resistors[j]);
        }
        // if the current goes inside the node its positive
        else{
            equations[i][resistors.indexOf(nodes[i].resistors[j])] = 1;
            currentInNode+='+I'+resistors.indexOf(nodes[i].resistors[j]);
        }
    }
}


// TODO: obtain the loops from the user
const inputLoops = [['1','3','4','2'], ['1', '3', '6', '5']]

// Again the map function
let loops = inputLoops.map(loop=>loop.map(nodeId=>{
    return nodes.find(node=>node.id===parseInt(nodeId))
}))

// Creating the loops equations
for(let i = 0; i<loops.length; i++){
    let equation = ''
    let voltage = ''
    for(let j = 0; j < loops[i].length; j++){

        // Checking if the current node and the next is our power source
        if(loops[i][j].id===1 && loops[i][(j+1)%loops[i].length].id===2){
            voltage = `= -${inputVoltage}`
            equations[i+totalNodes][resistors.length+1] = -inputVoltage;
            continue;
        }
        else if(loops[i][j].id===2 && loops[i][(j+1)%loops[i].length].id===1){
            voltage = `= ${inputVoltage}`
            equations[i+totalNodes][resistors.length+1] = inputVoltage;
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
            if(resistor.nodeFrom== loops[i][j]){
                equations[i+totalNodes][resistors.indexOf(resistor)] = resistor.value;
                equation+='+ I'+resistors.indexOf(resistor)+'*'+resistor.value;
            }
            else{
                equations[i+totalNodes][resistors.indexOf(resistor)] = resistor.value * -1;
                equation+='+ I'+resistors.indexOf(resistor)+'*'+(resistor.value*-1);
            }
        }
        else{
            // TODO: Tell the user that the current node is not connected to the next in the list

            // If there is no resistor that connects both nodes throw error and tell the user
            throw Error("No flow")
        }
    }
}

console.log(equations)