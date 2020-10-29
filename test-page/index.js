fetch('./data/adlb.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const measures = d3.group(data, d => d.PARAM);
        const measure = [...measures.keys()][Math.floor(Math.random() * measures.size)];
        const subset = measures.get(measure);
        const instance = animatedChangeFromBaseline(
            data,//subset,
            '#container',
            {
            }
        );
    });
