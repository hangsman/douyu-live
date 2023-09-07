import { DouyuData } from "../types/douyu";

export const getDouyuHomJs = async (room: string | number) => {
    const data: any = await $fetch(`https://www.douyu.com/swf_api/homeH5Enc?rids=${room}`)
    if (data != null) {
        const json = JSON.parse(data)
        if (json.error === 0) {
            return json.data[`room${room}`];
        }
    }
    return null
}

export const getDouyuRoomInfo = async (room: string | number) => {
    const data: any = await $fetch(`https://www.douyu.com/wgapi/live/liveweb/getRoomLoopInfo?rid=${room}`)
    if (data != null && data.error == 0) {
        const isLoop = data.data.isShowLoopLogo === 1
        const isLive = data.data.rst === 0
        return { isLive, isLoop }
    }
    return { isLive: false, isLoop: false }
}

export const getDouyuRealUrl = async (room: number | string, sign: string, rate: string, cdn: string) => {
    const data: DouyuData = await $fetch(`https://playweb.douyu.com/lapi/live/getH5Play/${room}?${sign}&cdn=${cdn}&rate=${rate}&ver=Douyu_223090405&iar=0&ive=0&hevc=0&fa=0`, { method: "POST" })
    return data
}

export const getDouyuDid = async (time: number) => {
    // const data: any = await $fetch("https://passport.douyu.com/lapi/did/api/get?client_id=25&_=${time * 1000}", {
    //     headers: { "Referer": "https://m.douyu.com/" }
    // })
    //return data.data.did != null ? data.data.did : "10000000000000000000000000001501"
    return "10000000000000000000000000001501"
}