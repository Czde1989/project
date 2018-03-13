import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '@/components/articleList/ListComponent'
import PostArticle from '@/components/addArticle/postArticle'
import AddCategory from '@/components/addArticle/AddCategory'
import ArticleDetail from '@/components/articleDetail/detailComponent'

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
    },
    {
      path: '/add_cate',
      component: AddCategory
    },
    {
      path: '/detail/:id',
      component: ArticleDetail
    }
  ]
})
