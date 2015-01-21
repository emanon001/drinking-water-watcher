var osc = require('osc-min');
var udp = require('dgram');

var metrics = require('datadog-metrics');
metrics.init({
  host: process.env.DATADOG_HOST,
  prefix: 'drinking_water_watcher.'
});

sock = udp.createSocket("udp4", function(msg, _) {
  try {
    var data = osc.fromBuffer(msg);
    putOscValue(data);
  } catch (error) {
    console.log("invalid OSC packet");
  }
});
sock.bind(9999);

function putOscValue(oscData) {
  // oscDataは以下の形式のオブジェクトです
  // {
  //     address: '/wii/1/balance/4',
  //       args: [ { type: 'float', value: 0.022346563637256622 } ],
  //         oscType: 'message'
  // }

  var oscValue = oscData.args[0].value;
  var weightKilogram = getWeightKilogram(oscValue);
  var numberOfWaterBottle = getNumberOfWaterBottle(weightKilogram);
  metrics.gauge('number_of_water_bottle', numberOfWaterBottle);
}

// OSCで取得した値から重さを取得します
function getWeightKilogram(oscValue) {
  var weightKilogram = oscValue * 100;
  var correctedWeight = correctWeight(weightKilogram);
  return correctedWeight;
}

// 重さから水ペットボトルの本数を取得します
function getNumberOfWaterBottle(weightKilogram) {
  return Math.round(weightKilogram / 2.0);
}

// バランスWiiボードから取得した重さの値を修正します
// 特に値が小さいときに本来の値とずれることがあるので、それを補正します
function correctWeight(weightKilogram) {
  // 計測した値 : 真の値
  // 0.8 : 2kg
  // 2.2 : 4kg
  // 4.2 : 6kg
  // 6.2 : 8kg
  // 8.2 : 10kg

  if (weightKilogram < 0.5) {
    return weightKilogram;
  } else if (weightKilogram < 1.2) {
    return weightKilogram + 1.2;
  } else {
    return weightKilogram + 1.8;
  }
}
