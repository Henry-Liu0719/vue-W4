const loginToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1",
);
axios.defaults.headers.common['Authorization'] = loginToken;

const baseURL = "https://ec-course-api.hexschool.io";

function logout(){
  axios
  .post(`${baseURL}/v2/logout`, {})
  .then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error.response.data);
  })
}

  const { createApp } = Vue

  import pagination from './Pagination.js'
  import productModal from './ProductModal.js'
  import delProductModal from './delProductModal.js'
  
  const app = createApp({
    data() {
      return {
        products: [],
        temp:{},
        productModal:null,
        delProductModal:null,
        pagination:{},

      }
    },
    components:{
      pagination,productModal,delProductModal
    },
        methods: {
          deleteProduct(){
            axios
              .delete(`${baseURL}/v2/api/gobobofu/admin/product/${this.temp.id}`)
              .then((res) => {
                console.log(res);
                // alert('刪除成功');
                // window.location = './product.html';
                // this.products = res.data.products;
                this.getProducts();
                // this.delProductModal.hide();
                this.$refs.dModal.closeModal();
              }).catch((error) => {
                console.dir(error);
                alert(error.response);
              })
          },
          getProducts(page = 1){
              axios
              .get(`${baseURL}/v2/api/gobobofu/admin/products?page=${page}`, {})
              .then((res) => {
                console.log(res.data);
                this.products = res.data.products;
                this.pagination = res.data.pagination;
              }).catch((error) => {
                console.log(error.response);
                alert(error.response);
            })
          },
          updateProduct(){
            if(this.temp.isNew){

              axios
              .post(`${baseURL}/v2/api/gobobofu/admin/product`, {'data':this.temp})
              .then((res) => {
                console.log(res);
                // this.products = res.data.products;
                this.getProducts();
                // this.productModal.hide();
                this.$refs.pModal.closeModal();
                // alert('修改成功');
                // window.location = './product.html';
              }).catch((error) => {
                console.dir(error);
              })
            }else{
              axios
              .put(`${baseURL}/v2/api/gobobofu/admin/product/${this.temp.id}`, {'data':this.temp})
              .then((res) => {
                console.log(res);
                this.getProducts();
                // this.productModal.hide();
                this.$refs.pModal.closeModal();
                // this.products = res.data.products;
                // alert('新增成功');
                // window.location = './product.html';
              }).catch((error) => {
                console.dir(error);
              })
            }
          },
          uploadPhoto(){
            console.log('uploadPhoto');
            const formData = new FormData();
            formData.append('file-to-upload', document.getElementById('fileInput').files[0]);
            console.log(formData);
            axios
              .post(`${baseURL}/v2/api/gobobofu/admin/upload`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }})
              .then((res) => {
                console.log(res.data.imageUrl);
                if(this.temp.imagesUrl[this.temp.imagesUrl.length-1]==''){
                  this.temp.imagesUrl[this.temp.imagesUrl.length-1]=res.data.imageUrl
                }else{
                  this.temp.imagesUrl.push(res.data.imageUrl)
                }
                // this.products = res.data.products;
                // this.getProducts();
                // this.productModal.hide();
                // this.$refs.pModal.closeModal();
                // alert('修改成功');
                // window.location = './product.html';
              }).catch((error) => {
                console.dir(error);
              })
          },
          openModal(status,product){
            if(status == 'new'){
              this.temp = {
                imagesUrl : [],
                isNew : true
              }
              this.temp = {
                isNew : true,
                category: "甜甜圈",
                content: "尺寸：14x14cm",
                description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
                is_enabled: 1,
                origin_price: 150,
                price: 99,
                title: "草莓莓果夾心圈",
                unit: "個",
                num: 10,
                imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                imagesUrl: [
                  "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
                  "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                ]
              }

              // this.productModal.show();
              this.$refs.pModal.openModal();
            }else if(status == 'edit'){
              this.temp = {...product}
              if(!Array.isArray(this.temp.imagesUrl)){
                this.temp.imagesUrl = [];
              }
              // this.productModal.show();
              this.$refs.pModal.openModal();
            }else if(status == 'delete'){
              this.temp = {...product}
              // this.delProductModal.show();
              this.$refs.dModal.openModal();
            }
          }
          
        },
		mounted(){
      // console.log(this.$refs);
      axios
      .post(`${baseURL}/v2/api/user/check`, {})
      .then((res) => {
        // console.log(res);
        this.getProducts();
      }).catch((error) => {
        console.dir(error);
        alert(error.data.message);
        window.location = "./index.html"
      })
      //build modal
      // console.log(this.$refs);
      // this.productModal = new bootstrap.Modal(this.$refs.productModal);
      // this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);

    }
  });
	app.mount('#app');


// 產品資料格式

products: [ 
  {
    category: "甜甜圈",
    content: "尺寸：14x14cm",
    description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
    id: "-L9tH8jxVb2Ka_DYPwng",
    is_enabled: 1,
    origin_price: 150,
    price: 99,
    title: "草莓莓果夾心圈",
    unit: "個",
    num: 10,
    imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    imagesUrl: [
      "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
      "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
    ]
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
    id: "-McJ-VvcwfN1_Ye_NtVA",
    is_enabled: 1,
    origin_price: 1000,
    price: 900,
    title: "蜂蜜檸檬蛋糕",
    unit: "個",
    num: 1,
    imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
    imagesUrl: [
      "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    ]
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
    id: "-McJ-VyqaFlLzUMmpPpm",
    is_enabled: 1,
    origin_price: 700,
    price: 600,
    title: "暗黑千層",
    unit: "個",
    num: 15,
    imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    imagesUrl: [
      "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
    ]
  }
]