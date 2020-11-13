export default function data() {
    this.measure_id.forEach((group) => {
        group.stratum = group[1][0].stratum;
        // TODO: get most recent prior result if no result found at current timepoint
        group.datum = group[1].find((d) => d.visit === this.timepoint);
        group.chg = group.datum ? group.datum.chg : null;
    });
}
