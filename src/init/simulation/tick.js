export default function tick() {
    this.nodes
      //.filter(d => d.pchg_bin !== null)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
}
