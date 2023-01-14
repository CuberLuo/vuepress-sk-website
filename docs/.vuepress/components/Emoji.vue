<template>
  <el-popover
    id="emoji-popover"
    :width="320"
    placement="bottom"
    trigger="click"
  >
    <template #reference>
      <el-icon :size="25" id="emoji-icon">
        <EmojiIcon />
      </el-icon>
    </template>
    <template #default>
      <a
        href="javascript:void(0);"
        @click="getEmo(index)"
        v-for="(emoji, index) in emojiList"
        :key="index"
        class="emotionItem"
        >{{ emoji }}</a
      >
    </template>
  </el-popover>
</template>

<script setup>
import emojiList from './data/emoji.json'
import EmojiIcon from './icons/EmojiIcon.vue'
const emits = defineEmits(['clickedEmoji'])
const getEmo = (index) => {
  console.log(emojiList[index])
  // 向父组件Comment.vue传送表情
  emits('clickedEmoji', emojiList[index])
}
</script>

<style scoped>
.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
</style>
<style>
.el-popover {
  height: 200px;
  overflow: scroll;
  overflow-x: auto;
}
#emoji-icon {
  margin-right: 12px;
}
</style>
