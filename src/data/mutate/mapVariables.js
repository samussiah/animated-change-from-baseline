export default function mapVariables() {
    this.data.forEach((d) => {
        for (const setting of Object.keys(this.settings).filter((key) => /_var$/.test(key))) {
            const variable = setting.replace(/_var$/, '');
            d[variable] = ['visit_order', 'result', 'change'].includes(variable)
                ? parseFloat(d[this.settings[setting]])
                : d[this.settings[setting]];
        }
    });
}
