import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '@/components/articleList/ListComponent'
import PostArticle from '@/components/addArticle/postArticle'
import AddCategory from '@/components/addArticle/AddCategory'
import ArticleDetail from '@/components/articleDetail/detailComponent'
import Board from '@/components/board/boardComponent'
import Life from '@/components/life/lifeComponent'
import LifeDetail from '@/components/life/LifeDetail'
import Archives from '@/components/archives/Archives'

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
    },
    {
      path: '/board',
      component: Board
    },
    {
      path: '/life',
      component: Life
    },
    {
      path: '/life/:id',
      component: LifeDetail
    },
    {
      path: '/archives',
      component: Archives
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
    return { x: 0, y: 0 }
  }
})
