var Dish = Backbone.Model.extend({
    urlRoot: '/dishes',
    initialize: function () {
        console.log("A dish was added");
        this.on("change:name", function () {
            console.log("Change made");
        })
    }
});