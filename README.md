1) undefined = nothing is assigned yet. Ex-
     let a;
     console.log(a);
   null = explicitly assigned as empty. Ex-
     let b = null;
     console.log(b);
   
2) Map() : Map() is used to transform an array and create a new array based on the original. Ex-
     const numbers = [1, 2, 3];
     const doubled = numbers.map(n => n * 2);
     console.log(doubled);
   ForEach() : ForEach() is used to perform an action for each item but doesnt return a new array. Ex-
     const numbers = [1, 2, 3];
     numbers.forEach(n => console.log(n * 2));

3) == : compare only values
   === : compare both value and type

4) async/await: It helps write asynchronous code like synchronous code, making it easier to read and manage

5) Scope = where a variable is accessible in code.
    1. Global Scope: Variables declared outside any function/block are accessible everywhere.
    2. Function Scope: Variables declared inside a function are only accessible inside that function.
    3. Block Scope: Variables declared with let or const inside {} are accessible only inside that block.
