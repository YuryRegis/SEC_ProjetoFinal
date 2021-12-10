
function getDateString() {
    const date = new Date()
    
    const Y = date.getFullYear()
    const M = date.getMonth()
    const D = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()

    return `${D}${M}${Y}${h}${m}${s}`
}

module.exports = getDateString