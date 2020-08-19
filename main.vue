Vue.component("LIST", {
  
  template: 
  `<div class="container">
            <div class="row">
              <div class="col-md list">
                <div class="sec head exception">A List of Recipes</div>
                <ul>
                   <li v-for="(recipe, index) in computedList" :key="recipe.id" :class="[{active: selected === recipe}, {martop:true}]" >
                       




                      <!-- Creates the bootstrap modal where the image will appear -->
                      <a href="#" id="pop" onclick="$(this).next().modal('show');">
                          <img id="imageresource" :src="recipe.src" :alt="recipe.name">
                      </a>

                      <div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">{{recipe.name}}</h4>
                              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                              
                            </div>
                            <div class="modal-body">
                              <img :src="recipe.src" id="imagepreview" style="width: 100%; height: 100%;" :alt="recipe.name" @click="showRecipe(recipe)">
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>




                       <div class="detail"  @click="showRecipe(recipe)">
                           <div class="name">
                               {{recipe.name}} 
                           </div>
                           Added on {{recipe.addedTime}}
                       </div>
                       <i class="fas fa-trash trash" @click="removeElement(index)"></i>
                       
                   </li> 
                </ul>
              </div>
              <div class="col-md SelectedRecipe">
                <div class="sec head">Selected Recipe</div>

                    <div class="selected" v-if="selected.id!=undefined">
                        <img :src="selected.src">
                        <div class="detail">
                            <div class="name">
                                {{selected.name}} 
                            </div>
                            <span class="r">
                                Recipe:
                            </span> <br>
                            <span v-html="selected.recipe">
                            </span>
                            
                        </div>
                    </div>
                    </div>
              </div>
              <div v-if="this.$root.computedList == ''" class="notFound">No Recipe Found</div>
            </div>
            
          </div>`,
  computed: {
    recipeslist: function(){
      return this.$root.recipeslist;
    },
    selected: function(){
      return this.$root.selected;
    },
    computedList: function(){
      return this.$root.computedList;
    }
  },
  methods: {
    showRecipe(recipe) {
      this.$root.showRecipe(recipe);
    },
    removeElement(index) {
      this.$root.removeElement(index);
    }
  },
})

Vue.component("ADD", {
  template: `
  <div class="container">
  <form>
    <div v-for="item in items" class="sec">
    <div class="form-group">
    <div v-if="!item.image">
      <div class="headerFormText liitlerightpad" style="margin-bottom: 0.5rem;">Select an image for your new Recipe</div>
      <input type="file" @change="onFileChange(item, $event)" class="btn btn-color form-control liitlerightpad" >
    </div>
    <div v-else>
      <img :src="item.image" class="form-control imgh liitlerightpad"/>
      <button @click="removeImage(item)" class="btn btn-color form-control">Remove image</button>
    </div>
  </div>
  
  <div class="form-group">
    <div class="headerFormText liitlerightpad">Enter name of Recipe:</div>
    <input type="text" @input="typing = false" class="form-control liitlerightpad" v-model="name" id="formGroupExampleInput" placeholder="Input name" required>
  </div>

  <div class="form-group">
    <label class="headerFormText liitlerightpad" for="exampleFormControlTextarea1">Enter Detail of Recipe</label>
    <textarea @input="typing = false" class="form-control" id="exampleFormControlTextarea1" rows="10" v-model="detailRecipe" required></textarea>
  </div>

  <button type="button" @click="Validation(item)" style="color:black;" class="btn btn-secondary btn-lg btn-block btn-color">Add new Recipe</button>
  <p v-if="!isActive" class="warning">Name and Detail of Recipe are required</p>
  <p v-else-if="isActive === 'name'" class="warning">Name is required</p>
  <p v-else-if="isActive === 'detailRecipe'" class="warning">Detail of Recipe is required</p>  
  <div v-show="typing" v-else-if="isActive==true" class="alert alert-success alert-dismissible fade show success" role="alert" style="margin-top: 1rem;">
  <strong>New Recipe Successfully Added!</strong>
  </div>

  </form>
  </div>

  </div>

  
  `,
  data() {
    return {
      items: [
       {
         image: false,
       },
    ],
    typing: false,
    name: "",
    detailRecipe: "",
    isActive: "False",
    newRecipe: {
      src:"",
      name: "",
      addedTime: "",
      recipe: "",
      id: 0,
    }
    }
  },
  methods: {
    onFileChange(item, e) {
      this.typing = false
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(item, files[0]);
      
    },
    createImage(item, file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        item.image = e.target.result;
        this.newRecipe.src = item.image;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (item) {
      item.image = false; 
      this.newRecipe.src = "";
    },
    Validation: function(item) {
      if ((this.name == "") && (this.detailRecipe =="")) {
        this.isActive = false
      } else if (this.name == "") {
        this.isActive = "name"
      } else if (this.detailRecipe == ""){
        this.isActive = "detailRecipe"
      } else {
        this.typing = true,
        this.isActive = true
        this.newRecipe.name = this.name
        this.newRecipe.recipe = this.detailRecipe
        this.$root.nextid += 1
        this.newRecipe.id = this.$root.nextid 

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        
        
        this.$root.nextid += 1
        this.$root.recipeslist.unshift({
          src: this.newRecipe.src,
          name: this.newRecipe.name,
          addedTime: today,
          recipe: this.newRecipe.recipe,
          id: this.$root.nextid,
        })
        this.name = ""
        this.detailRecipe = ""
        item.image = false
        this.newRecipe.src = ""

      }
    }
  }
})

Vue.component("searchcomp", {
  template :
  `
  <input v-model="query" @input="queryF" class="form-control mr-sm-2 search" type="search" placeholder="Search recipe" aria-label="Search">
  `,
  data() {
    return {
      query: "",
    }
  },
  methods: {
    queryF: function() {
      this.$root.queryText = this.query
    }
  },
})


var app = new Vue({
  el: "#app",
  data: {
    recipeslist: [
    {
      src:"food/cake.jpg",
      name: "Cake",
      addedTime: "8-18-2020",
      recipe: "Directions. Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x9 inch pan or line a muffin pan with paper liners. In a medium bowl, cream together the sugar and butter. Beat in the eggs, one at a time, then stir in the vanilla. Bake for 30 to 40 minutes in the preheated oven.",
      id: 1,
    },
    {
      src:"food/Pie.jpg",
      name: "Pie",
      addedTime: "8-18-2020",
      recipe: "Apple Crumble Make Apple Pie, adding 1 extra tablespoon flour to the filling. Off the heat, add 1/2 cup sour cream and 1/2 teaspoon nutmeg. Omit the top crust. Mix 1/2 cup flour, 1 cup oats, 3/4 cup each chopped walnuts and brown sugar, 6 tablespoons melted butter and a pinch of salt.",
      id: 2,
    },
    {
      src:"food/pizza.jpg",
      name: "Pizza",
      addedTime: "8-18-2020",
      recipe: "Ingredients. 1 1/2 cups (355 ml) warm water (105°F-115°F) 1 package (2 1/4 teaspoons) of active dry yeast. 3 3/4 cups (490 g) bread flour. 2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven) 2 teaspoons salt. 1 teaspoon sugar.",
      id: 3,
    },
    ],
    selected: {},
    currentcomp: "LIST",
    nextid:3,
    queryText:"",
  },
  
  methods: {
    showRecipe(recipe) {
      this.selected = recipe;
      console.log(this.selected);
    },
    removeElement(index) {
      if (this.recipeslist[index].id == this.selected.id) {
        this.selected = {}
      }
      this.recipeslist.splice(index,1)
      console.log("remove " + index)
    }
  },
  computed: {
    computedList: function () {
      var vm = this
      return this.recipeslist.filter(function (item) {
        return ((item.name.toLowerCase().indexOf(vm.queryText.toLowerCase()) !== -1) || (item.recipe.toLowerCase().indexOf(vm.queryText.toLowerCase()) !== -1))
      })
    }
  },
  
})
