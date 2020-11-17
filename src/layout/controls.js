import play from './controls/play';
import step from './controls/step';
import outcome from './controls/outcome';

export default function controls(main) {
    const controls = this.util.addElement('controls', main);

    this.controls = {
        play: play.call(this, controls),
        step: step.call(this, controls),
        outcome: outcome.call(this, controls),
    };

    return controls;
}
