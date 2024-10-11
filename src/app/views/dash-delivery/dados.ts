let c = {
    "widgetDelivery": [
      {
        "FATURAMENTO_DELIVERY": "3281.99",
        "NUMERO_VENDAS": 92,
        "VENDAS_CANCELADAS": 14,
        "DIA": "2024-07-01T03:00:00.000Z"
      },
      {
        "FATURAMENTO_DELIVERY": "3422.47",
        "NUMERO_VENDAS": 85,
        "VENDAS_CANCELADAS": 17,
        "DIA": "2024-07-02T03:00:00.000Z"
      },
      {
        "FATURAMENTO_DELIVERY": "2468.40",
        "NUMERO_VENDAS": 68,
        "VENDAS_CANCELADAS": 18,
        "DIA": "2024-07-03T03:00:00.000Z"
      },
      {
        "FATURAMENTO_DELIVERY": "3956.24",
        "NUMERO_VENDAS": 111,
        "VENDAS_CANCELADAS": 13,
        "DIA": "2024-07-04T03:00:00.000Z"
      },
      {
        "FATURAMENTO_DELIVERY": "3789.10",
        "NUMERO_VENDAS": 104,
        "VENDAS_CANCELADAS": 13,
        "DIA": "2024-07-05T03:00:00.000Z"
      }
    ],
  }

//   console.log(c.widgetDelivery)

let data = []
let array = c.widgetDelivery
for (let n in array){
  let dia = array[n].DIA
}
let nameToFind = '2024-07-03T03:00:00.000Z';


let index = c.widgetDelivery.findIndex(item => item.DIA === nameToFind);