<?php
// Read the input JSON from the javascript
$input = json_decode(file_get_contents('php://input'));
// Executes matlab function
exec("matlab  -nodisplay -nojvm -nosplash -wait -logfile out1.txt -r \"[x1, x2] = raices(".$input->var1.",".$input->var2.",".$input->var3.");  exit; \"");
// Obtains the matlab output from the file
$matlabOutput = file_get_contents('out.txt');
// Writes into the xhtml doc the output (is what the javascript is going to read)
echo(json_encode($matlabOutput));