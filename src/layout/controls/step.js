import { iterate } from '../../init/interval';

export default function step(controls) {
    const main = this;
    const div = this.util.addElement('step', controls);
    const buttons = this.util.addElement('button', div, 'button', ['<', '>']).text((d) => d);

    buttons.on('click', function () {
        main.settings.play = false;
        main.controls.play.button.text('play');
        if (main.interval) main.interval.stop();
        const direction = this.textContent;
        if (direction === '<')
            main.settings.timepoint =
                main.settings.timepoint === 0
                    ? main.set.visit.length - 2 // displays the last timepoint
                    : main.settings.timepoint - 2; // displays the previous timepoint
        iterate.call(main);
    });

    return {
        div,
        buttons,
    };
}
