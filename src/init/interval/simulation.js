export default function simulation() {
    this.simulation
        .alpha(1)
        .force(
            'x',
            d3.forceX((d) => this.scale.x(d.chg))
        )
        .force(
            'y',
            d3.forceY((d) => this.scale.y(d.stratum) + this.scale.y.bandwidth() / 2)
        )
        .restart();
}
