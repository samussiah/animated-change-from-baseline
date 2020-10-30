export default function timepoint() {
    const timepoint = this.set.visit[this.settings.timepoint];
    this.layout.timepoint.text(timepoint);

    return timepoint;
}
