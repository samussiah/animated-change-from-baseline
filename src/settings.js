export default function settings() {
    return {
        // dimensions
        width: null,
        height: null,
        margin: { top: 30, right: 10, bottom: 10, left: 90 },

        // variable mappings
        id_var: 'USUBJID',
        stratum_var: 'ARM',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG',
    };
}
