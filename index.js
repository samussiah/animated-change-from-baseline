(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animatedChangeFromBaseline = factory());
}(this, (function () { 'use strict';

    function addElement(name, parent) {
      var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
      var element = parent.append(tagName).classed("acfb-".concat(name, " afcb-").concat(tagName), true);
      return element;
    }

    var util = {
      addElement: addElement
    };

    function settings() {
      return {
        // variable mappings
        id_var: 'USUBJID',
        stratum_var: 'ARM',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG',
        percent_change_var: 'PCHG',
        // timepoint
        timepoint: 0,
        speed: 5000,
        // mark attributes
        shape: 'circle',
        radius: 10,
        // dimensions
        width: null,
        // defined in ./layout
        height: null,
        // defined in ./layout
        margin: {
          top: 69,
          right: 10,
          bottom: 10,
          left: 90
        }
      };
    }

    function layout() {
      var main = this.util.addElement('main', d3.select(this.element));
      this.settings.width = (this.settings.width || main.node().clientWidth) - this.settings.margin.left - this.settings.margin.right;
      this.settings.height = (this.settings.height || main.node().clientHeight * 2 / 3) - this.settings.margin.top - this.settings.margin.bottom;
      var svg = this.util.addElement('svg', main, 'svg').attr('width', this.settings.width + this.settings.margin.left + this.settings.margin.right).attr('height', this.settings.height + this.settings.margin.top + this.settings.margin.bottom);
      var canvas = this.util.addElement('canvas', svg, 'g').attr('transform', "translate(".concat(this.settings.margin.left, ",").concat(this.settings.margin.top, ")"));
      var xAxis = this.util.addElement('x-axis', canvas, 'g'); //.attr('transform', `translate(0,${this.settings.margin.top})`);

      var yAxis = this.util.addElement('y-axis', canvas, 'g'); //.attr('transform', `translate(${this.settings.margin.left},0)`);

      var timepoint = this.util.addElement('timepoint', canvas, 'text') //.attr('x', this.settings.margin.left)
      .attr('y', -this.settings.margin.top / 2);
      return {
        main: main,
        svg: svg,
        xAxis: xAxis,
        yAxis: yAxis,
        canvas: canvas,
        timepoint: timepoint
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

    function addVariables() {
      d3.rollup(this.data, function (group) {
        group.sort(function (a, b) {
          a.visit_order - b.visit_order;
        }); // TODO: don't assume first visit is baseline

        group.baseline = group[0];
        group.forEach(function (d) {
          d.baseline = group.baseline.result;
          d.chg = d.result - d.baseline;
          d.fchg = d.chg / d.baseline;
          d.pchg = d.fchg * 100;
        });
      }, function (d) {
        return d.measure;
      }, function (d) {
        return d.id;
      });
    }

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
        case 'measure,id':
          group = d3.groups(this.data, function (d) {
            return d.measure;
          }, function (d) {
            return d.id;
          });
          break;

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
      group.measure_id = createGroup.call(this, 'measure,id');
      return group;
    }

    function data() {
      mutateData.call(this);
      this.set = set.call(this);
      this.group = group.call(this);
    }

    function x() {
      var maxChange = d3.max(this.subset, function (d) {
        return Math.abs(d.change);
      });
      var scale = d3.scaleLinear().nice().domain([-maxChange, maxChange]).range([0, this.settings.width]);
      return scale;
    }

    function y() {
      var scale = d3.scaleBand().domain(this.set.stratum).range([this.settings.height, 0]);
      return scale;
    }

    function color() {
      var scale = d3.scaleOrdinal().domain(this.set.stratum).range(d3.schemeCategory10);
      return scale;
    }

    function scale() {
      var scale = {};
      scale.x = x.call(this);
      scale.y = y.call(this);
      scale.color = color.call(this); //scale.change = change.call(this);

      return scale;
    }

    function xAxis() {
      var axis = this.layout.xAxis.call(d3.axisTop(this.scale.x).tickSize(-this.settings.height)) //.call(g => g.select('.domain').remove())
      .call(function (g) {
        return g.selectAll('.tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '2,2');
      }); // TODO: move styles to index.css

      this.layout.xAxis.append('text').classed('achb-axis-label achb-axis-label--x', true).attr('text-anchor', 'middle').attr('x', this.settings.width / 2).attr('y', -this.settings.margin.top / 2).style('font-size', '1.5rem').style('fill', 'black').text(this.measure);
      return axis;
    }

    function yAxis() {
      var _this = this;

      var axis = this.layout.yAxis.call(d3.axisLeft(this.scale.y)).call(function (g) {
        var text = g.selectAll('.tick text');
        text.text(null); // Stratum label.

        text.append('tspan').attr('x', -9).attr('text-anchor', 'end').text(function (d) {
          return d;
        }); // Stratum size.

        text.append('tspan').attr('x', -9).attr('text-anchor', 'end').attr('dy', 15).text(function (d) {
          return "n=".concat(new Set(_this.group.stratum.get(d).map(function (d) {
            return d.id;
          })).size);
        });
      });
      return axis;
    }

    function timepoint() {
      var timepoint = this.set.visit[this.settings.timepoint];
      this.layout.timepoint.text(timepoint);
      return timepoint;
    }

    function data$1() {
      var _this = this;

      this.measure_id.forEach(function (group) {
        group.stratum = group[1][0].stratum; // TODO: get most recent prior result if no result found at current timepoint

        group.datum = group[1].find(function (d) {
          return d.visit === _this.timepoint;
        });
        group.chg = group.datum ? group.datum.chg : null;
      });
    }

    function nodes() {
      var _this = this;

      data$1.call(this);
      var nodes = this.layout.canvas.selectAll('circle').data(this.measure_id, function (d) {
        return d[1];
      }).join('circle').attr('r', this.settings.radius).attr('fill', function (d) {
        return _this.scale.color(d.stratum);
      }).attr('fill-opacity', .5).attr('stroke', function (d) {
        return _this.scale.color(d.stratum);
      }).attr('stroke-opacity', 1);
      return nodes;
    }

    function tick() {
      this.nodes //.filter(d => d.pchg_bin !== null)
      .attr('cx', function (d) {
        return d.x;
      }).attr('cy', function (d) {
        return d.y;
      });
    }

    function simulation() {
      var _this = this;

      var simulation = d3.forceSimulation().nodes(this.measure_id) //.force('center', d3.forceCenter()
      //    .x(d => this.scale.x(d.chg))
      //    .y(d => this.scale.y(d.stratum) + this.scale.y.bandwidth() / 2)
      //)
      .force('x', d3.forceX(function (d) {
        return _this.scale.x(d.chg);
      })).force('y', d3.forceY(function (d) {
        return _this.scale.y(d.stratum) + _this.scale.y.bandwidth() / 2;
      })).force('collide', d3.forceCollide().radius(this.settings.radius + 1)) //.force('charge', d3.forceManyBody())
      .on('tick', tick.bind(this));
      return simulation;
    }

    function simulation$1() {
      var _this = this;

      this.simulation.alpha(1).force('x', d3.forceX(function (d) {
        return _this.scale.x(d.chg);
      })).force('y', d3.forceY(function (d) {
        return _this.scale.y(d.stratum) + _this.scale.y.bandwidth() / 2;
      })).restart();
    }

    function interval() {
      var _this = this;

      var interval = d3.interval(function () {
        _this.settings.timepoint++;
        if (_this.settings.timepoint >= _this.set.visit.length) _this.settings.timepoint = 0;
        _this.timepoint = timepoint.call(_this);
        data$1.call(_this);
        simulation$1.call(_this);
      }, this.settings.speed);
      return interval;
    }

    function init() {
      var _this = this;

      this.measure = this.set.measure[Math.floor(Math.random() * this.set.measure.length)];
      this.measure_id = this.group.measure_id.find(function (d) {
        return d[0] === _this.measure;
      })[1];
      this.subset = this.data.filter(function (d) {
        return d.measure === _this.measure;
      });
      this.scale = scale.call(this);
      this.xAxis = xAxis.call(this);
      this.yAxis = yAxis.call(this);
      this.timepoint = timepoint.call(this);
      this.nodes = nodes.call(this);
      this.simulation = simulation.call(this);
      this.interval = interval.call(this);
    }

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
