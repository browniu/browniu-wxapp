const ghpages = require('gh-pages')

ghpages.publish('mdStatic', {
  branch: 'gh-pages',
  repo: 'https://github.com/browniu/browniu-wxapp.git'
}, () => console.log('发布完成'))
