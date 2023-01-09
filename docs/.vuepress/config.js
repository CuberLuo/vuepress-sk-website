import { defaultTheme } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

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
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
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
        text: '神秘页面',
        link: '/cxk'
      },
      {
        text: '留言板',
        link: '/message'
      },
      {
        text: '爱国必备网站',
        children: [
          {
            text: '共产党员网',
            link: 'https://www.12371.cn/',
            target: '_blank'
          },
          {
            text: '时代先锋网',
            link: 'http://www.zjsdxf.cn/',
            target: '_blank'
          },
          {
            text: '浙江组织工作网',
            link: 'http://www.zjzzgz.gov.cn/',
            target: '_blank'
          },
          {
            text: '学习强国',
            link: 'https://www.xuexi.cn/',
            target: '_blank'
          },
          {
            text: '党建网',
            link: 'http://www.dangjian.cn/',
            target: '_blank'
          },
          {
            text: '求是网',
            link: 'http://www.qstheory.cn/',
            target: '_blank'
          },
          {
            text: '法治网',
            link: 'http://www.legaldaily.com.cn/',
            target: '_blank'
          },
          {
            text: '中国政府网',
            link: 'http://www.gov.cn/',
            target: '_blank'
          }
        ]
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
