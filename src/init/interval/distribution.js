export default function distribution() {
    this.distribution.binGenerator = d3
        .bin()
        .domain(this.scale.x.domain())
        .thresholds(this.scale.x.ticks(20));

    this.distribution.rollups = d3
        .rollups(
            this.measure_id,
            (group) => {
                const input = group.map((d) => d[this.settings.outcome]);
                const bins = this.distribution.binGenerator(input);

                return bins;
            },
            (d) => d.stratum
        )
        .sort((a, b) => (a[0] < b[0] ? -1 : 1));

    this.distribution.rollups.forEach((d) => {
        d[1].stratum = d[0];
    });

    this.distribution.nBins = d3.max(this.distribution.rollups, (d) =>
        d3.max(d[1], (di) => di.length)
    );

    this.distribution.binScale.domain([-this.distribution.nBins, this.distribution.nBins]);

    this.distribution.violins.data(this.distribution.rollups, (d) => d[0]);
    this.distribution.violins
        .select('path')
        .datum((d) => d[1])
        .transition()
        .duration(this.settings.speed / 4)
        .attr(
            'd',
            d3
                .area()
                .x((d) => this.scale.x(d.x0))
                .y0((d) => this.distribution.binScale(-d.length))
                .y1((d) => this.distribution.binScale(d.length))
                .curve(d3.curveCatmullRom)
        );
}
