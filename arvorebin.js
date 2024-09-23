



input = [4,2,7,1,3,6,9]
//0 busca 3 e 2  1 [0,0*2 1*2]
//2 busca 5 e 4  2 [1+1*2+1, 2*2] 
//3 busca 7 e 6  3 [2+1*2+1, 3*2]


 

output = [4,7,2,9,6,3,1]

let out = []

for (let n=0,seta=1;n<(input.length-1)/2;n++,seta++){
    out.push(input[n])
    out.push(input[n+1*2+1])
    out.push(input[n+1*2])
}

console.log(out)
// console.log(input[0])
// console.log(input[2])
// console.log(input[1])
// console.log(input[6])
// console.log(input[5])
// console.log(input[4])
// console.log(input[3])

