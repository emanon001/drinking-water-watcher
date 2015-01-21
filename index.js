var osc = require('osc-min');
var udp = require('dgram');
sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error;
  try {
      var data = osc.fromBuffer(msg);
      // if (data.args[0].value > 0.50)
        return console.log(osc.fromBuffer(msg));
  } catch (_error) {
      error = _error;
      return console.log("invalid OSC packet");
  }
});
sock.bind(9999);
