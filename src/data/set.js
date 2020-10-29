import createSet from './set/createSet';

export default function set() {
    const set = {};

    set.id = createSet.call(this, 'id');
    set.stratum = createSet.call(this, 'stratum');
    set.visit = createSet.call(this, 'visit');
    set.measure = createSet.call(this, 'measure');

    return set;
}
