export default function settings() {
    return {
        // variable mappings
        id_var: 'USUBJID',
        stratum_var: 'ARM',
        strata: null,
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG',
        percent_change_var: 'PCHG',
        outcome: 'change', // x-axis variable
        var_labels: {
            id: 'Participant ID',
            stratum: 'Stratum',
            visit: 'Visit',
            visit_order: 'Visit Order',
            measure: 'Measure',
            result: 'Result',
            change: 'Change',
            chg: 'Change',
            percent_change: '% Change',
            pchg: '% Change',
            fold_change: 'Fold Change',
            fchg: 'Fold Change',
        },

        // timepoint
        timepoint: 0,
        speed: 5000,
        play: true,

        // mark attributes
        shape: 'circle',
        radius: 5,

        // dimensions
        width: null, // defined in ./layout
        height: null, // defined in ./layout
        margin: { top: 69, right: 10, bottom: 10, left: 90 },
    };
}
