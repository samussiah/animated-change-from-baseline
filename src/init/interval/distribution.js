export default function distribution() {
    this.distribution.rollups = d3.rollups(
        this.measure_id,
        (group) => {
            const input = group.map((d) => d.chg);
            const bins = this.distribution.binGenerator(input);

            return bins;
        },
        (d) => d.stratum
    );

    this.distribution.rollups.forEach(d => {
        d[1].stratum = d[0];
    });

    this.distribution.nBins = d3.max(this.distribution.rollups, (d) =>
        d3.max(d[1], (di) => di.length)
    );

    this.distribution.binScale
        .domain([-this.distribution.nBins, this.distribution.nBins]);

    this.layout.violins.select('g').remove();
    this.distribution.violins = this.util
        .addElement('violin', this.layout.violins, 'g', this.distribution.rollups)
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
                .y0((d) => this.distribution.binScale(-d.length))
                .y1((d) => this.distribution.binScale(d.length))
                .curve(d3.curveCatmullRom)
        );
}
