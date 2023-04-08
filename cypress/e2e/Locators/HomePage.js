class HomePage {
    static url = "inventory.html"
    static pageTitle = "Swag Labs";
    static pageHeader = "Swag Labs";
    static hamburgerIcon = "#react-burger-menu-btn";
    static shoppingCartIcon = ".shopping_cart_link";
    static filterIcon = ".select_container";
    static defaultFilter = ".active_option";
    static filterField = ".product_sort_container";
    static defaultFilterValue = "Name (A to Z)";
    static filterItems = "select.product_sort_container option"
    static filterItemsList = ['Name (A to Z)','Name (Z to A)','Price (low to high)','Price (high to low)'];
    static productsTitle = "Products";
    static productTitleLoc = ".title";
    static hamburgerItems = "nav.bm-item-list a";
    static hamburgerItemsList = ['All Items','About','Logout','Reset App State'];
    static hamburgerCloseIcon = "#react-burger-cross-btn";
    static footerText = "© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy";
    static socialMediaItems = ".social li";
    static socialMediaList = ['Twitter','Facebook','LinkedIn'];
    static productDescription = ".inventory_item_description";
    static inventoryName = ".inventory_item_name";
    static inventoryPrice = ".inventory_item_price";
    static addToCart = ".btn_primary";
    static productCount = ".shopping_cart_badge";
    static removeButton = ".btn_secondary";
}

module.exports = {HomePage}