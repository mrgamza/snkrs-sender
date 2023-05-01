module.exports.utc = async function utc() {
    return new Promise(async resolve => {
        const date = new Date()
        const year = date.getUTCFullYear()
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
        const day = ('0' + date.getUTCDate()).slice(-2)

        const hours = ('0' + date.getUTCHours()).slice(-2)
        const minutes = ('0' + date.getUTCMinutes()).slice(-2)

        const dateString = year + '-' + month  + '-' + day;
        const timeString = hours + ':' + minutes  + ':00';
        const dateTime = dateString + " " + timeString

        resolve(dateTime)
    })
}

module.exports.kst = async function kst(curr) {
    return new Promise(async resolve => {
        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000)

        const KR_TIME_DIFF = 9 * 60 * 60 * 1000
        const date = new Date(utc + (KR_TIME_DIFF))

        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        const dateString = year + '-' + month  + '-' + day;
        const timeString = hours + ':' + minutes  + ':00';
        const dateTime = dateString + " " + timeString
        resolve(dateTime)
    })
}
