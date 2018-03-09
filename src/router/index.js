import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '@/components/articleList/ListComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ArticleList
    }
  ]
})
