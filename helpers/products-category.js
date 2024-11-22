const ProductCategory = require("../models/product-category.model")

module.exports.getSubCategory = async (ParentId) => {
    const getCategory = async (ParentId) => {
        const subs = await ProductCategory.find({
            parent_id: ParentId,
            status: "active",
            deleted: false,
        })
        // Tạo ra mảng mới allSub để chứa các phần tử con của subs
        let allSub = [...subs];

        for (const sub of subs) {
            const childs = await getCategory(sub.id);
            allSub = allSub.concat(childs);
        }
        return allSub;
    }
    const result = await getCategory(ParentId);
    return result;
}