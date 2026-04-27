import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faUser, 
  faHome, 
  faCircleLeft, 
  faCircleRight 
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add ALL icons you use
library.add(faUser, faHome, faCircleLeft, faCircleRight)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount("#app")