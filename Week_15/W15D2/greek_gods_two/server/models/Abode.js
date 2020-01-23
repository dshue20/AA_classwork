const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbodeSchema = new Schema({
  name: { type: String },
  coordinates: { type: String },
  gods: [
    {
      type: Schema.Types.ObjectId,
      ref: "god"
    }
  ]
});

module.exports = mongoose.model("abode", AbodeSchema);

// mongorestore --host Cluster0-shard-0/cluster0-shard-00-00-btmj3.mongodb.net:27017,cluster0-shard-00-01-btmj3.mongodb.net:27017,cluster0-shard-00-02-btmj3.mongodb.net:27017 --ssl --username admin --password "GMG5NbvwF$^4'AC#" --authenticationDatabase admin --db 'Greek Gods Two' .