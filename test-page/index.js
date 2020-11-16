fetch('./data/adlb.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const instance = animatedChangeFromBaseline(
            data,
            '#container',
            {
                //stratum_var: 'RACE',
                //speed: 1000,
                //play: false,
            }
        );
    });
