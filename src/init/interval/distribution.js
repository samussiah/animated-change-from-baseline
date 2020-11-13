export default function distribution() {
    this.distribution.summary = d3.rollups(
        this.measure_id,
        (group) => {
            const input = group.map((d) => d.chg);
            const bins = this.distribution.histogram(input);

            return bins;
        },
        (d) => d.stratum
    );

    this.distribution.nBins = d3.max(this.distribution.summary, (d) =>
        d3.max(d[1], (di) => di.length)
    );

    this.distribution.scale.domain([-this.distribution.nBins, this.distribution.nBins]);

    this.distribution.g.data(this.distribution.summary);

    this.distribution.path
        //.datum(d => d[1])
        .attr(
            'd',
            d3
                .area()
                .x((d) => d.x0)
                .y0((d) => this.distribution.scale(-d.length))
                .y1((d) => this.distribution.scale(d.length))
                .curve(d3.curveCatmullRom)
        );
}
