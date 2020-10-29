import change from './scale/change';
import color from './scale/color';
import x from './scale/x';
import y from './scale/y';

export default function scale() {
    const scale = {};

    scale.change = change.call(this);
    scale.color = color.call(this);
    scale.x = x.call(this);
    scale.y = y.call(this);

    return scale;
}
