export default function change() {
    const scale = d3.scaleQuantize().domain([-100, 100]).range(d3.range(-3, 4));

    return scale;
}
