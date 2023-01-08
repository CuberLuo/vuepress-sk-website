import { defaultTheme } from 'vuepress'
module.exports = {
  // 网站的一些基本配置
  lang: 'zh-CN',
  title: '图片加密器', // 网站的标题
  description: '强大的图片加密工具', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 需要被注入到当前页面的 HTML <head> 中的标签
    [
      'meta',
      {
        name: 'referrer',
        content: 'no-referrer'
      }
    ]
  ],
  theme: defaultTheme({
    logo: '/logo.jpg',
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '捐赠',
        link: '/donate'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/CuberLuo/vuepress-sk-website',
        target: '_blank'
      },
      {
        text: '加入我们',
        link: 'https://jq.qq.com/?_wv=1027&k=qsA1h474',
        target: '_blank'
      }
    ]
  })
}
