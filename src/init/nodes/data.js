export default function data() {
    this.measure_id = this.group.measure_id
        .find((d) => d[0] === this.measure)[1]
        .filter((group) => {
            group.datum = group[1].find((d) => d.visit === this.timepoint);
            return group.datum !== undefined;
        });

    this.measure_id.forEach((group) => {
        group.stratum = group[1][0].stratum;
        group.result = group.datum ? group.datum.result : null;
        group.chg = group.datum ? group.datum.chg : null;
        group.change = group.chg;
        group.pchg = group.datum ? group.datum.pchg : null;
        group.percent_change = group.pchg;
        group.tooltip = group.datum
            ? ['id', 'stratum', 'visit', 'measure', 'result', 'chg', 'pchg']
                  .map(
                      (variable) =>
                          `${this.settings.var_labels[variable]}: ${group.datum[variable]}`
                  )
                  .join('\n')
            : null;
    });
}
