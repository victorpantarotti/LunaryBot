const k = {
    "pt-BR": {
        ms: 'milissegundo',
        mss: 'milissegundos',
        s: 'segundo',
        ss: 'segundos',
        m: 'minuto',
        mm: 'minutos',
        h: 'hora',
        hh: 'horas',
        d: 'dia',
        dd: 'dias',
        w: 'semana',
        ww: 'semanas',
        M: 'mês',
        MM: 'meses',
        y: 'ano',
        yy: 'anos',
        and: 'e'
    },
    "en-US": {
        ms: 'millisecond',
        mss: 'milliseconds',
        s: 'seconds',
        ss: 'second',
        m: 'minute',
        mm: 'minutes',
        h: 'hour',
        hh: 'hours',
        d: 'day',
        dd: 'days',
        w: 'week',
        ww: 'weeks',
        M: 'month',
        MM: 'months',
        y: 'year',
        yy: 'years',
        and: 'and'
    }
}

function parseMs(milliseconds) {
	if (typeof milliseconds !== 'number') {
		throw new TypeError('Expected a number');
	}

	return {
        days: Math.trunc(milliseconds/ 86400000),
		hours: Math.trunc(milliseconds / 3600000) % 24,
		minutes: Math.trunc(milliseconds / 60000) % 60,
		seconds: Math.trunc(milliseconds / 1000) % 60,
		milliseconds: Math.trunc(milliseconds) % 1000
	}
}

function format(ms, lang = "pt-BR") {
    const {days, hours, minutes, seconds, milliseconds} = parseMs(ms)

    let m = []
    if(days) m.push(`${days} ${k[lang]["d" + `${days != 1 ? "d" : ""}`]}`)
    if(hours) m.push(`${hours} ${k[lang]["h" + `${hours != 1 ? "h" : ""}`]}`)
    if(minutes) m.push(`${minutes} ${k[lang]["m" + `${minutes != 1 ? "m" : ""}`]}`)
    if(seconds) m.push(`${seconds} ${k[lang]["s" + `${seconds != 1 ? "s" : ""}`]}`)

    let tempo = ""
    for(let i in m) {
        if(i == 0 || m.length == 1) tempo = m[i]
        else if(Number(i) + 1 == m.length) tempo += ` ${k[lang]["and"]} ${m[i]}`
        else tempo += `, ${m[i]}`
    }

    return tempo
}

module.exports = {
    parseMs: parseMs,
    format: format
}