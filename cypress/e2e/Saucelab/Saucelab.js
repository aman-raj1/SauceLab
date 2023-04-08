
import {LandingPage} from "../Locators/LandingPage";
import { HomePage } from "../Locators/HomePage";
import { CartPage } from "../Locators/CartPage";
import { AddressPage } from "../Locators/AddressPage";
import { Checkout } from "../Locators/Checkout";
import {OrderSuccess} from "../Locators/OrderSuccess";


before(()=>{
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
})

beforeEach(()=>{
    cy.fixture('testData.json').as('input');
})



describe("The user is able to visit Saucelab login page",()=>{
    it("The user visits Saucelab login page",()=>{
        cy.visit("/");
        cy.title().should('eq', LandingPage.pageTitle);
    });
});

describe("The user is able to view all the accompanied text on the Landing page",()=>{
    
    it("The user is able to view all accompanied test",()=>{
        cy.contains(LandingPage.pageHeader).should('be.visible');
        cy.get(LandingPage.userNameInput).should('be.visible');
        cy.get(LandingPage.passwordInput).should('be.visible');
        cy.get(LandingPage.loginButton).should('be.visible');
        cy.log("Landing Page loaded successfully...");

    });
    
});

describe("Proper error message should be displayed when the user tries login with invalid user",function(){

    it("Error Message should be displayed if the username is kept blank and user tries to login",function(){
        cy.write(LandingPage.passwordInput, this.input.IncorrectPassword );
        cy.get(LandingPage.loginButton).click();
        cy.contains(LandingPage.usernameRequiredErrorMessage).should('be.visible');
        cy.log("Error specific to blank Username is displayed...")
        cy.clearAll(LandingPage.userNameInput , LandingPage.passwordInput);
    });

    it("Error Message should be displayed if the password is kept blank and user tries to login",function(){
        cy.write(LandingPage.userNameInput, this.input.CorrectUsername);
        cy.get(LandingPage.loginButton).click();
        cy.contains(LandingPage.passwordRequiredErrorMessage).should('be.visible');
        cy.log("Error Specific to blank Password is displayed...");
        cy.clearAll(LandingPage.userNameInput , LandingPage.passwordInput);
    });
    
    it("Proper error message should be displayed when the user tries to log in with locked user",function(){
        cy.write(LandingPage.userNameInput , this.input.LockerUsername);
        cy.write(LandingPage.passwordInput , this.input.CorrectPassword);
        cy.get(LandingPage.loginButton).click();
        cy.contains(LandingPage.lockedOutErrorMessage).should('be.visible');
        cy.log("Error Specific to locked user is displayed...")
        cy.clearAll(LandingPage.userNameInput , LandingPage.passwordInput);
    });

    it("Proper error message should be displayed when user tries to login with incorrect password", function(){
        cy.write(LandingPage.userNameInput , this.input.CorrectUsername);
        cy.write(LandingPage.passwordInput , this.input.IncorrectPassword);
        cy.get(LandingPage.loginButton).click();
        cy.contains(LandingPage.incorrectPasswordErrorMessage).should('be.visible');
        cy.log("Error Specific to incorrect Password is displayed...")
        cy.clearAll(LandingPage.userNameInput , LandingPage.passwordInput);

    });
});

describe("User should be able to login with valid credential",function(){
    it("User should be able to login with valid credential",function(){
        cy.write(LandingPage.userNameInput , this.input.CorrectUsername);
        cy.write(LandingPage.passwordInput , this.input.CorrectPassword);
        cy.get(LandingPage.loginButton).click();
        cy.log("User is able to log in... ")
    });
});

describe("The user is able to view all accompanied texton the home page",function(){

    it("Static texts are visible to user",function(){
        cy.contains(HomePage.pageHeader).should('be.visible');
        cy.get(HomePage.productTitleLoc).invoke('text').should('eq', HomePage.productsTitle);
        cy.get(HomePage.shoppingCartIcon).should('be.visible');
        cy.log("Static text is visible to user...");
    });

    it('User is able to view the footer text',function(){
        cy.contains(HomePage.footerText).should('be.visible');
        cy.log("Footer text is visible...");
        cy.get(HomePage.socialMediaItems).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').should('eq',HomePage.socialMediaList[index]);
        });
        cy.log('Social Media links are visible...');
    });
    
    it("The user is able to view all the items present in hamburger menu",function(){
        
        cy.get(HomePage.hamburgerIcon).should('be.visible');
        cy.get(HomePage.hamburgerIcon).click();
        cy.get(HomePage.hamburgerItems).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').should('eq',HomePage.hamburgerItemsList[index]);
        });
        cy.log("User is able to view all the items present in the Hamburger...");
        cy.get(HomePage.hamburgerCloseIcon).click();
        cy.log("User was able to close the hamburger icon...");
    });

    it("User should be able to view the default value in filter box",function(){
        cy.get(HomePage.defaultFilter).invoke('text').should('eq',HomePage.defaultFilterValue);
        cy.log("User is able to view the default filter vlaue...");
    });

    it('The user should be able to view all the items present in the filter menu',function(){
        cy.get(HomePage.filterIcon).should('be.visible');
        cy.get(HomePage.filterIcon).click();
        cy.get(HomePage.filterItems).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').should('eq',HomePage.filterItemsList[index]);
        });
        cy.log("User is able to view all the items in the filter...");
        cy.get(HomePage.filterIcon).click();
        cy.log("User was able to close the Filter Icon...");
    });
});

describe("User is able to validate the filter",()=>{

    it("User is able to view the products sorted in Ascending order by name",function(){
        let productList = [];
        cy.get(HomePage.inventoryName).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').then((productName)=>{
                productList.push(productName);
            })
        });
        cy.task('checkAscending',{arr:productList}).then((res)=>{
            expect(res).to.be.true;
          });       
       cy.log("Product is sorted in ascending order of Product Name...");
    });

    it("User is able to view the products sorted in Descending order by name",function(){
        let productList = [];
        cy.get(HomePage.filterField).select(HomePage.filterItemsList[1]);
        cy.get(HomePage.inventoryName).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').then((productName)=>{
                productList.push(productName);
            })
        });

       cy.task('checkDescending',{arr:productList}).then((res)=>{
         expect(res).to.be.true;
       });
       cy.log("Product is sorted in Descending order of Product Name...");

    });

    it("User should be able to view Products in Ascending Order of the Amount",function(){
        let amountList = [];
        cy.get(HomePage.filterField).select(HomePage.filterItemsList[2]);
        cy.get(HomePage.inventoryPrice).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').then((amount)=>{
                amountList.push(parseFloat(amount.slice(1)));
            })
        });
        cy.task('checkAscending',{arr:amountList}).then((res)=>{
            expect(res).to.be.true;
          });       
       cy.log("Product is sorted in ascending order of the Amount...");
    });

    it("User should be able to view Products in Descending Order of the Amount",function(){
        let amountList = [];
        cy.get(HomePage.filterField).select(HomePage.filterItemsList[3]);
        cy.get(HomePage.inventoryPrice).each(($el,index,$list)=>{
            cy.wrap($el).invoke('text').then((amount)=>{
                amountList.push(parseFloat(amount.slice(1)));
            })
        });
        cy.task('checkDescending',{arr:amountList}).then((res)=>{
            expect(res).to.be.true;
          });       
       cy.log("Product is sorted in ascending order of the Amount...");
    });
});


describe("No Products is displayed if user moves to cart without selecting any",()=>{
    it("User should be able to view any products without selecting on carts page",()=>{
        cy.get(HomePage.shoppingCartIcon).click();
        cy.get(CartPage.cartList).should('not.exist');
        cy.get(CartPage.continueShopping).click();
        cy.url().should('contain',HomePage.url);
    });
   
});

describe("User should be able to add and Remove Products",()=>{
    let Product = [];
    let Price = [];
    it("User Should be able to add multiple products",()=>{
        cy.get(HomePage.productDescription).each(($el,index,$list)=>{
            cy.wrap($el).find(HomePage.inventoryName).invoke('text').then((name)=>{
                Product.push(name);
            });

            cy.wrap($el).find(HomePage.inventoryPrice).invoke('text').then((price)=>{
                Price.push(price);
            });

            cy.wrap($el).find(HomePage.addToCart).click().then(()=>{
                cy.log(`${Product[index]} having price ${Price[index]} has been added to cart`);
            });
        });

    });
    it("Selected Product count is visible to the user",()=>{
        cy.get(HomePage.productCount).invoke('text').then((text)=>{
            expect(parseInt(text)).to.equal(Product.length);
        });
    });
    it("User should be able to remove all the products",()=>{
        cy.get(HomePage.productDescription).each(($el,index,$list)=>{
        cy.wrap($el).find(HomePage.removeButton).click().then(()=>{

            let deletedProduct  = Product.shift();
            let deletedPrice = Price.shift();
            return {deletedProduct, deletedPrice}
        }).then(({deletedProduct , deletedPrice})=>{
            cy.log(`${deletedProduct} having price as ${deletedPrice} was deleted!`);
        })
    })
    });

    
});


describe("User should be able to move ahead after adding products",()=>{
    let Product = [];
    let Price = [];
    it("User selects all product and proceed ahead to checkout",()=>{
        cy.get(HomePage.productDescription).each(($el,index,$list)=>{
            cy.wrap($el).find(HomePage.inventoryName).invoke('text').then((name)=>{
                Product.push(name);
            });

            cy.wrap($el).find(HomePage.inventoryPrice).invoke('text').then((price)=>{
                Price.push(price);
            });

            cy.wrap($el).find(HomePage.addToCart).click().then(()=>{
                cy.log(`${Product[index]} having price ${Price[index]} has been added to cart`);
            });
        });
    });

    it("User moves to cart page on clicking cart button",()=>{
        cy.get(HomePage.shoppingCartIcon).click();
        cy.url().should('contain',CartPage.url);
    });

    it("User should able to view all the added products",()=>{
        cy.get(CartPage.cartDesc).each(($el,index,$list)=>{
            cy.wrap($el).find(CartPage.productName).invoke('text').then((text)=>{
                expect(text).to.eq(Product[index]);
            })
        });
        cy.log("All Products are visible...");
    });

    it("User should be able to remove the 1st product from cart",()=>{
        cy.get(CartPage.cartDesc).each(($el,index,$list)=>{
            if(index ==0){
                cy.wrap($el).find(CartPage.removeProduct).click().then(()=>{
                    let removedProduct = Product.shift();
                    let removedPrice = Price.shift();
                    return {removedProduct ,removedPrice };
                }) .then(({removedProduct ,removedPrice})=>{
                    cy.log(`${removedProduct} having price ${removedPrice} has been removed from the cart`);
                })
            }
           
        })
    });

    it("User should be redirected to home page on clicking Continue Shopping",()=>{
        cy.get(CartPage.continueShopping).click();
        cy.url().should('contain',HomePage.url);
    });

    it("User moves to cart page on clicking cart button",()=>{
        cy.get(HomePage.shoppingCartIcon).click();
        cy.url().should('contain',CartPage.url);
    });

    it("User should able to view all the added products",()=>{
        cy.get(CartPage.cartDesc).each(($el,index,$list)=>{
            cy.wrap($el).find(CartPage.productName).invoke('text').then((text)=>{
                expect(text).to.eq(Product[index]);
            })
        });
        cy.log("All Products are visible...");
    });

    it("User should be able able to move to the address page on clicking checkout button",()=>{
        cy.get(CartPage.checkoutButton).click().then(()=>{
            localStorage.setItem("Selected-Product", Product);
            localStorage.setItem("Product-Price", Price);
        });
       

    });

    
});

describe("User should be able to move ahead by providing correct info",()=>{
    it("Valid Error message is dispalyed when the user kept the Firstname as blank",function(){
        cy.write(AddressPage.lastNameInput ,this.input.AddressInfo.lastname );
        cy.write(AddressPage.zipCodeInput , this.input.AddressInfo.Zipcode);
        cy.get(AddressPage.continueButton).click();
        cy.contains(AddressPage.firstNameReqError).should('be.visible');
    })
    it("Valid Error message is dispalyed when the user kept the Lastname as blank",function(){
        cy.write(AddressPage.firstNameInput ,this.input.AddressInfo.firstname );
        cy.get(AddressPage.lastNameInput).clear();
        cy.write(AddressPage.zipCodeInput , this.input.AddressInfo.Zipcode);
        cy.get(AddressPage.continueButton).click();
        cy.contains(AddressPage.lastNameReqError).should('be.visible');
    })
    it("Valid Error message is dispalyed when the user kept the Zipcode as blank",function(){
            cy.write(AddressPage.firstNameInput ,this.input.AddressInfo.firstname );
            cy.write(AddressPage.lastNameInput , this.input.AddressInfo.lastname);
            cy.get(AddressPage.zipCodeInput).clear();
            cy.get(AddressPage.continueButton).click();
            cy.contains(AddressPage.ziipCodeReqError).should('be.visible');
    })

    it("User should be able to move to cart page on clicking cancel button",()=>{
        cy.get(AddressPage.cancelButton).click();
        cy.url().should('contain',CartPage.url);
    });

    it("User should be able able to move to the address page on clicking checkout button",()=>{
        cy.get(CartPage.checkoutButton).click();
    });

    it("user should be able to move to checkoutStep2 page on clicking continue button",function(){
        cy.write(AddressPage.firstNameInput ,this.input.AddressInfo.firstname );
        cy.write(AddressPage.lastNameInput , this.input.AddressInfo.lastname);
        cy.write(AddressPage.zipCodeInput , this.input.AddressInfo.Zipcode);

        cy.get(AddressPage.continueButton).click();
        cy.url().should('contain', Checkout.url);
    });
});

describe("User should be able to verify all the info and complete the purchase",()=>{
    let Product , Price;
    it("User should be able to view all the added products",()=>{
        Product = localStorage.getItem('Selected-Product').split(",");
        Price = localStorage.getItem('Product-Price').split(",");
        cy.log('Product',Product);
        cy.log("Price",Price);
        cy.get(Checkout.itemDesc).each(($el,index,$list)=>{
            cy.wrap($el).find(Checkout.itemName).invoke('text').then((text)=>{
                expect(text).to.eq(Product[index]);
            })
            cy.wrap($el).find(Checkout.itemPrice).invoke('text').then((text)=>{
                expect(text).to.eq(Price[index]);
            })
        });
        cy.log("All added products are visible...");

    });

    it("The user is able to view valid price before taxes",()=>{
        let totalSum = 0;
        
        cy.get(Checkout.totalPrice).invoke("text").then((text)=>{
            localStorage.setItem('total-price',text.split(' ')[2]);
            for(let i=0;i<Price.length;i++){
                    totalSum = totalSum + parseFloat(Price[i].slice(1));
            }
            return text;
        }).then((text)=>{
            //cy.log("Total Sum", totalSum);
           expect(parseFloat(text.split('$')[1])).to.eq(totalSum);
           cy.log("User is able to view the correct amount...");
        });

        cy.get(Checkout.finalPrice).invoke('text').then((text)=>{
            localStorage.setItem('FinalAmount',text.split(' ')[1])
        })

    });
    it("User should be able to navigate to Order Confirmation page",()=>{
        cy.get(Checkout.finishButton).click();
        cy.url().should('contain',OrderSuccess.url);
    });
});

describe("User is able to see order successful screen",()=>{

    
    it("User is able to view Order Successful text",()=>{
       cy.get(OrderSuccess.orderSuccessIcon).should('exist');
        cy.contains(OrderSuccess.thankYouText).should('be.visible');
        cy.get(OrderSuccess.backToHome).should('be.visible');
    });

    it("User is able to navigate to home page on clicking home button",()=>{
        cy.get(OrderSuccess.backToHome).click();
        cy.url().should('contain', HomePage.url);
    });
});


describe("User should be able to logout of the application",()=>{
    it("User iss able to logout of the application",()=>{
        cy.get(HomePage.hamburgerIcon).click();
        cy.contains(HomePage.hamburgerItemsList[2]).click();
        cy.url().should('eq',Cypress.config('baseUrl'));
    })
    

});

describe("User creates a file which contains all the info regarding ordered product",()=>{
    const OrderDetails = {
        "ProductDetails":[{}],
        "TotalPrice":'',
        "AmountPayed":''
    };
    
    it("User creates a file having  ordered product info",()=>{
        cy.url().should('eq',Cypress.config('baseUrl')).then(()=>{
            
            const date = new Date();
            let Product = localStorage.getItem('Selected-Product').split(",");
            let Price = localStorage.getItem('Product-Price').split(",");
            let totalPrice  = localStorage.getItem('total-price');
            let FinalAmount = localStorage.getItem('FinalAmount');
            for(let i=0;i<Product.length;i++){
                const temp = {};
                temp.ProductName = Product[i];
                temp.Productprice = Price[i];
                OrderDetails.ProductDetails[i] = temp;
                OrderDetails.TotalPrice = totalPrice;
                OrderDetails.AmountPayed = FinalAmount;
            }
            cy.task('writeFile',{path: "./OrderConfirmation.json" , data: JSON.stringify(OrderDetails)});
        });
       
    });
});
