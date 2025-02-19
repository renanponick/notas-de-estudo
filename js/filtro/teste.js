const COUNTRIES = [
    {
        label: 'Brasil',
        value: 'BRA',
        children: [
            {
                label: 'Rio Grande do Sul',
                value: 'RS',
                firstChild: true,
                children: [
                    {
                        label: 'Bento Gonçalves',
                        value: 'BG',
                        children: [{ label: 'Vale dos Vinhedos', value: 'VV' }]
                    }
                ]
            },
            { label: 'Santa Catarina', value: 'SC' }
        ]
    },
    {
        label: 'Estados Unidos',
        value: 'EUA',
        children: [
            {
                label: 'New York',
                value: 'NY',
                children: [{ label: 'Manhattan', value: 'MA' }]
            },
            { label: 'Texas', value: 'TE' }
        ]
    },
    { label: 'Itália', value: 'ITA' },
    { label: 'Espanha', value: 'ESP' }
]
// If I send Y, needs to return this info
// [ { label: 'Estados Unidos', children: [ { label: 'New York', children: [ { label: 'Manhattan' } ] } ] } ]
function teste(value) {
    const result = COUNTRIES.filter(country => {
        if (country.value === value) {
            return country;
        }
        if (country.children) {
            const children = country.children.filter(child => {
                if (child.value === value) {
                    return child;
                }
                if (child.children) {
                    const grandChildren = child.children.filter(grandChild => {
                        if (grandChild.value === value) {
                            return grandChild;
                        }
                    });
                    return grandChildren;
                }
            });
            return children;
        }
    });
    console.log(JSON.stringify(result));
}

teste('Y');