/*
 * Remote5 wStyle - 2021.10.13~2022.12.12
 * Author : Willy.Lee (wiljwilj@hotmail.com)
 */
// 0.1.1 - 2021.10.13
// 0.2.0 - 2022.03.09 - wstyle=""
// 0.3.0 - 2022.11.22 - add style type="text/wcss", add link rel="wstylesheet", remove function type
// 0.3.1 - 2022.12.12 - loading wcss after load, add data-wstyle=""

(function(){
"use strict";

var version = "0.3.1";

function ws( style ) {
	var i = this;
	var d = document;
	var s = i.ele = d.createElement("style");
	d.head.appendChild(s);
	i.stylesheet = s.sheet;
	i.cssRules = s.sheet.cssRules;
	
	if (style == null)
		style = "";
	else if (typeof style !== "string" && typeof style !== "object")
		style = style.toString();
	i.style = style;

	i.updateScreenDensity(R5.screenDensity);
}
ws.prototype = {
	updateScreenDensity:function( sd ){
		_updateScreenDensity(this, sd);
	},
	
	destroy:function(){
		var i = this;
		for (var idx = R5.wStyle.styles.length - 1; idx >= 0; idx--) {
			if (R5.wStyle.styles[idx] == this)
				R5.wStyle.styles.splice(idx, 1);
		}
		
		i.stylesheet.disabled = true;
		document.head.removeChild(i.ele);
		i.ele = null;
		i.stylesheet = null;
		i.cssRules = null;
	}
};

function _fromRules( i, sel ) {
	sel = sel.toLowerCase().replace(/^\s+|\s+$/gm,'');
	
	for (var idx = i.cssRules.length - 1; idx >= 0; idx--) {
		var rule = i.cssRules[idx];
		if (rule.selectorText == sel)
			return rule;
	}
}

function _evalValue( v, sd ) {
	var v1 = v.replace(/screenDensity/gi, sd);
	var v2 = v1.replace(/s?[\-0-9.\(\)\+\-\/\*]*dp+/gi, function(mtch) {
		var mm = mtch.replace(/dp/gi, "*"+sd);
		try {
			mm = eval(mm) + "px";
		} catch (e) {
			mm = mtch;
		}
		return mm;
	});
	var v3 = v2.replace(/s?[\-0-9.\(\)\+\-\/\*]*px+/gi, function(mtch) {
		var mm = mtch.replace(/px$/gi, "");
		try {
			mm = eval(mm) + "px";
		} catch (e) {
			mm = mtch;
		}
		return mm;
	});
	return v3;
}

function _updateWStyleInElements( eles, sd ) {
	for (var idx = 0; idx < eles.length; idx++) {
		var ele = eles[idx];
		var wstyle = ele.getAttribute("wstyle");
		if (wstyle == null)
			wstyle = ele.getAttribute("data-wstyle");
		if (wstyle) {
			var ss = wstyle.split(/\s*;\s*/);
			ss.forEach(function( s ){
				var pv = s.split(/\s*:\s*/);
				if (pv.length != 2)
					return;
				var val = _evalValue(pv[1], sd);
				ele.style[pv[0]] = val;
			});
		}
		_updateWStyleInElements(ele.children, sd);
	}
}

function _strstyle2obj( str ){
	var oESs = {};
	
	var spvs = str.split(/\s*}\s*/);
	spvs.forEach(function( spv ){
		spv = spv.split(/\s*{\s*/);
		if (spv.length != 2)
			return;
		var sel = spv[0].replace(/\/\/.*/gm, '').replace(/\s+/gm, ' ').replace(/^\s+|\s+$/gm,'');
		if (sel === "")
			return;
		var oSs = {}
		oESs[sel] = oSs;
		try {
			var styles = spv[1].replace(/^\s+|\s+$/gm,'');
			styles = styles.split(/\s*;\s*/);
			styles.forEach(function( s ){
				var pv = s.split(/\s*:\s*/);
				if (pv.length != 2)
					return;
				oSs[pv[0]] = pv[1];
			});
		} catch (e) {
			console.warn("wStyle: can't apply css - "+sel);
		}
	});
	
	return oESs;
}

function _updateScreenDensity( i, sd ){
	var istyle = i.style;
	if (typeof istyle == "string") {
		istyle = _strstyle2obj(istyle);
	}

	for (var sel in istyle) {
		var rule = _fromRules(i, sel);
		try {
			if (rule == null) {
				var idxR = i.cssRules.length;
				i.stylesheet.insertRule(sel+" {}", idxR);
				rule = i.cssRules[idxR];
			}
			
			var styles = istyle[sel];
			for (var prop in styles) {
				var val = styles[prop];
				if (typeof val == "string") {
					val = _evalValue(val, sd);
				}
				rule.style[prop] = val;
			}
		} catch (e) {
			console.warn("wStyle: can't apply json css - "+sel);
		}
	}
}

function wStyle( t ){
	var s = new ws(t);
	R5.wStyle.styles.push(s);
	return s;
}
wStyle.version = version;

function updateStyleInElements(){
	var bds = document.getElementsByTagName("body");
	_updateWStyleInElements(bds, R5.screenDensity);
	
	var styles = document.getElementsByTagName("style");
	for (var idx = 0; idx < styles.length; idx++) {
		var sty = styles[idx];
		if (sty.type == null || sty.type.toLowerCase() !== "text/wcss")
			continue;
		
		if (sty.R5_ws == null) {
			sty.R5_ws = new ws(sty.outerText);
		}
		sty.R5_ws.updateScreenDensity(R5.screenDensity);
	}
	
	var links = document.getElementsByTagName("link");
	for (var idx = 0; idx < links.length; idx++) {
		var lnk = links[idx];
		if (lnk.rel == null || lnk.rel.toLowerCase() !== "wstylesheet")
			continue;
		
		if (lnk.R5_ws == null) {
			var wcss = new XMLHttpRequest();
			wcss.open("GET", lnk.href, true);
			wcss.send();
			wcss.onreadystatechange = function(){
				if (wcss.readyState == 4 && wcss.status == 200) {
					lnk.R5_ws = new ws(wcss.responseText);
					lnk.R5_ws.updateScreenDensity(R5.screenDensity);
				}
			}
		}
	}
}

function setScreenDensity( sd ){
	if (sd == null)
		sd = R5.screenDensity;
	else
		R5.screenDensity = sd;
	
	R5.wStyle.styles.forEach(function( s ){
		s.updateScreenDensity(sd);
	});
	
	updateStyleInElements();
}


var R5;
if ( typeof exports != 'undefined' )
	R5 = exports.R5 ? exports.R5 : (exports.R5={});
else
	R5 = window.R5 ? window.R5 : (window.R5={});

R5.wStyle = wStyle;
R5.wStyle.styles = [];
R5.wStyle.updateStyleInElements = updateStyleInElements;
R5.screenDensity = 1;
R5.setScreenDensity = setScreenDensity;

window.addEventListener("load", function(){ R5.setScreenDensity() });
})();
