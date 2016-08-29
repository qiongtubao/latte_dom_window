
(function(define) {'use strict'
	define("latte_dom/c/commands/window/static/index.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.staticWindow {    position: relative;    background-color: #fff;    -webkit-background-clip: padding-box;    background-clip: padding-box;    border: 1px solid #999;    border: 1px solid rgba(0,0,0,.2);    border-radius: 6px;    outline: 0;    -webkit-box-shadow: 0 3px 9px rgba(0,0,0,.5);    box-shadow: 0 3px 9px rgba(0,0,0,.5);}@media (min-width: 768px) {   .staticWindow {   	 	-webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);	    box-shadow: 0 5px 15px rgba(0,0,0,.5);	}}.staticWindow  .lwheader{    min-height: 16.43px;    padding: 15px;    border-bottom: 1px solid #e5e5e5;}.staticWindow .lwtitle {	margin: 0;    line-height: 1.42857143;}.staticWindow h4 {	font-size: 18px;	font-weight: 500;}.staticWindow button.lwclose {    -webkit-appearance: none;    padding: 0;    cursor: pointer;    background: 0 0;    border: 0;}.staticWindow .lwclose {    float: right;    font-size: 21px;    font-weight: 700;    line-height: 1;    color: #000;    text-shadow: 0 1px 0 #fff;    filter: alpha(opacity=20);    opacity: .2;}.staticWindow .lwheader .lwclose {   margin-top: -2px;}.staticWindow .lwbody {    position: relative;    padding: 15px;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/window/static/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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

});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/window/window/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {



var latte_lib = require("latte_lib");
(function() {
		var html = require("./window.html");
		var doDom = function(dom) {
			var add = "";
			if(dom.getAttribute("latte-mask")) {
				add = '<div class="latte_dialog_success_mask" latte-show="show" ></div>'
			}
			dom.innerHTML = latte_lib.format.templateStringFormat(html, {
				innerHTML: dom.innerHTML
			})+add;

		}
		/**
			icon 问题 暂时想到使用SVG来解决 暂时未解决
		*/
		var addMoveEvent = function(element, data) {
			element.onmousedown=function(event){
				var obj=element.parentNode;
				//obj.style.zIndex=++maxZindex;
				var Port={x:event.clientX-obj.offsetLeft,y:event.clientY-obj.offsetTop};

				function mouseUp(event){
					if(element.releaseCapture){
						element.releaseCapture();
						element.onmouseup=null;
						element.onmousemove=null;
					}else{
						document.removeEventListener("mouseup",mouseUp,true);
						document.removeEventListener("mousemove",mouseMove,true);
						window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP);
					}
				}
				function mouseMove(event){
					var left = 	event.clientX - Port.x;
					var top = event.clientY - Port.y;
					var minleft = data.minleft || 0;
					var mintop = data.mintop || 0;
					if(left < minleft){
						left = minleft;
					}else if(left + obj.offsetWidth > document.body.offsetWidth){
						left = document.body.offsetWidth - obj.offsetWidth;
					}
					data.set("left", left);
					if(top < mintop){
						top = mintop;
					}else if(top + obj.offsetHeight > document.documentElement.clientHeight){
						top = document.documentElement.clientHeight - obj.offsetHeight;
					}
					data.set("top", top);
					//obj.style.top = top+"px";
				}
				if(element.setCapture){
					element.setCapture();
					element.onmouseup = mouseUp;
					element.onmousemove = mouseMove;
				}else{
					document.addEventListener("mouseup",mouseUp,true);
					document.addEventListener("mousemove",mouseMove,true);
					window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
				}
				return false;
			}
		}

		var addChangeEvent = function(element, data) {
			element.onmousedown=function(event){
				var obj=element.parentNode;
				//obj.style.zIndex=++maxZindex;
				var Port = {
					x:obj.offsetLeft+obj.offsetWidth-event.clientX,
					y:obj.offsetTop+obj.offsetHeight-event.clientY
				};
				
				
				function mouseUp(event){ 			
					if(element.releaseCapture){
						element.releaseCapture();
						element.onmouseup=null;
						element.onmousemove=null;
					}else{
						document.removeEventListener("mouseup",mouseUp,true);
						document.removeEventListener("mousemove",mouseMove,true);
						window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP);
					}
				}
				function mouseMove(event){
					var width = event.clientX+Port.x -obj.offsetLeft;
					var height = event.clientY+Port.y-obj.offsetTop;
					var minwidth = data.minwidth || 0;
					var minheight = data.minheight || element.offsetHeight + (data.topheight || 0);
					if(width < minwidth){
						width = minwidth;
					}else if(width+obj.offsetLeft > document.documentElement.clientWidth){
						width = document.documentElement.clientWidth-obj.offsetLeft;
					}
					obj.style.width = width+"px";
					if(height < minheight){
						height = minheight;
					}else if(height + obj.offsetTop > document.documentElement.clientHeight){
						height = document.documentElement.clientHeight-obj.offsetTop;
					}
					obj.style.height = height+"px";
					element.style.left=(width-(data.dragwidth ))+"px";
					element.style.top=(height-(data.dragheight ))+"px";
				}
				
				
				if(element.setCapture){
					element.setCapture();
					element.onmouseup = mouseUp;
					element.onmousemove = mouseMove;
				}else{
					document.addEventListener("mouseup",mouseUp,true);
					document.addEventListener("mousemove",mouseMove,true);
					window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
				}
				return false;
			}
		}
	this.create = function(data, dom, controller) {
		var Controller = require("../../../controller.js");
		//var dataName = dom.getAttribute("latte-window-data");

		doDom(dom.node());
		var head = dom.children[0].children[0];
		var bottom = dom.children[0].children[2];
		//if(dataName) {

			var d = data;
			d.set("changeIcon", "system2.png#change");
			Controller.createChild(dom.node(), d);
			
			addMoveEvent(head, d);
			addChangeEvent(bottom, d);
		//}
		
	}
}).call(module.exports);
require("latte_dom/utils/css.js").importCssString(require("./window.css"), "latte_window_window_css");

});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
	define("latte_dom/c/commands/window/window/window.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.latte_window_window_main {	box-shadow: 0 0 20px rgba(64,55,156,0.2);	border-radius: 10px;	position: absolute;	left: 50%;	top: 10%;}.latte_window_window_top {	position: relative;	padding: 5px 5px 5px 15px;	background-color: #ededed;	height: 24px;}.latte_window_window_top_title {	line-height: 1.3;	color: #212121;	font-size: 16px;	margin: 0px;}.latte_window_window_top_close {	position: absolute;	top: 50%;	bottom: auto;	transform: translateY(-50%);	right: 5px;	width: 24px;	height: 24px;	line-height: 24px;}.latte_window_window_middle {	overflow-y: auto;	overflow-x: auto;	height: calc(100% - 48px);	background-color: #ffffff;}.latte_window_window_bottom {	background-color: #ededed;	display: inline-block;	width: 100%;	height: 10px;}.latte_window_window_bottom_change {	float: right;	right: 0px;}.latte_window_window_mask {	width: 100%;    height: 100%;    background-color: #000;    opacity: .8;    position: fixed;    left: 0;    top: 0;    z-index: 100;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
	define("latte_dom/c/commands/window/window/window.html", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='<div class="latte_window_window_main" latte-show="show" latte-css="left:{{left}}px;top:{{top}}px;width:{{width}}px;height:{{height}}px;zIndex:{{zIndex}}">	<div class="latte_window_window_top">		<h3 class="latte_window_window_top_title">{{title}}</h3>		<a class="latte_window_window_top_close" latte-click="close">x</a>	</div>	<div class="latte_window_window_middle" style="    position: relative;">		{{innerHTML}}	</div>	<div class="latte_window_window_bottom">		<div latte-image="changeIcon" style="width:10px;height:10px;" class="latte_window_window_bottom_change"></div>	</div></div>'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/window.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
	/**
		<img latte-window="window"></img>
		需要一个关闭按钮
		可以移动

		是否写成类？window
	*/
	var LatteObject = require("../../m/data.js")
		, latte_lib = require("latte_lib");
	var Command = {};
	(function() {
		this.before = function(data, dom, controller) {
			var windowClassName = dom.attr("latte-window");
			var latteObject = LatteObject.create(data);
			if(windowClassName) {
				var windowClass = require("./window/"+windowClassName);
				windowClass.create(data, dom, controller);	
			}

		};
	}).call(Command);
	
	module.exports = Command;window.js
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });