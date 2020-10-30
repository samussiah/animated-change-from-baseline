import x from './scale/x';
import y from './scale/y';
import color from './scale/color';
import change from './scale/change';

export default function scale() {
    const scale = {};

    scale.x = x.call(this);
    scale.y = y.call(this);
    scale.color = color.call(this);
    //scale.change = change.call(this);

    return scale;
}
