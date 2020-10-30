import createGroup from './group/createGroup';

export default function group() {
    const group = {};

    group.id = createGroup.call(this, 'id');
    group.stratum = createGroup.call(this, 'stratum');
    group.visit = createGroup.call(this, 'visit');
    group.measure = createGroup.call(this, 'measure');
    group.measure_id = createGroup.call(this, 'measure,id');

    return group;
}
