import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';
import scale from './data/scale';

export default function data() {
    mutate.call(this);
    this.set = set.call(this);
    this.group = group.call(this);
    this.scale = scale.call(this);
    console.log(this.data);
    console.log(this.set);
    console.log(this.group);
    console.log(this.scale);
}
