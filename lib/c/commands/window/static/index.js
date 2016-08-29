(function() {
	var View = require("../../../../v/view.js");
	this.create = function(data, dom, controller) {
		var dataName = dom.attr("latte-window-data");
		var child = dom.children[0];
		dom.removeChild(child);
		dom.classed("staticWindow",1);
				var closeDom = document.createElement("button");
				var close = View.create(closeDom);
				close.classed({
					lwclose:1
				});
				close.attr("latte-click", "close");
					var spanDom = document.createElement("span");
					spanDom.innerHTML = "x";
					close.appendChild(spanDom);

				var titleDom = document.createElement("h4");
				var title = View.create(titleDom);
				title.attr("latte-html", "{{title}}");
				title.classed({
					lwtitle: 1
				});
			var headerDom = document.createElement("div");
			var header = View.create(headerDom);
			header.classed({
				lwheader: 1
			});
			header.appendChild(closeDom);
			header.appendChild(titleDom);
		

			var bodyDom = document.createElement("div");
			var body = View.create(bodyDom);
			body.classed({
				lwbody:1
			});
			body.appendChild(child);

		dom.appendChild(headerDom);
		dom.appendChild(bodyDom);
		var change = function(now, old) {
			var Controller = require("../../../controller.js");
			if(old) {
				Controller.removeChild(dom.node(), old);
			}
			if(now) {

				Controller.createChild(dom.node(), now);
			}
		};
		change(data.get(dataName));
		controller.bind("data", dataName, change);


		
	}
}).call(module.exports);
require("latte_dom/utils/css.js").importCssString(require("./index.css"), "latte_window_static_css");
