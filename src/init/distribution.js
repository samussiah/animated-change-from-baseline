export default function distribution() {
    const binGenerator = d3.bin().domain(this.scale.x.domain()).thresholds(this.scale.x.ticks(20));

    const rollups = d3
        .rollups(
            this.measure_id,
            (group) => {
                const input = group.map((d) => d[this.settings.outcome]);
                const bins = binGenerator(input);

                return bins;
            },
            (d) => d.stratum
        )
        .sort((a, b) => (a[0] < b[0] ? -1 : 1));

    rollups.forEach((d) => {
        d[1].stratum = d[0];
    });

    const nBins = d3.max(rollups, (d) => d3.max(d[1], (di) => di.length));

    const binScale = d3.scaleLinear().range([0, this.scale.y.bandwidth()]).domain([-nBins, nBins]);

    const violins = this.util
        .addElement('violin', this.layout.violins, 'g', rollups, (d) => d[0])
        .attr('transform', (d) => `translate(0,${this.scale.y(d[0])})`);
    violins
        .append('path')
        .datum((d) => d[1])
        .style('fill', (d) => '#aaa')
        .style('fill-opacity', 0.25)
        .style('stroke', 'none')
        .attr(
            'd',
            d3
                .area()
                .x((d) => this.scale.x(d.x0))
                .y0((d) => binScale(-d.length))
                .y1((d) => binScale(d.length))
                .curve(d3.curveCatmullRom)
        );

    return {
        binGenerator,
        rollups,
        binScale,
        violins,
    };
}
