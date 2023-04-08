class Checkout {
    static url = "checkout-step-two.html";
    static itemDesc = ".cart_item_label";
    static itemName = ".inventory_item_name";
    static itemPrice = ".inventory_item_price";
    static totalPrice = ".summary_subtotal_label";
    static tax = ".summary_tax_label";
    static finalPrice = ".summary_total_label";
    static cancelButton = "#cancel";
    static finishButton = "#finish";
}

module.exports = {Checkout};