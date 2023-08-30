import './assets/style.scss'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fa0, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, faDivide, faEquals, faMinus, faPercent, faPlus, faUserSecret, faXmark } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faDivide, faXmark
    , faMinus, faPlus, faEquals, faPercent
    , fa0, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9
)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
