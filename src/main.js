import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button, Cell, CellGroup,
  Col,
  Field,
  Icon,
  Lazyload,
  List,
  NavBar,
  PullRefresh,
  Row,
  Stepper,
  Swipe,
  SwipeItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs
} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)
  .use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh)
  .use(Stepper).use(Tabbar).use(TabbarItem).use(Icon).use(Cell).use(CellGroup);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
