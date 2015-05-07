$(document).ready(function () {

    var DishView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($("#dishTemplate").html()),
        events: {
            "click button.deleteButton": "deleteDish",
            "click button.editButton": "editDish",
            "click button.updateButton": "updateDish"
        },

        updateDish: function () {
            var newName = this.$("#newName" + this.model.id).val();
            var newPrice = this.$("#newPrice" + this.model.id).val();
            var newImg = this.$("#newImg" + this.model.id).val();


            this.model.set({
                name: newName,
                price: newPrice,
                image: newImg
            });

            this.model.save();
        },

        editDish: function () {
            this.$("span.dish").hide();
            this.$("span.editForm").show();
        },

        deleteDish: function () {
            this.model.destroy();
        },

        render: function () {
            this.$el.html(this.template({
                dish: this.model.toJSON()
            }));
            
            return this;
        }
    });


    var DishesView = Backbone.View.extend({
        el: "#dishList",
        initialize: function () {
            this.listenTo(this.collection, "sync remove", this.render);
        },

        //reference 
        render: function () {
            var dishes = this.$el;
            dishes.html("");
            this.collection.each(function (dish) {
                dishes.append(new DishView({
                    model: dish
                }).render().$el);
            });

            return this;
        }
    });


    var CreateDishView = Backbone.View.extend({
        el: "#addDishForm",
        events: {
            "click button#addNewDish": "createDish"
        },


        createDish: function () {

            var nameField = this.$("#newDishName");
            var priceField = this.$("#newDishPrice");
            var imageField = this.$("#newDishImg");


            var name = nameField.val();
            var price = priceField.val();
            var image = imageField.val();

            this.collection.create({
                name: name,
                price: price,
                image: image
            });

            nameField.val("");
            priceField.val("");
            imageField.val("");
        }
    });

    new DishesView({
        collection: dishes
    });
    new CreateDishView({
        collection: dishes
    });
});