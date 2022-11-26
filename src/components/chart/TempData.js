// init chart test data
export let data_main = []
export let data_month = []
export let data_day = []

for (let idx = 1; idx <= 31; idx++) {

    let load_on = Math.ceil(Math.random() * 50);
    let load_off = Math.ceil(Math.random() * 20);
    let uti_rate = Math.floor(Math.random() * 50) + 40 + 1;
    let date = idx

    if (idx < 10) {
        date = `0${idx}`
    }

    data_main.push({
        'load_on': load_on,
        'load_off': load_off,
        'load_total': load_on + load_off,
        'uti_rate': uti_rate,
        'x_key': date,
    })
}


for (let idx = 1; idx <= 12; idx++) {

    let load_on = Math.ceil(Math.random() * 100);
    let load_off = Math.ceil(Math.random() * 40);
    let uti_rate = Math.floor(Math.random() * 50) + 40 + 1;
    let month = `${idx}月`

    data_month.push({
        'load_on': load_on,
        'load_off': load_off,
        'load_total': load_on + load_off,
        'uti_rate': uti_rate,
        'x_key': month,
    })
}