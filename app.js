const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-ayys:Test123@cluster0-tnngo.mongodb.net/todolistDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("item", itemsSchema);
const item1 = new Item({
  name: "Welcome to ur todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Items successfully added!");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        ListTitle: "Today",
        NewListItems: foundItems
      });
    }
  });
});

// Post accepts request body from list.ejs. Based on the value of 'req.body.list'
//the item is pushed to 'Workitems' or 'items' array.and is redirected accordingly.
app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName == "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res) {
      const checkedItemId = req.body.checkbox;
      const listName = req.body.listName;

      // console.log(checkedItemId);
      // console.log(listName);

      if (listName === "Today") {
        // Item.deleteOne({
        //   _id: req.body.checkbox
        // }
        Item.findByIdAndRemove(checkedItemId,function(err) {
          if (!err) {
            console.log("Successfully deleted checked item");
            res.redirect("/");
          }else{
            console.log(err);
          }
        });
      } else {
        List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItemId}}},function(err,foundList){
            if(!err){
              res.redirect("/"+listName);
            }
          })
        }
      });

    app.get("/:customListName", function(req, res) {

      //http://localhost:3000?customListName={customListName}
      const customListName = _.capitalize(req.params.customListName);

      //Look for name = customListName within List table
      List.findOne({
          name: customListName
        },
        //error , result
        function(err, foundList) {
          if (!err) { //if no error is found
            if (!foundList) { //if list is not found
              // create new list
              const list = new List({
                name: customListName,
                items: defaultItems
              });
              //insert the list
              list.save();
              //redirect back to /customListName
              res.redirect("/" + customListName);
            } else { //list is found
              //show existing ListTitle
              res.render("list", {
                ListTitle: foundList.name,
                NewListItems: foundList.items
              });
            }
          }
        });


    });


    let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }



    app.listen(port, function() {
      console.log("server running at 3000");
    });





    // app.post("/work",function(req,res){
    //   var workitem = req.body.newItem;
    //   workitems.push(workitem);
    //   res.redirect("/work");
    // })



    //switch (current_day) {
    //   case 0:
    //     day = "Sunday";
    //     break;
    //   case 1:
    //     day = "Monday";
    //     break;
    //   case 2:
    //     day = "Tuesday";
    //     break;
    //   case 3:
    //     day = "Wednesday";
    //     break;
    //   case 4:
    //     day = "Thursday";
    //     break;
    //   case 5:
    //     day = "Friday";
    //     break;
    //   case 6:
    //     day = "Saturday";
    //     break;
    //   default:
    //     console.log("Error: current day is equal to" + current_day);
    // }
