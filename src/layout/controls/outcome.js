import xAxis from '../../init/xAxis';
import restartSimulation from '../../init/interval/simulation';
import updateDistribution from '../../init/interval/distribution';

export default function outcome(controls) {
    const main = this;
    const div = this.util.addElement('outcome', controls);
    const buttons = this.util
        .addElement(
            'button',
            div,
            'button',
            ['result', 'change', 'percent_change'].map((variable) => ({
                variable,
                label: this.settings.var_labels[variable],
            }))
        )
        .classed('acfb-active', (d) => d.variable === this.settings.outcome)
        .text((d) => d.label);

    buttons.on('click', function (event, d) {
        if (!this.classList.contains('acfb-active')) {
            buttons.classed('acfb-active', false);
            this.classList.toggle('acfb-active');
            main.settings.outcome = d.variable;
            main.scale.x = main.scale[main.settings.outcome];
            main.xAxis = xAxis.call(main);
            restartSimulation.call(main);
            updateDistribution.call(main);
        }
    });

    return {
        div,
        buttons,
    };
}
