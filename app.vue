<template>
  <div class="relative w-full mt-10 md:w-1/5 md:mx-auto">
    <input type="search" v-model="room"
      class="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="输入斗鱼房间号">
    <button type="submit" @click="playLive()"
      class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">播放</button>
  </div>

  <div class="mx-auto m-16 md:w-3/5">
    <div id="player" class="w-full"></div>
  </div>
</template>

<script setup lang="ts">
import Player, { Events } from 'xgplayer'
import FlvPlugin from 'xgplayer-flv'
import "xgplayer/dist/index.min.css"

const room = ref()
let player: Player = null!;
onMounted(() => {
  player = new Player({
    id: 'player',
    videoInit: false,
    playbackRate: false as unknown as number,
    autoplay: false,
    closeVideoClick: true,
    isLive: true,
    fluid: true,
    fitVideoSize: 'fixWidth',
    videoConfig: {
      isCorsOriginAllowed: true,
    },
    plugins: [FlvPlugin]
  })
  player.on(Events.DEFINITION_CHANGE, async (value) => {
    play(room.value, value.to.definition)
  })
})
const playLive = async () => {
  if (room.value == null) {
    alert("请输入房间号")
    return
  }
  const data = await play(room.value, 0)
  if (data != null) {
    player.emit('resourceReady', data.data.value?.definition)
  }
}

const play = async (room: string, rate: number) => {

  if (FlvPlugin.isSupported()) {
    const data = await useFetch(`/api/real`, { params: { room, rate } })
    if (data.data.value == null) {
      alert("未开播")
      return
    }
    player.playNext({
      url: data.data.value?.url,
      definition: {
        list: [] as Array<any>,
        defaultDefinition: 0
      },
      autoplay: true
    })
    return data
  } else { alert('浏览器不支持！') }
}

</script>

<style>
input{
  outline:none; 
}
.xgplayer .xg-options-list{
  width: auto !important;
  
}
.xgplayer .xg-options-list.active{
  display: flex !important;
  flex-direction: column;
}

.xgplayer .xg-options-list li {
  margin: 2px 4px;
}
.xgplayer .xg-options-list li span{
  white-space: nowrap !important;
}
</style>