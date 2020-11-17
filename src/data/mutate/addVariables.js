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
                d.change = d.chg;
                d.pchg = d.baseline !== 0 ? (d.chg / d.baseline) * 100 : NaN;
                d.percent_change = d.pchg;
                //d.change = has.change
                //    ? d.change
                //    : d.result - d.baseline;
                //d.chg = d.change;
                //d.percent_change = has.percent_change
                //    ? d.percent_change
                //    : d.change / d.baseline * 100;
                //d.pchg = d.percent_change;
            });
        },
        (d) => d.measure,
        (d) => d.id
    );
}
