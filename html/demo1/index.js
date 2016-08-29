var latte_lib = latte.require("latte_lib");
  var latte_dom = latte.require("latte_dom");
  var pieData = latte_lib.object.create({

  })
  var data = {
  	window: {
  		title: "test",
      close: function() {
      	console.log("fk");
      }
  	}
      
  };
  var demo = latte_dom.define("demo", data);