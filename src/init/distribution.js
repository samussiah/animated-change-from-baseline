export default function distribution() {
    const binGenerator = d3.bin()
        .domain(this.scale.x.domain())
        .thresholds(this.scale.x.ticks(20));

    const rollups = d3.rollups(
        this.measure_id,
        (group) => {
            const input = group.map((d) => d.chg);
            const bins = binGenerator(input);

            return bins;
        },
        (d) => d.stratum
    );

    rollups.forEach(d => {
        d[1].stratum = d[0];
    });

    const nBins = d3.max(
        rollups,
        (d) => d3.max(d[1], (di) => di.length)
    );

    const binScale = d3.scaleLinear()
        .range([0, this.scale.y.bandwidth()])
        .domain([-nBins, nBins]);

    const violins = this.util
        .addElement('violin', this.layout.violins, 'g', rollups)
        .attr('transform', (d) => `translate(0,${this.scale.y(d[0])})`)
        .append('path')
        .datum((d) => d[1])
        .style('fill', d => this.scale.color(d.stratum))
        .style('fill-opacity', .5)
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
