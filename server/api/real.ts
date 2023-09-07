
import { getDouyuDid, getDouyuRealUrl, getDouyuRoomInfo } from "~/server/utils/douyu"
import MD5 from "blueimp-md5"

const execute = eval
global['CryptoJS'] = { MD5: MD5 }

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const room = query.room?.toString()!
    const rate = query.rate?.toString()!
    
    const roomInfo = await getDouyuRoomInfo(room)
    if (!roomInfo.isLive && !roomInfo.isLoop) {
        return null
    }

    let time = parseInt((new Date().getTime() / 1000).toString())
    let did = await getDouyuDid(time);
    const douyuData = await getDouyuHomJs(room)
    if (douyuData != null) {
        execute(douyuData)
        const sign = ub98484234(parseInt(room), did, time)
        const data = await getDouyuRealUrl(room, sign, rate, '')

        return {
            url: data.data.rtmp_url + "/" + data.data.rtmp_live,
            definition: data.data.multirates.map(value => { return { text: { zh: value.name }, definition: value.rate } })
        }
    }


    return null
})

