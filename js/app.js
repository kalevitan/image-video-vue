const apiURL = "https://my-json-server.typicode.com/kalevitan/demo/nodes";

function filterNodes() {
  const tagFilter = item =>
    (this.tagFilter == 'all') ||
    item.field_tags.split(", ").indexOf(this.tagFilter) > -1;

  const typeFilter = item =>
    (this.typeFilter == 'any') ||
    (item.type === this.typeFilter);

  const reducer = (accumulator, item) => {
    if (tagFilter(item) && typeFilter(item))
      accumulator.push(item);
    return accumulator;
  };

  const items = this.nodes.reduce(reducer, []);

  return new Array(Math.ceil(items.length / 4)).fill().map(_ => items.splice(0,4));
}

const ImageGallery = {
  template: "#images-videos",
  data: function() {
    return {
      nodes: [],
      typeFilter: 'any',
      tagFilter: 'all',
      loading: true,
    };
  },

  computed: {
    filterNodes
  },

  mounted: function() {
    console.log("it's mounted");
    this.getNodes();
  },

  methods: {
    getNodes: function() {
      console.log("getting nodes...");
      this.$http.jsonp(apiURL,{responseType: 'json'}).then(response => {
        console.log(response.body);
        this.loading = false;
        this.nodes = response.body;
      }, response => {
        // console.log(response.status);
      });
    },
    resetData: function() {
      this.$data.typeFilter = 'any',
      this.$data.tagFilter = 'all'
    }
  }
};

// const router = new VueRouter({
//   routes: [
//     { path: '/', component: ImageGallery }
//   ]
// });

// Vue.use(VueRouter);

new Vue({
  el: '#app',
  // router: router,
  components: {
    'image-gallery': ImageGallery
  }
});
