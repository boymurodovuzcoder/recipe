"use strict";

Vue.component("LIST", {
    template: "<div class=\"container\">\n            <div class=\"row\">\n              <div class=\"col-md list\">\n                <div class=\"sec head exception\">A List of Recipes</div>\n                <ul>\n                   <li v-for=\"(recipe, index) in computedList\" :key=\"recipe.id\" :class=\"[{activeRecipe: selected === recipe}, {martop:true}]\" >\n                   \n                      <!-- Creates the bootstrap modal where the image will appear -->\n                      <div v-if=\"recipe.src\">\n                        <a href=\"#\" id=\"pop\" onclick=\"$(this).next().modal('show');\">\n                          <img id=\"imageresource\" :src=\"recipe.src\" :alt=\"recipe.name.length>10 ? recipe.name.substring(0,10) : recipe.name\">\n                      </a>\n\n                      <div class=\"modal fade\" id=\"imagemodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n                        <div class=\"modal-dialog\">\n                          <div class=\"modal-content\">\n                            <div class=\"modal-header\">\n                            <h4 class=\"modal-title\" id=\"myModalLabel\">{{recipe.name.length>16 ? recipe.name.substring(0,16) + \"..\" : recipe.name}}</h4>\n                              <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n                              \n                            </div>\n                            <div class=\"modal-body\">\n                              <img :src=\"recipe.src\" id=\"imagepreview\" style=\"width: 100%; height: 100%;\" :alt=\"recipe.name\" @click=\"showRecipe(recipe)\">\n                            </div>\n                            <div class=\"modal-footer\">\n                              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      </div>\n\n\n\n\n                       <div class=\"detail\"  @click=\"showRecipe(recipe)\">\n                           <div class=\"name\">\n                               {{recipe.name.length>14 ? recipe.name.substring(0,14) + \"..\" : recipe.name}} \n                           </div>\n                           <span class=\"timeAdd\">{{recipe.addedTime}}</span>\n                       </div>\n                       <!--<i class=\"fas fa-trash trash\" @click=\"removeElement(index)\"></i>-->\n                       <div class=\"btn-group dropleft\">\n                        <button type=\"button\" class=\"btn btn-secondary btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                            \n                        </button>\n                        <div class=\"dropdown-menu\">\n                            <a class=\"dropdown-item\" href=\"#\" @click=\"edit(index)\">Edit</a>\n                            <div class=\"dropdown-divider\"></div>\n                            <a class=\"dropdown-item\" href=\"#\" @click=\"removeElement(index)\">Delete</a>\n                        </div>\n                        </div>\n                       \n                   </li> \n                </ul>\n              </div>\n              <div class=\"col-md SelectedRecipe\">\n                <div class=\"sec head\">Selected Recipe</div>\n\n                    <div class=\"selected\" v-if=\"selected.id!=undefined\">\n\n                      <div class=\"containerImg\">\n                        <img :src=\"selected.src\" alt=\"Avatar\" class=\"image\">\n                        <div class=\"overlay\">{{selected.addedTime}}</div>\n                      </div>\n\n\n                        <div class=\"detail\">\n                            <div class=\"name\">\n                                {{selected.name}} \n                            </div>\n                            <span class=\"r\">\n                                Recipe:\n                            </span> <br>\n                            <span v-html=\"selected.recipe\">\n                            </span>\n                            \n                        </div>\n                    </div>\n                    </div>\n              </div>\n              <div v-if=\"this.$root.computedList == ''\" class=\"notFound\">No Recipe Found</div>\n            </div>\n            \n          </div>",
    computed: {
        recipeslist: function recipeslist() {
            return this.$root.recipeslist;
        },
        selected: function selected() {
            return this.$root.selected;
        },
        computedList: function computedList() {
            return this.$root.computedList;
        }
    },
    methods: {
        showRecipe: function showRecipe(recipe) {
            this.$root.showRecipe(recipe);
        },
        removeElement: function removeElement(index) {
            this.$root.removeElement(index);
        },
        edit: function edit(index) {
            this.$root.currentcomp = "EDITELEMENT";
            this.$root.editElementIndex = index;
        }
    }
});
Vue.component("ADD", {
    template: "\n  <div class=\"container\">\n  <form>\n    <div v-for=\"item in items\" class=\"sec\">\n    <div class=\"form-group\">\n    <div v-if=\"!item.image\">\n      <div class=\"headerFormText liitlerightpad\" style=\"margin-bottom: 0.5rem;\">Select an image for your new Recipe</div>\n      <input type=\"file\" @change=\"onFileChange(item, $event)\" class=\"btn btn-color form-control liitlerightpad\" >\n    </div>\n    <div v-else>\n      <img :src=\"item.image\" class=\"form-control imgh liitlerightpad\"/>\n      <button @click=\"removeImage(item)\" class=\"btn btn-color form-control\">Remove image</button>\n    </div>\n  </div>\n  \n  <div class=\"form-group\">\n    <div class=\"headerFormText liitlerightpad\">Enter name of Recipe:</div>\n    <input type=\"text\" @input=\"typing = false\" class=\"form-control liitlerightpad\" v-model=\"name\" id=\"formGroupExampleInput\" placeholder=\"Input name\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label class=\"headerFormText liitlerightpad\" for=\"exampleFormControlTextarea1\">Enter Detail of Recipe</label>\n    <textarea @input=\"typing = false\" class=\"form-control\" id=\"exampleFormControlTextarea1\" rows=\"10\" v-model=\"detailRecipe\" required placeholder=\"Enter Recipe\"></textarea>\n  </div>\n\n  <button type=\"button\" @click=\"Validation(item)\" style=\"color:black;\" class=\"btn btn-secondary btn-lg btn-block btn-color\">Add new Recipe</button>\n  <div v-if=\"!isActive\" class=\"alert alert-danger success\" role=\"alert\" style=\"margin-top: 1rem;\">\n    Name and Detail of Recipe are required\n  </div>\n  <div v-else-if=\"isActive === 'name'\" class=\"alert alert-danger success\" role=\"alert\" style=\"margin-top: 1rem;\">\n    Name is required\n  </div>\n  <div v-else-if=\"isActive === 'detailRecipe'\" class=\"alert alert-danger success\" role=\"alert\" style=\"margin-top: 1rem;\">\n    Detail of Recipe is required\n  </div>\n  <div v-show=\"typing\" v-else-if=\"isActive==true\" class=\"alert alert-success success\" role=\"alert\" style=\"margin-top: 1rem;\">\n  New Recipe Successfully Added!\n  </div>\n\n  </form>\n  </div>\n\n  </div>\n\n  \n  ",
    data: function data() {
        return {
            items: [{
                image: false
            }],
            typing: false,
            name: "",
            detailRecipe: "",
            isActive: "False",
            newRecipe: {
                src: "",
                name: "",
                addedTime: "",
                recipe: "",
                id: 0
            }
        };
    },
    methods: {
        onFileChange: function onFileChange(item, e) {
            this.typing = false;
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(item, files[0]);
        },
        createImage: function createImage(item, file) {
            var _this = this;

            var image = new Image();
            var reader = new FileReader();

            reader.onload = function(e) {
                item.image = e.target.result;
                _this.newRecipe.src = item.image;
            };

            reader.readAsDataURL(file);
        },
        removeImage: function removeImage(item) {
            item.image = false;
            this.newRecipe.src = "";
        },
        Validation: function Validation(item) {
            if (this.name == "" && this.detailRecipe == "") {
                this.isActive = false;
            } else if (this.name == "") {
                this.isActive = "name";
            } else if (this.detailRecipe == "") {
                this.isActive = "detailRecipe";
            } else {
                this.typing = true, this.isActive = true;
                this.newRecipe.name = this.name;
                this.newRecipe.recipe = this.detailRecipe;
                this.$root.nextid += 1;
                this.newRecipe.id = this.$root.nextid;
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

                var yyyy = today.getFullYear();
                today = 'Added on ' + mm + '-' + dd + '-' + yyyy;
                this.$root.nextid += 1;
                this.$root.recipeslist.unshift({
                    src: this.newRecipe.src,
                    name: this.newRecipe.name,
                    addedTime: today,
                    recipe: this.newRecipe.recipe,
                    id: this.$root.nextid
                });
                this.name = "";
                this.detailRecipe = "";
                item.image = false;
                this.newRecipe.src = "";
            }
        }
    }
});
Vue.component("searchcomp", {
    template: "\n  <input v-model=\"query\" @input=\"queryF\" class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search recipe\" aria-label=\"Search\">\n  ",
    data: function data() {
        return {
            query: ""
        };
    },
    methods: {
        queryF: function queryF() {
            this.$root.queryText = this.query;
        }
    }
});
Vue.component("EDITELEMENT", {
    template: "\n    <div class=\"container\">\n        <div v-for=\"item in items\" class=\"sec\">\n            <div class=\"form-group\">\n            <div v-if=\"!item.image\">\n            <div class=\"headerFormText liitlerightpad\" style=\"margin-bottom: 0.5rem;\">Upload New Image</div>\n            <input type=\"file\" @change=\"onFileChange(item, $event)\" class=\"btn btn-color form-control liitlerightpad\" >\n            </div>\n            <div v-else>\n            <img :src=\"item.image\" class=\"form-control imgh liitlerightpad\"/>\n            <button @click=\"removeImage(item)\" class=\"btn btn-color form-control\">Remove image</button>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"headerFormText liitlerightpad\">Enter name of Recipe:</div>\n            <input type=\"text\" @input=\"type($event)\" class=\"form-control liitlerightpad\" v-model=\"changingRecipe.name\" id=\"formGroupExampleInput\" placeholder=\"Input name\" required>\n        </div>\n        <div class=\"form-group\">\n            <label class=\"headerFormText liitlerightpad\" for=\"exampleFormControlTextarea1\">Enter Detail of Recipe</label>\n            <textarea @input=\"type($event)\" class=\"form-control\" id=\"exampleFormControlTextarea1\" rows=\"10\" v-model=\"changingRecipe.recipe\" required></textarea>\n        </div>\n        <button type=\"button\" @click=\"Validation()\" style=\"color:black;\" class=\"btn btn-secondary btn-lg btn-block btn-color\">Update Changes</button>\n        <div v-if=\"typing\" class=\"alert alert-success success\" role=\"alert\" style=\"margin-top: 1rem;\">\n            Changes Updated Successfully!\n        </div>\n    </div>\n    ",
    data: function data() {
        return {
            typing: false,
            src: false,
            changed: false,
            changedName: false,
            changedRecipe: false,
            name: "",
            recipe: "",
            items: [{
                image: false
            }]
        };
    },
    computed: {
        changingRecipe: function changingRecipe() {
            return {
                name: this.$root.recipeslist[this.$root.editElementIndex].name,
                recipe: this.$root.recipeslist[this.$root.editElementIndex].recipe
            };
        }
    },
    methods: {
        onFileChange: function onFileChange(item, e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(item, files[0]);
        },
        type: function type(e) {
            if (e.target.tagName == "INPUT") {
                this.name = e.target.value;
                this.changedName = true;
            } else {
                this.recipe = e.target.value;
                this.changedRecipe = true;
            }

            this.typing = false;
        },
        createImage: function createImage(item, file) {
            var _this2 = this;

            var image = new Image();
            var reader = new FileReader();

            reader.onload = function(e) {
                item.image = e.target.result;
                _this2.src = item.image;
                _this2.typing = false;
                _this2.changed = true;
            };

            reader.readAsDataURL(file);
        },
        removeImage: function removeImage(item) {
            this.src = "";
            item.image = false;
            this.typing = false;
            this.changed = true;
        },
        Validation: function Validation() {
            this.typing = true;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

            var yyyy = today.getFullYear();
            today = mm + '-' + dd + '-' + yyyy;
            today = 'Updated on ' + today.replace(/\b0/g, '');

            if (this.changed) {
                this.$root.recipeslist[this.$root.editElementIndex].src = this.src;
            }

            if (this.changedName) {
                this.$root.recipeslist[this.$root.editElementIndex].name = this.name;
            }

            if (this.changedRecipe) {
                this.$root.recipeslist[this.$root.editElementIndex].recipe = this.recipe;
            }

            this.$root.recipeslist[this.$root.editElementIndex].addedTime = today;
            this.changed = false;
            this.changedName = false;
            this.changedRecipe = false;
            this.items.image = false;
            console.log(this.items);
        }
    }
});
var app = new Vue({
    el: "#app",
    data: {
        recipeslist: [{
            src: "food/cake.jpg",
            name: "Cake",
            addedTime: "Added on 8-18-2020",
            recipe: "Directions. Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x9 inch pan or line a muffin pan with paper liners. In a medium bowl, cream together the sugar and butter. Beat in the eggs, one at a time, then stir in the vanilla. Bake for 30 to 40 minutes in the preheated oven.",
            id: 1
        }, {
            src: "food/Pie.jpg",
            name: "Pie",
            addedTime: "Added on 8-18-2020",
            recipe: "Apple Crumble Make Apple Pie, adding 1 extra tablespoon flour to the filling. Off the heat, add 1/2 cup sour cream and 1/2 teaspoon nutmeg. Omit the top crust. Mix 1/2 cup flour, 1 cup oats, 3/4 cup each chopped walnuts and brown sugar, 6 tablespoons melted butter and a pinch of salt.",
            id: 2
        }, {
            src: "food/pizza.jpg",
            name: "Pizza",
            addedTime: "Added on 8-18-2020",
            recipe: "Ingredients. 1 1/2 cups (355 ml) warm water (105°F-115°F) 1 package (2 1/4 teaspoons) of active dry yeast. 3 3/4 cups (490 g) bread flour. 2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven) 2 teaspoons salt. 1 teaspoon sugar.",
            id: 3
        }],
        selected: {},
        currentcomp: "LIST",
        queryText: "",
        editElementIndex: 0
    },
    methods: {
        showRecipe: function showRecipe(recipe) {
            this.selected = recipe;
        },
        removeElement: function removeElement(index) {
            if (this.recipeslist[index].id == this.selected.id) {
                this.selected = {};
            }

            this.recipeslist.splice(index, 1);
        }
    },
    computed: {
        computedList: function computedList() {
            var vm = this;
            return this.recipeslist.filter(function(item) {
                return item.name.toLowerCase().indexOf(vm.queryText.toLowerCase()) !== -1 || item.recipe.toLowerCase().indexOf(vm.queryText.toLowerCase()) !== -1;
            });
        },
        nextid: function nextid() {
            return this.recipeslist.length + 1;
        }
    }
});