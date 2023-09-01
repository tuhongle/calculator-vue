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
import { faDivide, faEquals, faMinus, faPercent, faPlus, faPlusMinus, faUserSecret, faXmark } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faDivide, faXmark, faPlusMinus
    , faMinus, faPlus, faEquals, faPercent
)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
