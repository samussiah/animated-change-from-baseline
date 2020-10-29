(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animatedChangeFromBaseline = factory());
}(this, (function () { 'use strict';

    function addElement(name, parent) {
      var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
      var element = parent.append(tagName).classed("acfb-".concat(name), true);
      return element;
    }

    var util = {
      addElement: addElement
    };

    function settings() {
      return {
        // dimensions
        width: null,
        height: null,
        margin: {
          top: 30,
          right: 10,
          bottom: 10,
          left: 90
        },
        // variable mappings
        id_var: 'USUBJID',
        stratum_var: 'ARM',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG'
      };
    }

    function layout() {
      var main = this.util.addElement('main', d3.select(this.element));
      this.settings.width = this.settings.width || main.node().clientWidth;
      this.settings.height = this.settings.height || main.node().clientHeight;
      var svg = this.util.addElement('svg', main, 'svg').attr('width', this.settings.width).attr('height', this.settings.height);
      var g = this.util.addElement('g', main, 'g');
      return {
        main: main,
        svg: svg,
        g: g
      };
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it;

      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;

          var F = function () {};

          return {
            s: F,
            n: function () {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function (e) {
              throw e;
            },
            f: F
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var normalCompletion = true,
          didErr = false,
          err;
      return {
        s: function () {
          it = o[Symbol.iterator]();
        },
        n: function () {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function (e) {
          didErr = true;
          err = e;
        },
        f: function () {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }

    function hasVariables() {
      var has = {};

      var _iterator = _createForOfIteratorHelper(Object.keys(this.settings).filter(function (key) {
        return /_var$/.test(key);
      })),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var setting = _step.value;
          var variable = setting.replace(/_var$/, '');
          has[variable] = this.data[0].hasOwnProperty(this.settings[setting]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return has;
    }

    function mapVariables() {
      var _this = this;

      this.data.forEach(function (d) {
        var _iterator = _createForOfIteratorHelper(Object.keys(_this.settings).filter(function (key) {
          return /_var$/.test(key);
        })),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var setting = _step.value;
            var variable = setting.replace(/_var$/, '');
            d[variable] = ['visit_order', 'result', 'change'].includes(variable) ? parseFloat(d[_this.settings[setting]]) : d[_this.settings[setting]];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }

    function addVariables() {}

    function sort() {//this.data.sort((a,b) => {
      //});
    }

    function mutateData() {
      // Check for existence of variables.
      var has = hasVariables.call(this); // Apply data mappings.

      mapVariables.call(this); // Define new variables.

      addVariables.call(this, has); // Sort data.

      sort.call(this);
    }

    function createSet(variable) {
      var set, array;

      switch (variable) {
        case 'visit':
          set = new Set(this.data.filter(function (d) {
            return !(d.visit_order % 1);
          }).map(function (d) {
            return d.visit + '|' + d.visit_order;
          }));
          array = _toConsumableArray(set.values()).sort(function (a, b) {
            return a.replace(/.*\|/, '') - b.replace(/.*\|/, '');
          }).map(function (value) {
            return value.replace(/\|.*$/, '');
          });
          break;

        default:
          set = new Set(this.data.map(function (d) {
            return d[variable];
          }));
          array = _toConsumableArray(set.values()).sort();
          break;
      }

      return array;
    }

    function set() {
      var set = {};
      set.id = createSet.call(this, 'id');
      set.stratum = createSet.call(this, 'stratum');
      set.visit = createSet.call(this, 'visit');
      set.measure = createSet.call(this, 'measure');
      return set;
    }

    function createGroup(variable) {
      var group;

      switch (variable) {
        default:
          group = d3.group(this.data, function (d) {
            return d[variable];
          });
          break;
      }

      return group;
    }

    function group() {
      var group = {};
      group.id = createGroup.call(this, 'id');
      group.stratum = createGroup.call(this, 'stratum');
      group.visit = createGroup.call(this, 'visit');
      group.measure = createGroup.call(this, 'measure');
      return group;
    }

    function change() {
      var scale = d3.scaleQuantize().domain([-100, 100]).range(d3.range(-3, 4));
      return scale;
    }

    function color() {
      var scale = d3.scaleBand().domain(this.group.stratum).range([this.settings.margin.top, this.settings.height - this.settings.margin.top - this.settings.margin.bottom]);
      return scale;
    }

    function x() {
      var scale = d3.scaleBand().domain(d3.range(-3, 4)).range([this.settings.margin.left, this.settings.width - this.settings.margin.left - this.settings.margin.right]);
      return scale;
    }

    function y() {
      var scale = d3.scaleBand().domain(this.group.stratum).range([this.settings.margin.top, this.settings.height - this.settings.margin.top - this.settings.margin.bottom]);
      return scale;
    }

    function scale() {
      var scale = {};
      scale.change = change.call(this);
      scale.color = color.call(this);
      scale.x = x.call(this);
      scale.y = y.call(this);
      return scale;
    }

    function data() {
      mutateData.call(this);
      this.set = set.call(this);
      this.group = group.call(this);
      this.scale = scale.call(this);
      console.log(this.data);
      console.log(this.set);
      console.log(this.group);
      console.log(this.scale);
    }

    function init() {}

    function forceDirectedGraph(_data_) {
      var _element_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

      var _settings_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var main = {
        data: _data_,
        element: _element_,
        settings: Object.assign(settings(), _settings_),
        util: util
      }; //settings.update.call(main); // Update settings object

      main.layout = layout.call(main); // add elements to DOM

      data.call(main); // mutate and structure data

      init.call(main); // generate the output

      return main;
    }

    return forceDirectedGraph;

})));
