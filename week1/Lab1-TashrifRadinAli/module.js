// Private array 
var array = ["apples", "oranges", "cherries"];

export function addItem(item){
    array.push(item);
}

export function numItems(){
    return array.length + " Items in collection";
}