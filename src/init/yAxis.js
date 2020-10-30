export default function yAxis() {
    const axis = d3.axisLeft(this.scale.y)(this.layout.yAxis);

    return axis;
}
