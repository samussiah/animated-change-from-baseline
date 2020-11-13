export default function addVariables() {
    d3.rollup(
        this.data,
        (group) => {
            group.sort((a, b) => {
                a.visit_order - b.visit_order;
            });
            // TODO: don't assume first visit is baseline
            group.baseline = group[0];
            group.forEach((d) => {
                d.baseline = group.baseline.result;
                d.chg = d.result - d.baseline;
                d.fchg = d.chg / d.baseline;
                d.pchg = d.fchg * 100;
            });
        },
        (d) => d.measure,
        (d) => d.id
    );
}
