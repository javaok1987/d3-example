/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./script/metro-stations.js ***!
  \**********************************/
/***/ (function(module, exports) {

eval("var stations = [\n  '南港展覽館站',\n  '南港站',\n  '昆陽站',\n  '後山埤站',\n  '永春站',\n  '市政府站',\n  '國父紀念館站',\n  '忠孝敦化站',\n  '忠孝復興站',\n  '忠孝新生站',\n  '善導寺站',\n  '台北車站',\n  '西門站',\n  '龍山寺站',\n  '江子翠站',\n  '新埔站',\n  '板橋站',\n  '府中站',\n  '亞東醫院站',\n  '海山站',\n  '土城站',\n  '永寧站',\n  '頂埔站'\n];\n\nvar nodesByName = {};\n\n// set the dimensions and margins of the diagram\nvar margin = {\n    top: -90,\n    right: 90,\n    bottom: 30,\n    left: 90\n  },\n  width = 1024 - margin.left - margin.right,\n  height = 300 - margin.top - margin.bottom;\n\nvar treeData = {};\n\nvar treemap = d3.tree().size([height, width]);\n\nvar setNode = function (node, name, child) {\n  if (node.children) {\n    setNode(node.children[0], name, child);\n  } else {\n    node['name'] = name;\n    node['children'] = [{\n      name: child\n    }];\n  }\n}\n\nfor (var i = 0; i < stations.length - 1; i++) {\n  setNode(treeData, stations[i], stations[i + 1]);\n}\n\n\nvar nodes = d3.hierarchy(treeData);\n\nnodes = treemap(nodes);\n\nvar svg = d3.select('svg')\n  .attr('width', width + margin.left + margin.right)\n  .attr('height', height + margin.top + margin.bottom),\n  g = svg.append('g')\n  .attr('transform',\n    'translate(' + margin.left + ',' + margin.top + ')');\n\n\nvar link = g.selectAll('.link')\n  .data(nodes.descendants().slice(1))\n  .enter().append('path')\n  .attr('class', 'link')\n  .attr('d', function (d) {\n    return 'M' + d.y + ',' + d.x +\n      'C' + (d.y + d.parent.y) / 2 + ',' + d.x +\n      ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x +\n      ' ' + d.parent.y + ',' + d.parent.x;\n  });\n\nvar node = g.selectAll('.node')\n  .data(nodes.descendants())\n  .enter().append('g')\n  .attr('class', function (d) {\n    return 'node' +\n      (d.children ? ' node--internal' : ' node--leaf');\n  })\n  .attr('transform', function (d) {\n    return 'translate(' + d.y + ',' + d.x + ')';\n  });\n\n\nnode.append('circle')\n  .attr('r', 5);\n\nnode.append('text')\n  .attr('dy', '5em')\n  .style('text-anchor', 'middle')\n  .style('writing-mode', 'tb')\n  .text(function (d) {\n    return d.data.name;\n  });\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NjcmlwdC9tZXRyby1zdGF0aW9ucy5qcz9mMjJmIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzdGF0aW9ucyA9IFtcbiAgJ+WNl+a4r+WxleimvemkqOermScsXG4gICfljZfmuK/nq5knLFxuICAn5piG6Zm956uZJyxcbiAgJ+W+jOWxseWfpOermScsXG4gICfmsLjmmKXnq5knLFxuICAn5biC5pS/5bqc56uZJyxcbiAgJ+Wci+eItue0gOW/temkqOermScsXG4gICflv6DlrZ3mlabljJbnq5knLFxuICAn5b+g5a2d5b6p6IiI56uZJyxcbiAgJ+W/oOWtneaWsOeUn+ermScsXG4gICflloTlsI7lr7rnq5knLFxuICAn5Y+w5YyX6LuK56uZJyxcbiAgJ+ilv+mWgOermScsXG4gICfpvo3lsbHlr7rnq5knLFxuICAn5rGf5a2Q57+g56uZJyxcbiAgJ+aWsOWflOermScsXG4gICfmnb/mqYvnq5knLFxuICAn5bqc5Lit56uZJyxcbiAgJ+S6nuadsemGq+mZouermScsXG4gICfmtbflsbHnq5knLFxuICAn5Zyf5Z+O56uZJyxcbiAgJ+awuOWvp+ermScsXG4gICfpoILln5Tnq5knXG5dO1xuXG52YXIgbm9kZXNCeU5hbWUgPSB7fTtcblxuLy8gc2V0IHRoZSBkaW1lbnNpb25zIGFuZCBtYXJnaW5zIG9mIHRoZSBkaWFncmFtXG52YXIgbWFyZ2luID0ge1xuICAgIHRvcDogLTkwLFxuICAgIHJpZ2h0OiA5MCxcbiAgICBib3R0b206IDMwLFxuICAgIGxlZnQ6IDkwXG4gIH0sXG4gIHdpZHRoID0gMTAyNCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICBoZWlnaHQgPSAzMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxudmFyIHRyZWVEYXRhID0ge307XG5cbnZhciB0cmVlbWFwID0gZDMudHJlZSgpLnNpemUoW2hlaWdodCwgd2lkdGhdKTtcblxudmFyIHNldE5vZGUgPSBmdW5jdGlvbiAobm9kZSwgbmFtZSwgY2hpbGQpIHtcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBzZXROb2RlKG5vZGUuY2hpbGRyZW5bMF0sIG5hbWUsIGNoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICBub2RlWyduYW1lJ10gPSBuYW1lO1xuICAgIG5vZGVbJ2NoaWxkcmVuJ10gPSBbe1xuICAgICAgbmFtZTogY2hpbGRcbiAgICB9XTtcbiAgfVxufVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IHN0YXRpb25zLmxlbmd0aCAtIDE7IGkrKykge1xuICBzZXROb2RlKHRyZWVEYXRhLCBzdGF0aW9uc1tpXSwgc3RhdGlvbnNbaSArIDFdKTtcbn1cblxuXG52YXIgbm9kZXMgPSBkMy5oaWVyYXJjaHkodHJlZURhdGEpO1xuXG5ub2RlcyA9IHRyZWVtYXAobm9kZXMpO1xuXG52YXIgc3ZnID0gZDMuc2VsZWN0KCdzdmcnKVxuICAuYXR0cignd2lkdGgnLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pLFxuICBnID0gc3ZnLmFwcGVuZCgnZycpXG4gIC5hdHRyKCd0cmFuc2Zvcm0nLFxuICAgICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJyk7XG5cblxudmFyIGxpbmsgPSBnLnNlbGVjdEFsbCgnLmxpbmsnKVxuICAuZGF0YShub2Rlcy5kZXNjZW5kYW50cygpLnNsaWNlKDEpKVxuICAuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAuYXR0cignY2xhc3MnLCAnbGluaycpXG4gIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gJ00nICsgZC55ICsgJywnICsgZC54ICtcbiAgICAgICdDJyArIChkLnkgKyBkLnBhcmVudC55KSAvIDIgKyAnLCcgKyBkLnggK1xuICAgICAgJyAnICsgKGQueSArIGQucGFyZW50LnkpIC8gMiArICcsJyArIGQucGFyZW50LnggK1xuICAgICAgJyAnICsgZC5wYXJlbnQueSArICcsJyArIGQucGFyZW50Lng7XG4gIH0pO1xuXG52YXIgbm9kZSA9IGcuc2VsZWN0QWxsKCcubm9kZScpXG4gIC5kYXRhKG5vZGVzLmRlc2NlbmRhbnRzKCkpXG4gIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgcmV0dXJuICdub2RlJyArXG4gICAgICAoZC5jaGlsZHJlbiA/ICcgbm9kZS0taW50ZXJuYWwnIDogJyBub2RlLS1sZWFmJyk7XG4gIH0pXG4gIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnkgKyAnLCcgKyBkLnggKyAnKSc7XG4gIH0pO1xuXG5cbm5vZGUuYXBwZW5kKCdjaXJjbGUnKVxuICAuYXR0cigncicsIDUpO1xuXG5ub2RlLmFwcGVuZCgndGV4dCcpXG4gIC5hdHRyKCdkeScsICc1ZW0nKVxuICAuc3R5bGUoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gIC5zdHlsZSgnd3JpdGluZy1tb2RlJywgJ3RiJylcbiAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gZC5kYXRhLm5hbWU7XG4gIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3JpcHQvbWV0cm8tc3RhdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),

/***/ 5:
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** multi ./script/metro-stations.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./script/metro-stations.js */2);


/***/ })

/******/ });