export default function xAxis() {
    const axis = d3.axisTop(this.scale.x)(this.layout.xAxis);

    return axis;
}
