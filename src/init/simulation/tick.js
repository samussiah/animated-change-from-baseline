export default function tick() {
    this.nodes
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
}
