import{d as c,a as r,A as o}from"./index-020ac884.js";const d=c("cartStore",{state:()=>({cartList:[],Loading:!1,isShow:!1}),getters:{isLoading:({Loading:t})=>t,carts:({cartList:t})=>t,is_show:({isShow:t})=>t},actions:{async getCartList(){try{this.Loading=!0;const t=`/api/${r}/cart`,a=await o.get(t);console.log(a),this.cartList=a.data.data.carts,this.Loading=!1}catch(t){this.Loading=!1,console.dir(t),alert("error!")}},async updateCart(t,a=null){var e;try{this.Loading=!0;let s=`/api/${r}/cart`,i="post";a&&(s=`/api/${r}/cart/${a}`,i="put");const n=await o[i](s,{data:t});return await this.getCartList(),this.Loading=!1,n}catch(s){if(console.dir(s),this.Loading=!1,(e=s==null?void 0:s.response)!=null&&e.data){let i="";for(const n of s.response.data.message)i+=n+`
`;alert(i)}}finally{this.showAlert()}},async delOneCart(t){try{this.Loading=!0;const a=`/api/${r}/cart/${t}`,e=await o.delete(a);return this.Loading=!1,await this.getCartList(),e}catch(a){this.Loading=!1,console.dir(a),alert("error!")}},async delAllCart(){try{this.Loading=!0;const t=`/api/${r}/carts`,a=await o.delete(t);return this.Loading=!1,await this.getCartList(),a}catch(t){this.Loading=!1,console.dir(t),alert("error!")}},async addOrder(t){try{this.Loading=!0;const a=`/api/${r}/order`,e=await o.post(a,{data:t});return this.Loading=!1,this.getCartList(),e}catch(a){this.Loading=!1,console.dir(a),alert(a.response.data.message)}},showAlert(){this.isShow=!0,setTimeout(()=>this.isShow=!1,1e3)}}});export{d as C};
