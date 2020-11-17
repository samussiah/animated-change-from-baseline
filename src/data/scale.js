import result from './scale/result';
import change from './scale/change';
import percentChange from './scale/percentChange';
import y from './scale/y';
import color from './scale/color';

export default function scale() {
    const scale = {};

    scale.result = result.call(this);
    scale.change = change.call(this);
    scale.percent_change = percentChange.call(this);
    scale.x = scale[this.settings.outcome];
    scale.y = y.call(this);
    scale.color = color.call(this);

    return scale;
}
