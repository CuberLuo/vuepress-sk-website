<template>
  <div id="comment-box">
    <el-input
      v-model="nickname"
      maxlength="8"
      placeholder="昵称(不超过8个字符)"
      :prefix-icon="Avatar"
    />
    <el-input
      ref="textareaRef"
      id="comment-textarea"
      v-model="textarea"
      maxlength="400"
      rows="8"
      placeholder="畅所欲言来评论吧!"
      type="textarea"
    />

    <div id="bottom-box">
      <Emoji @clickedEmoji="addEmojiToTextarea" />
      <el-button
        id="submit-button"
        type="primary"
        :loading="submitLoading"
        @click="submitComment"
        >提交留言</el-button
      >
    </div>
  </div>
  <div id="comments-area">
    <div id="comments-total">
      <span>
        {{ comments_total }}
      </span>
      留言
    </div>
    <el-card class="box-card" v-for="comment in comments_arr" :key="comment.id">
      <div class="user-info-box">
        <div class="user-info nickname">
          <el-tag>
            {{ comment.nickname }}
          </el-tag>
        </div>
        <div class="user-info post-time">{{ comment.commentDate }}</div>
      </div>

      <el-divider />
      <div class="comment-content">
        {{ comment.commentContent }}
      </div>
    </el-card>
    <div
      id="comment-loading-box"
      v-loading="commentsLoading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    ></div>
    <div id="end-tag" v-show="isGetAll">- THE END -</div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { Avatar } from '@element-plus/icons-vue'
import axios from 'axios'
import dayjs from 'dayjs'
import Emoji from './Emoji.vue'

const baseURL = 'http://localhost:88'
// const baseURL = 'http://1.15.134.164:88'
const textarea = ref('')
const nickname = ref('')
const comments_arr = ref([])
const comments_total = ref(0)
const submitLoading = ref(false)
const commentsLoading = ref(false)
const textareaRef = ref()
const reachBottom = ref(false)
const page = ref(1)
const pageSize = 5
const isGetAll = ref(false)
const ip = ref('')
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const recordIp = () => {
  axios.get('https://forge.speedtest.cn/api/location/info').then((res) => {
    ip.value = res.data.ip
  })
}
const submitComment = () => {
  if (nickname.value.trim() === '') {
    ElMessage.error('昵称不能为空!')
  } else if (textarea.value.trim() === '') {
    ElMessage.error('留言不能为空!')
  } else {
    submitLoading.value = true
    const info = {
      nickname: nickname.value,
      commentContent: textarea.value,
      commentDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ip: ip.value
    }
    setComment(info)
  }
}
const setComment = (info) => {
  axios
    .post(baseURL + '/setComment', info)
    .then((res) => {
      switch (res.data.code) {
        case 10000: {
          ElMessage.success(res.data.message)
          nickname.value = ''
          textarea.value = ''
          comments_total.value++
          comments_arr.value.unshift(res.data.data)
          break
        }
        case 10010: {
          ElMessage.error(res.data.message)
          break
        }
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('提交失败!')
    })
    .finally(() => {
      submitLoading.value = false
    })
}
const getTotalCount = () => {
  axios
    .get(baseURL + '/getTotalCount')
    .then((res) => {
      comments_total.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const getPageSizeComments = () => {
  commentsLoading.value = true
  axios
    .get(baseURL + '/getPageSizeComments?current=' + page.value)
    .then((res) => {
      let record_cnt = res.data.data.length

      if (record_cnt < pageSize) {
        isGetAll.value = true
      }
      // 数组逆序保证最新评论位于第一个
      comments_arr.value.push(...res.data.data)
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('评论拉取失败')
    })
    .finally(() => {
      commentsLoading.value = false
    })
}
const addEmojiToTextarea = (emoji) => {
  textarea.value += emoji
}
const lazyLoading = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop //滚动条高度
  const clientHeight = document.documentElement.clientHeight //屏幕可视区域高度
  const scrollHeight = document.documentElement.scrollHeight //浏览器所有内容高度
  // console.log(
  //   'scrollTop:' +
  //     scrollTop +
  //     ' clientHeight:' +
  //     clientHeight +
  //     ' scrollHeight:' +
  //     scrollHeight
  // )

  //触底
  if (scrollTop + clientHeight + 1 >= scrollHeight && !reachBottom.value) {
    reachBottom.value = true
    // ElMessage.warning('触底啦!!!')
    if (isGetAll.value === false) {
      page.value++
      // //记住滚动到底的时候，当前页需要加1
      getPageSizeComments()
    }
  }
  //离开底部
  if (scrollTop + clientHeight + 1 < scrollHeight && reachBottom.value) {
    reachBottom.value = false
  }
}
onMounted(() => {
  getTotalCount()
  getPageSizeComments()
  recordIp()
  window.addEventListener('scroll', lazyLoading)
})
</script>

<style scoped>
#bottom-box {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
#comments-area {
  margin-top: 20px;
}
.user-info-box {
  position: relative;
  height: 10px;
}
.user-info {
  position: absolute;
  font-size: 0.8rem;
}
.nickname {
  left: 0;
}
.post-time {
  right: 0;
}

.comment-content {
  font-size: 14px;
  word-wrap: break-word;
  overflow: hidden;
}
.box-card {
  margin-top: 15px;
}
#comment-box {
  margin-top: 10px;
}
#comments-total {
  font-size: 20px;
  font-weight: 600;
}
#end-tag {
  display: flex;
  justify-content: center;
  color: #999999;
  margin-top: 12px;
}
#comment-loading-box {
  margin-top: 30px;
}
</style>
<style>
.el-divider--horizontal {
  margin: 14px 0;
}
#comment-textarea {
  resize: none;
  margin-top: 12px;
}
</style>
