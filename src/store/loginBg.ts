import { defineStore } from "pinia";

export const useBackgroundStore =  defineStore('background',{
    state:()=>({
        backgroundImg:[
            {
                url:require('@/assets/login-bg/小八_春.jpg'),
                active:true,
                name:'春'
            },
            {
                url:require('@/assets/login-bg/小八_夏.jpg'),
                active:false,
                name:'夏'
            },
            {
                url:require('@/assets/login-bg/小八_秋.jpg'),
                active:false,
                name:'秋'
            },
            {
                url:require('@/assets/login-bg/小八_森林.jpg'),
                active:false,
                name:'森林'
            },
            {
                url:require('@/assets/login-bg/小八_夜晚.jpg'),
                active:false,
                name:'夜晚'
            },
        ]
    }),
    // actions:{
    //     changeActive(index:number){
    //         this.backgroundImg.forEach(item => item.active = false);
    //         this.backgroundImg[index].active = true;
    //     }
    // },
    // getters:{
    //     getActiveImg(state){
    //         return state.backgroundImg.filter(item => item.active == true)[0]
    //     }
    // },
    // persist: {
    //     storage: localStorage,
    //     paths:['backgroundImg']
    // }
    actions: {
        changeActive(index: number) {
            this.backgroundImg.forEach(item => item.active = false);
            this.backgroundImg[index].active = true;
        },
        clearLocalStorage() {
            localStorage.removeItem('background-backgroundImg');
        },
        async initializeImages() {
            this.clearLocalStorage();
            this.backgroundImg = await Promise.all(this.backgroundImg.map(async (item) => {
                const url = await import(item.url as any);
                return { ...item, url: url.default };
            }));
        }
    },
    getters: {
        getActiveImg(state) {
            return state.backgroundImg.filter(item => item.active === true)[0];
        }
    },
    persist: {
        storage: localStorage,
        paths: ['backgroundImg']
    }
})