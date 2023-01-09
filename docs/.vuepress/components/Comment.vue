<template>
  <div id="vcomments"></div>
</template>

<script setup>
const appId = 'ZzdDdCuxSU1oTknt9lhFIwYA-gzGzoHsz'
const appKey = 'Jt4f5tkoVBNZ3sX2Gn7sggGO'
const createValine = async () => {
  if (typeof window === 'undefined') {
    return
  }
  const Valine = await (await import('valine')).default
  const valine = new Valine({
    el: '#vcomments',
    valine: 'unpkg.com/valine@latest/dist/Valine.min.js',
    appId: appId,
    appKey: appKey,
    recordIP: true,
    enableQQ: true,
    avatar: 'hide',
    requiredFields: ['nick'],
    placeholder: '来都来了，不留点啥吗'
  })
  console.log(valine)
}
createValine()
setTimeout(() => {
  try {
    const empty_text = document.getElementsByClassName('vempty')[0].innerText
    if (empty_text === '来发评论吧~') {
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}, 1000)
</script>

<style>
#vcomments {
  max-width: 740px;
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
