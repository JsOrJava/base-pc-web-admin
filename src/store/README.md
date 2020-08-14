# store

**store** 目录内放置系统全局变量。

系统模块对应的变量，以 `.js` 文件形式区分，例如：

- modules/user.js
- modules/system.js
- modules/points.js

## store定义

仓库定义时，以大驼峰命名方式指定 **仓库名称**，并根据模块进行合理的仓库划分，例如：

```javascript
// modules/about.js

export default {
    namespaced: true,

    state: {
        token: ''
    },

    mutations: {
        getToken: (state, token) => { // mutations 方法名称驼峰形式
            state.token = token;
        }
    },

    actions: {
        SET_TOKEN: ({ commit }, token) => { // actions命名大写加_(下划线)
            commit('getToken', token);
        }
    }
};
```

我们在 `modules/user.js` 中定义 `user` 模块的仓库，然后在 `index.js` 中进行统一配置。

```javascript
// routers/index.js

// 导入 user 模块仓库
import userModule from './modules/user';

const store = new Vuex.Store({
    modules: [
        userModule
    ],
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [vuexLocal.plugin]
})

export default store

```

## 模块仓库

页面中的仓库获取以 如下 的形式进行：

```javascript
  import { mapGetters, mapActions } from 'vuex'
  
  computed: {
    ...mapGetters('...模块名称',[
      'userId'
    ]),
  },

  methods: {
    ...mapActions('...模块名称', {
      setUserId: 'setUserId'
    }),
  }

  -- 或者你可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。
  -- 它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapActions } = createNamespacedHelpers('some/nested/module（列如user）')

    computed: {
        ...mapGetters([
        'userId'
        ]),
    },

   methods: {
     ...mapActions({
       setUserId: 'setUserId'
     }),
   }

```

