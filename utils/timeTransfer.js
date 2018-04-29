module.exports = (data, identity) => {
    let tmp = []
    if (identity == 2) {
        data.forEach(element => {
            let date = element.startTime.substr(6, 1) + '月'+element.startTime.substr(8, 2)+'日'
            let startTime = element.startTime.substr(11)
            let endTime = element.endTime.substr(11)
            tmp.push({
                date,
                startTime,
                endTime,
                teacherName: element.teacher,
                teacherPhone: element.ttel,
                id: element.id
            })
        })
    }
    else {
        data.forEach(element => {
            let date = element.startTime.substr(6, 1) + '月'+element.startTime.substr(8, 2)+'日'
            let startTime = element.startTime.substr(11)
            let endTime = element.endTime.substr(11)
            tmp.push({
                date,
                startTime,
                endTime,
                state:element.state,
                id: element.id,
                subscriber:element.subscriber
            })
        })
    }
    return {identity,subscribe:tmp}
}