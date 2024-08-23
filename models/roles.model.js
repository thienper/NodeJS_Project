const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug);

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permisstions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
const Role = mongoose.model("Roles", roleSchema, "roles");
module.exports = Role;