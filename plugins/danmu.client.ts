
import Danmu from 'xgplayer/es/plugins/danmu'
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            danmu: Danmu
        }
    }
})