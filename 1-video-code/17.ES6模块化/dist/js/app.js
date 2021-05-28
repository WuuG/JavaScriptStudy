'use strict';

var _common = require('./common.js');

var m1 = _interopRequireWildcard(_common);

var _expose = require('./expose2.js');

var m2 = _interopRequireWildcard(_expose);

var _expose2 = require('./expose3.js');

var m3 = _interopRequireWildcard(_expose2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//入口文件

//模块引入
(0, _jquery2.default)('body').css('background', 'pink');
// console.log(m1, m2, m3);
// m1.rule()
// m2.findJob()
// m3.default.change()
//修改背景颜色