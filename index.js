(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
          (global.animatedChangeFromBaseline = factory()));
})(this, function () {
    'use strict';

    function addElement(name, parent) {
        var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
        var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        return data
            ? parent
                  .selectAll(''.concat(tagName, '.acfb-').concat(name, '.acfb-').concat(tagName))
                  .data(data)
                  .join(tagName)
                  .classed('acfb-'.concat(name, ' acfb-').concat(tagName), true) // multiple elements
            : parent.append(tagName).classed('acfb-'.concat(name, ' acfb-').concat(tagName), true); // single element
    }

    var util = {
        addElement: addElement,
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
            play: true,
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
                left: 90,
            },
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
                symbols = symbols.filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
            keys.push.apply(keys, symbols);
        }

        return keys;
    }

    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
                ownKeys(Object(source), true).forEach(function (key) {
                    _defineProperty(target, key, source[key]);
                });
            } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
                ownKeys(Object(source)).forEach(function (key) {
                    Object.defineProperty(
                        target,
                        key,
                        Object.getOwnPropertyDescriptor(source, key)
                    );
                });
            }
        }

        return target;
    }

    function _toConsumableArray(arr) {
        return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
        );
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
        if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
            return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === 'Object' && o.constructor) n = o.constructor.name;
        if (n === 'Map' || n === 'Set') return Array.from(o);
        if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

        return arr2;
    }

    function _nonIterableSpread() {
        throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
    }

    function _createForOfIteratorHelper(o, allowArrayLike) {
        var it;

        if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
            if (
                Array.isArray(o) ||
                (it = _unsupportedIterableToArray(o)) ||
                (allowArrayLike && o && typeof o.length === 'number')
            ) {
                if (it) o = it;
                var i = 0;

                var F = function () {};

                return {
                    s: F,
                    n: function () {
                        if (i >= o.length)
                            return {
                                done: true,
                            };
                        return {
                            done: false,
                            value: o[i++],
                        };
                    },
                    e: function (e) {
                        throw e;
                    },
                    f: F,
                };
            }

            throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
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
            },
        };
    }

    function getDimensions(main) {
        this.settings.width =
            (this.settings.width || main.node().clientWidth) -
            this.settings.margin.left -
            this.settings.margin.right;
        this.settings.height =
            (this.settings.height || (main.node().clientHeight * 2) / 3) -
            this.settings.margin.top -
            this.settings.margin.bottom;
    }

    function timepoint() {
        var timepoint = this.set.visit[this.settings.timepoint];
        this.layout.timepoint.text(timepoint);
        return timepoint;
    }

    function data() {
        var _this = this;

        this.measure_id.forEach(function (group) {
            group.stratum = group[1][0].stratum; // TODO: get most recent prior result if no result found at current timepoint

            group.datum = group[1].find(function (d) {
                return d.visit === _this.timepoint;
            });
            group.chg = group.datum ? group.datum.chg : null;
        });
    }

    function simulation() {
        var _this = this;

        this.simulation
            .alpha(1)
            .force(
                'x',
                d3.forceX(function (d) {
                    return _this.scale.x(d.chg);
                })
            )
            .force(
                'y',
                d3.forceY(function (d) {
                    return _this.scale.y(d.stratum) + _this.scale.y.bandwidth() / 2;
                })
            )
            .restart();
    }

    function distribution() {
        var _this = this;

        this.distribution.summary = d3.rollups(
            this.measure_id,
            function (group) {
                var input = group.map(function (d) {
                    return d.chg;
                });

                var bins = _this.distribution.histogram(input);

                return bins;
            },
            function (d) {
                return d.stratum;
            }
        );
        this.distribution.nBins = d3.max(this.distribution.summary, function (d) {
            return d3.max(d[1], function (di) {
                return di.length;
            });
        });
        this.distribution.scale.domain([-this.distribution.nBins, this.distribution.nBins]);
        this.distribution.g.data(this.distribution.summary);
        this.distribution.path //.datum(d => d[1])
            .attr(
                'd',
                d3
                    .area()
                    .x(function (d) {
                        return d.x0;
                    })
                    .y0(function (d) {
                        return _this.distribution.scale(-d.length);
                    })
                    .y1(function (d) {
                        return _this.distribution.scale(d.length);
                    })
                    .curve(d3.curveCatmullRom)
            );
    }

    function iterate() {
        this.settings.timepoint++;
        if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0;
        this.timepoint = timepoint.call(this);
        data.call(this);
        simulation.call(this);
        distribution.call(this);
    }
    function interval() {
        var _this = this;

        var interval = d3.interval(function () {
            iterate.call(_this);
        }, this.settings.speed);
        return interval;
    }

    function play(controls) {
        var main = this;
        var div = this.util.addElement('play', controls);
        var button = this.util
            .addElement('button', div, 'button')
            .text(this.settings.play ? 'pause' : 'play');
        button.on('click', function () {
            main.settings.play = !main.settings.play;
            d3.select(this).text(main.settings.play ? 'pause' : 'play');
            if (main.settings.play) main.interval = interval.call(main);
            else main.interval.stop();
        });
        return {
            div: div,
            button: button,
        };
    }

    function step(controls) {
        var main = this;
        var div = this.util.addElement('step', controls);
        var buttons = this.util.addElement('button', div, 'button', ['<', '>']).text(function (d) {
            return d;
        });
        buttons.on('click', function () {
            main.settings.play = false;
            main.controls.play.button.text('play');
            if (main.interval) main.interval.stop();
            var direction = this.textContent;
            if (direction === '<')
                main.settings.timepoint =
                    main.settings.timepoint === 0
                        ? main.set.visit.length - 2 // displays the last timepoint
                        : main.settings.timepoint - 2; // displays the previous timepoint

            iterate.call(main);
        });
        return {
            div: div,
            buttons: buttons,
        };
    }

    function controls(main) {
        var controls = this.util.addElement('controls', main);
        this.controls = {
            play: play.call(this, controls),
            step: step.call(this, controls),
        };
        return controls;
    }

    function canvas(main) {
        var svg = this.util
            .addElement('svg', main, 'svg')
            .attr(
                'width',
                this.settings.width + this.settings.margin.left + this.settings.margin.right
            )
            .attr(
                'height',
                this.settings.height + this.settings.margin.top + this.settings.margin.bottom
            );
        var canvas = this.util
            .addElement('canvas', svg, 'g')
            .attr(
                'transform',
                'translate('
                    .concat(this.settings.margin.left, ',')
                    .concat(this.settings.margin.top, ')')
            );
        var timepoint = this.util
            .addElement('timepoint', canvas, 'text') //.attr('x', this.settings.margin.left)
            .attr('y', -this.settings.margin.top / 2);
        var xAxis = this.util.addElement('x-axis', canvas, 'g'); //.attr('transform', `translate(0,${this.settings.margin.top})`);

        var yAxis = this.util.addElement('y-axis', canvas, 'g'); //.attr('transform', `translate(${this.settings.margin.left},0)`);

        var bubbles = this.util.addElement('bubbles', canvas, 'g');
        var violins = this.util.addElement('violins', canvas, 'g');
        return {
            svg: svg,
            canvas: canvas,
            timepoint: timepoint,
            xAxis: xAxis,
            yAxis: yAxis,
            bubbles: bubbles,
            violins: violins,
        };
    }

    function layout() {
        var main = this.util.addElement('main', d3.select(this.element));
        getDimensions.call(this, main);
        var controls$1 = controls.call(this, main);
        var canvas$1 = canvas.call(this, main);
        return _objectSpread2(
            {
                main: main,
                controls: controls$1,
            },
            canvas$1
        );
    }

    function hasVariables() {
        var has = {};

        var _iterator = _createForOfIteratorHelper(
                Object.keys(this.settings).filter(function (key) {
                    return /_var$/.test(key);
                })
            ),
            _step;

        try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
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
            var _iterator = _createForOfIteratorHelper(
                    Object.keys(_this.settings).filter(function (key) {
                        return /_var$/.test(key);
                    })
                ),
                _step;

            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var setting = _step.value;
                    var variable = setting.replace(/_var$/, '');
                    d[variable] = ['visit_order', 'result', 'change'].includes(variable)
                        ? parseFloat(d[_this.settings[setting]])
                        : d[_this.settings[setting]];
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
        });
    }

    function addVariables() {
        d3.rollup(
            this.data,
            function (group) {
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
            },
            function (d) {
                return d.measure;
            },
            function (d) {
                return d.id;
            }
        );
    }

    function sort() {
        //this.data.sort((a,b) => {
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
                set = new Set(
                    this.data
                        .filter(function (d) {
                            return !(d.visit_order % 1);
                        })
                        .map(function (d) {
                            return d.visit + '|' + d.visit_order;
                        })
                );
                array = _toConsumableArray(set.values())
                    .sort(function (a, b) {
                        return a.replace(/.*\|/, '') - b.replace(/.*\|/, '');
                    })
                    .map(function (value) {
                        return value.replace(/\|.*$/, '');
                    });
                break;

            default:
                set = new Set(
                    this.data.map(function (d) {
                        return d[variable];
                    })
                );
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
                group = d3.groups(
                    this.data,
                    function (d) {
                        return d.measure;
                    },
                    function (d) {
                        return d.id;
                    }
                );
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

    function data$1() {
        mutateData.call(this);
        this.set = set.call(this);
        this.group = group.call(this);
    }

    function x() {
        var maxChange = d3.max(this.subset, function (d) {
            return Math.abs(d.change);
        });
        var scale = d3
            .scaleLinear()
            .nice()
            .domain([-maxChange, maxChange])
            .range([0, this.settings.width]);
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
        var axis = this.layout.xAxis
            .call(d3.axisTop(this.scale.x).tickSize(-this.settings.height)) //.call(g => g.select('.domain').remove())
            .call(function (g) {
                return g
                    .selectAll('.tick line')
                    .attr('stroke-opacity', 0.5)
                    .attr('stroke-dasharray', '2,2');
            }); // TODO: move styles to index.css

        this.layout.xAxis
            .append('text')
            .classed('achb-axis-label achb-axis-label--x', true)
            .attr('text-anchor', 'middle')
            .attr('x', this.settings.width / 2)
            .attr('y', -this.settings.margin.top / 2)
            .style('font-size', '1.5rem')
            .style('fill', 'black')
            .text(this.measure);
        return axis;
    }

    function yAxis() {
        var _this = this;

        var axis = this.layout.yAxis.call(d3.axisLeft(this.scale.y)).call(function (g) {
            var text = g.selectAll('.tick text');
            text.text(null); // Stratum label.

            text.append('tspan')
                .attr('x', -9)
                .attr('text-anchor', 'end')
                .text(function (d) {
                    return d;
                }); // Stratum size.

            text.append('tspan')
                .attr('x', -9)
                .attr('text-anchor', 'end')
                .attr('dy', 15)
                .text(function (d) {
                    return 'n='.concat(
                        new Set(
                            _this.group.stratum.get(d).map(function (d) {
                                return d.id;
                            })
                        ).size
                    );
                });
        });
        return axis;
    }

    function nodes() {
        var _this = this;

        data.call(this);
        var nodes = this.layout.bubbles
            .selectAll('circle')
            .data(this.measure_id, function (d) {
                return d[1];
            })
            .join('circle')
            .attr('r', this.settings.radius)
            .attr('fill', function (d) {
                return _this.scale.color(d.stratum);
            })
            .attr('fill-opacity', 0.5)
            .attr('stroke', function (d) {
                return _this.scale.color(d.stratum);
            })
            .attr('stroke-opacity', 1);
        return nodes;
    }

    function tick() {
        this.nodes //.filter(d => d.pchg_bin !== null)
            .attr('cx', function (d) {
                return d.x;
            })
            .attr('cy', function (d) {
                return d.y;
            });
    }

    function simulation$1() {
        var _this = this;

        var simulation = d3
            .forceSimulation()
            .nodes(this.measure_id) //.force('center', d3.forceCenter()
            //    .x(d => this.scale.x(d.chg))
            //    .y(d => this.scale.y(d.stratum) + this.scale.y.bandwidth() / 2)
            //)
            .force(
                'x',
                d3.forceX(function (d) {
                    return _this.scale.x(d.chg);
                })
            )
            .force(
                'y',
                d3.forceY(function (d) {
                    return _this.scale.y(d.stratum) + _this.scale.y.bandwidth() / 2;
                })
            )
            .force('collide', d3.forceCollide().radius(this.settings.radius + 1)) //.force('charge', d3.forceManyBody())
            .on('tick', tick.bind(this));
        return simulation;
    }

    function distribution$1() {
        var _this = this;

        var binGenerator = d3
            .bin()
            .domain(this.scale.x.domain())
            .thresholds(this.scale.x.ticks(20));
        var rollups = d3.rollups(
            this.measure_id,
            function (group) {
                var input = group.map(function (d) {
                    return d.chg;
                });
                var bins = binGenerator(input);
                return bins;
            },
            function (d) {
                return d.stratum;
            }
        );
        var nBins = d3.max(rollups, function (d) {
            return d3.max(d[1], function (di) {
                return di.length;
            });
        });
        var binScale = d3
            .scaleLinear()
            .range([0, this.scale.y.bandwidth()])
            .domain([-nBins, nBins]);
        var violins = this.util
            .addElement('violin', this.layout.canvas, 'g', rollups)
            .attr('transform', function (d) {
                return 'translate(0,'.concat(_this.scale.y(d[0]), ')');
            })
            .append('path')
            .datum(function (d) {
                return d[1];
            })
            .style('stroke', 'none')
            .style('fill', '#69b3a2')
            .attr(
                'd',
                d3
                    .area()
                    .x(function (d) {
                        console.log(d.x0);
                        return _this.scale.x(d.x0);
                    })
                    .y0(function (d) {
                        return binScale(-d.length);
                    })
                    .y1(function (d) {
                        return binScale(d.length);
                    })
                    .curve(d3.curveCatmullRom)
            );
        console.log(violins.node());
        return {
            binGenerator: binGenerator,
            rollups: rollups,
            binScale: binScale,
            violins: violins,
        };
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
        this.simulation = simulation$1.call(this);
        this.distribution = distribution$1.call(this);
        if (this.settings.play) this.interval = interval.call(this);
    }

    function forceDirectedGraph(_data_) {
        var _element_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

        var _settings_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var main = {
            data: _data_,
            element: _element_,
            settings: Object.assign(settings(), _settings_),
            util: util,
        }; //settings.update.call(main); // Update settings object

        main.layout = layout.call(main); // add elements to DOM

        data$1.call(main); // mutate and structure data

        init.call(main); // generate the output

        return main;
    }

    return forceDirectedGraph;
});
