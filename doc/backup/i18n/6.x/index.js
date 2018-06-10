import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    'zh': require('./zh.json'),
    'en': require('./en.json')
  }
})

if (module.hot) {
  module.hot.accept(['./zh.json', './en.json'], () => {
    i18n.setLocaleMessage('zh', require('./zh.json'));
    i18n.setLocaleMessage('en', require('./en.json'));

    console.log('hot reload i18n', this, arguments)
  })
}

export default i18n
