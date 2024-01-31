document.querySelector(".loginBtn").addEventListener('click',(event)=>{
  // console.log(event.target);
  const data= {
    "username": $('#username')[0].value,
    "password": $('#password')[0].value
  };
  const baseURL = "https://ec-course-api.hexschool.io";
  // const path = "";
  axios
    .post(`${baseURL}/v2/admin/signin`, data)
      .then((res) => {
        // console.log(res.data);
        const {token,expired}=res.data;
        if (document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
          document.cookie = `loginToken=${token}; expires=${new Date(expired)}; path=/`;
        }
        window.location="./product.html";

      }).catch((error) => {
        console.log(error.response.data);
      })



//addEventListener
});
