function [x1,x2] = raices(a,b,c)
format long;
x1 = (-b+sqrt(b^2-4*a*c))/(2*a);
x2 = (-b-sqrt(b^2-4*a*c))/(2*a);
x1_str = sprintf('%f%+fj',real(x1), imag(x1));
x2_str = sprintf('%f%+fj',real(x2), imag(x2));
writeIntoFile({x1_str,x2_str});