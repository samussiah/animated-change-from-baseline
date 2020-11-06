export default function yAxis() {
    const axis = this.layout.yAxis
        .call(
            d3.axisLeft(this.scale.y)
        )
        .call(g => {
            const text = g.selectAll('.tick text');
            text.text(null);

            // Stratum label.
            text.append('tspan')
                .attr('x', -9)
                .attr('text-anchor', 'end')
                .text(d => d);

            // Stratum size.
            text.append('tspan')
                .attr('x', -9)
                .attr('text-anchor', 'end')
                .attr('dy', 15)
                .text(d => `n=${new Set(this.group.stratum.get(d).map(d => d.id)).size}`);
        });

    return axis;
}
