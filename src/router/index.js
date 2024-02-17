import VueRouter from 'vue-router'

import MainPage from '../pages/MainPage'
// import BillContainer from '../pages/BillContainer'
// import ProviderContainer from '../pages/ProviderContainer'
// import userContainer from '../pages/UserContainer'
// import PasswordContainer from '../pages/PasswordContainer'
// import PersonalContainer from '../pages/PersonalContainer'

const BillContainer = ()=>import('../pages/BillContainer')
const ProviderContainer = ()=>import('../pages/ProviderContainer')
const userContainer = ()=>import('../pages/UserContainer')
const PasswordContainer = ()=>import('../pages/PasswordContainer')
const PersonalContainer = ()=>import('../pages/PersonalContainer')

const router = new VueRouter({
    routes:[
        {
            path:'/bill',
            component:BillContainer
        },
        {
            path:'/provider',
            component:ProviderContainer
        },
        {
            path:'/user',
            component:userContainer
        },
        {
            path:'/password',
            component:PasswordContainer
        },
        {
            path:'/',
            component:MainPage
        },
        {
            path:'/personal',
            component:PersonalContainer
        }
    ]
})

export default router;