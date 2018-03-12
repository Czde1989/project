import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '@/components/articleList/ListComponent'
import PostArticle from '@/components/addArticle/addComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ArticleList
    },
    {
      path: '/post',
      component: PostArticle
    }
  ]
})
