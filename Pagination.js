export default {
  props:['pagination','getProducts'],
  template:/*html*/`
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled:!pagination.has_pre}">
        <a
          class="page-link"
          href="#"
          @click="getProducts(pagination.current_page-1)"
          >Previous</a
        >
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page+'ofPages'"
        :class="{disabled:page == pagination.current_page}"
      >
        <a class="page-link" href="#" @click="getProducts(page)"
          >{{page}}</a
        >
      </li>
      <li class="page-item" :class="{disabled:!pagination.has_next}">
        <a
          class="page-link"
          href="#"
          @click="getProducts(pagination.current_page+1)"
          >Next</a
        >
      </li>
    </ul>
  </nav>  
  `,
}