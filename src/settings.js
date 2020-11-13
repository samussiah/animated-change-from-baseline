export default function settings() {
    return {
        // variable mappings
        id_var: 'USUBJID',
        stratum_var: 'ARM',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG',
        percent_change_var: 'PCHG',

        // timepoint
        timepoint: 0,
        speed: 5000,
        play: true,

        // mark attributes
        shape: 'circle',
        radius: 10,

        // dimensions
        width: null, // defined in ./layout
        height: null, // defined in ./layout
        margin: { top: 69, right: 10, bottom: 10, left: 90 },
    };
}
