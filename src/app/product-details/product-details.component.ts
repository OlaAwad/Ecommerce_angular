import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { cart, product } from '../data-types'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product
  productQuantity: number = 1
  removeCart = false
  cartData: product | undefined
  lowStock: boolean = false
  lowStockMsg: string = ''
  availableQuantity: number | undefined
  popularProducts: undefined | product[]
  images: undefined | product[]

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
  ) {}

   

  ngOnInit(): void {


    // this.product.popularProducts().subscribe((data) => {
    //   // console.log(data)
    //   this.images = data;
    // })

    // console.log('removeCart: ', this.removeCart)
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    // console.log(productId)
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        // console.log('result', result)
        this.productData = result
        // console.log('Available Quantity: ', this.productData.availableQuantity)
        this.availableQuantity = this.productData.availableQuantity

        this.displayLowStockMsg()

        let cartData = localStorage.getItem('localCart')
        // console.log('cartData: ', cartData)
        if (productId && cartData) {
          let items = JSON.parse(cartData)
          items = items.filter(
            (item: product) => {
              productId == item.id?.toString()
              console.log('productId: ', productId)
            }
            
          )
          if (items.length) {
            this.removeCart = true
          } else {
            this.removeCart = false
          }
        }
        let user = localStorage.getItem('user')
        if (user) {
          let userId = user && JSON.parse(user).id
          this.product.getCartList(userId)

          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.id?.toString(),
                // productId?.toString() === item.productId?.toString(),
            )
            // console.log('productId: ', productId)
            // console.log('item: ', item)
            if (item.length) {
              this.cartData = item[0]
              this.removeCart = true
            }
          })
        }
      })

      
  }

  handleQuantity(val: string) {
    let aQuantity = this.productData?.availableQuantity
    if (aQuantity && this.productQuantity < aQuantity && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      // if (!localStorage.getItem('user')) {
        console.log('productData: ',this.productData)
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      // } else {
        // console.log('user is logged in')
        // console.log('productData: ',this.productData)
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        // console.log(userId)
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            // alert('Product is added in cart')
            this.product.getCartList(userId)
            this.product.updateCartCount()
            this.removeCart = true
          }
        })
      // }
    }

  }

  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)
      // this.product.removeFromCart(productId).subscribe(()=>{})
    } else {
      let user = localStorage.getItem('user')
      // let userId = user && JSON.parse(user).id
      console.log('cartData: ', this.cartData)
      this.cartData &&
      //this sends productId, I need to send cartId
        this.product.removeFromCart(this.cartData.id).subscribe((result) => {
          if (result) {
            console.log('id: ', this.cartData?.id)
            // console.log('result: ', result)
            // this.product.getCartList(userId).subscribe(()=>{})
            this.product.updateCartCount()
          }
        })
    }
    this.removeCart = false

  }

  displayLowStockMsg(){
    let aQuantity = this.productData?.availableQuantity
    if(aQuantity && aQuantity == 1){
      this.lowStock = true
      this.lowStockMsg = `Only 1 item left in stock`
    }else if(aQuantity && aQuantity < 5){
      this.lowStock = true
      this.lowStockMsg = `Only ${aQuantity} items left in stock`
    }else{
      this.lowStock = false
      this.lowStockMsg = ''
    }
  }

  // imageZoom(imgId: any, resultId: any){
  //   let img: any, lens: any, result: any, cx: any, cy: any
  //   img = document.getElementById(imgId)
  //   result = document.getElementById(resultId)

  //   lens = document.createElement('div')
  //   lens.setAttribute('class', 'img-zoom-lens')
    
  //   img.parentElement.insertBefore(lens, img)
  //   cx = result?.offsetWidth / lens.offsetWidth
  //   cy = result?.offsetHeight / lens.offsetHeight

  //   result.style.backgroundImage = "url('" + img.src + "')"
  //   result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px"

  //   lens.addEventListener("mousemove", moveLens)
  //   img?.addEventListener("mousemove", moveLens)

  //   lens.addEventListener("touchmove", moveLens)
  //   img?.addEventListener("touchmove", moveLens)

  //   function moveLens(e: any){
  //     let pos, x, y
  //     e.preventDefault()
  //   pos = getCursorPos(e)
  //   x = pos.x - (lens.offsetWidth / 2)
  //   y = pos.y - (lens.offsetHeight / 2)
  //   if(x > img.width - lens.offsetWidth){ x = img.width - lens.offsetWidth}
  //   if( x < 0 ){x = 0}
  //   if(x > img.height - lens.offsetHeight){ x = img.height - lens.offsetHeight}
  //   if( y < 0 ){y = 0}
  //   lens.style.left = x + "px"
  //   lens.style.top = y + "px"
  //   result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px"
  //   }
  //   function getCursorPos(e: any){
  //     let a, x = 0, y = 0
  //     e = e || window.event
  //     a = img.getBoundingClientRect()
  //     x = e.pageX - a.left
  //     y = e.pageY - a.top
  //     x = x - window.pageXOffset
  //     y = y - window.pageYOffset
  //     return {x: x, y: y}
  //   }
   
    
  // }

  // imageZoom(imgId: any, resultId: any) {
  //   let img: any, lens: any, result: any, cx: any, cy: any;
  //   img = document.getElementById(imgId);
  //   result = document.getElementById(resultId);

  //   // Create lens element and set its attributes
  //   lens = document.createElement('div');
  //   lens.setAttribute('class', 'img-zoom-lens');

  //   // Insert lens before image
  //   img.parentElement.insertBefore(lens, img);

  //   // Calculate the zoom dimensions
  //   cx = result?.offsetWidth / lens.offsetWidth;
  //   cy = result?.offsetHeight / lens.offsetHeight;

  //   // Set the background image and size of the result div
  //   result.style.backgroundImage = "url('" + img.src + "')";
  //   result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

  //   // Add event listeners for mouse and touch events
  //   lens.addEventListener('mousemove', moveLens);
  //   img?.addEventListener('mousemove', moveLens);
  //   lens.addEventListener('touchmove', moveLens);
  //   img?.addEventListener('touchmove', moveLens);

  //   // Move the lens and update the result background position
  //   function moveLens(e: any) {
  //     let pos, x, y;
  //     e.preventDefault();
  //     // Get the cursor position
  //     pos = getCursorPos(e);
  //     // Calculate the position of the lens
  //     x = pos.x - (lens.offsetWidth / 2);
  //     y = pos.y - (lens.offsetHeight / 2);
  //     // Restrict the lens position to the image boundaries
  //     if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
  //     if (x < 0) { x = 0; }
  //     if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
  //     if (y < 0) { y = 0; }
  //     // Set the lens position
  //     lens.style.left = x + 'px';
  //     lens.style.top = y + 'px';
  //     // Update the result background position
  //     result.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px';
  //   }

  //   // Get the cursor position relative to the image
  //   function getCursorPos(e: any) {
  //     let a, x = 0, y = 0;
  //     e = e || window.event;
  //     a = img.getBoundingClientRect();
  //     x = e.pageX - a.left;
  //     y = e.pageY - a.top;
  //     x = x - window.pageXOffset;
  //     y = y - window.pageYOffset;
  //     return { x: x, y: y };
  //   }}
  // imageZoom(imgID: string, resultID: string) {
  //   var img: any, lens: any, result: any, cx: any, cy: any;
  //   img = document.getElementById(imgID);
  //   // console.log('img: ', img)
  //   result = document.getElementById(resultID);
  //   // console.log('result: ', result)
  //   /*create lens:*/
  //   lens = document.createElement("div");
  //   lens.setAttribute("class", "img-zoom-lens");
  //   /*insert lens:*/
  //   img.parentElement.insertBefore(lens, img);
  //   /*calculate the ratio between result DIV and lens:*/
  //   cx = result.offsetWidth / lens.offsetWidth;
  //   cy = result.offsetHeight / lens.offsetHeight;
  //   /*set background properties for result DIV:*/
  //   result.style.backgroundImage = "url('" + img.src + "')";
  //   result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  //   /*execute a function when someone moves the cursor over the image, or the lens:*/
  //   lens.addEventListener("mousemove", moveLens);
  //   img.addEventListener("mousemove", moveLens);
  //   /*and also for touch screens:*/
  //   lens.addEventListener("touchmove", moveLens);
  //   img.addEventListener("touchmove", moveLens);

  //   function moveLens(e: any) {
  //     var pos, x, y;
  //     /*prevent any other actions that may occur when moving over the image:*/
  //     e.preventDefault();
  //     /*get the cursor's x and y positions:*/
  //     pos = getCursorPos(e);
  //     /*calculate the position of the lens:*/
  //     x = pos.x - (lens.offsetWidth / 2);
  //     y = pos.y - (lens.offsetHeight / 2);
  //     /*prevent the lens from being positioned outside the image:*/
  //     if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
  //     if (x < 0) { x = 0; }
  //     if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
  //     if (y < 0) { y = 0; }
  //     /*set the position of the lens:*/
  //     lens.style.left = x + "px";
  //     lens.style.top = y + "px";
  //     /*display what the lens "sees":*/
  //     result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  //   }

  //   function getCursorPos(e: any) {
  //     var a, x = 0, y = 0;
  //     e = e || window.event;
  //     /*get the x and y positions of the image:*/
  //     a = img.getBoundingClientRect();
  //     /*calculate the cursor's x and y coordinates, relative to the image:*/
  //     x = e.pageX - a.left;
  //     y = e.pageY - a.top;
  //     /*consider any page scrolling:*/
  //     x = x - window.pageXOffset;
  //     y = y - window.pageYOffset;
  //     return { x: x, y: y };
  //   }
  // }



  imageZoom(imgID: string, resultID: string) {
    var img: any, lens: any, result: any, cx: any, cy: any;
  img = document.getElementById(imgID) as HTMLImageElement;
    result = document.getElementById(resultID) as HTMLDivElement;
    /*create lens:*/
    lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    result.style.display = "none"; // hide the #myResult div initially
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e: any) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*show the #myResult div:*/
      result.style.display = "block";
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
      if (x < 0) { x = 0; }
      if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
      if (y < 0) { y = 0; }
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e: any) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  onImageLoad() {
    this.imageZoom("myImage", "myResult");
  }

}
