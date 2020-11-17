export default function getDimensions(main) {
    this.settings.width =
        (this.settings.width || main.node().clientWidth) -
        this.settings.margin.left -
        this.settings.margin.right;
    this.settings.height =
        (this.settings.height || (main.node().clientHeight * 2) / 3) -
        this.settings.margin.top -
        this.settings.margin.bottom;
}
