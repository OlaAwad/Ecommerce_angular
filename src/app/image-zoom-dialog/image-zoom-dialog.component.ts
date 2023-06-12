import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-zoom-dialog',
  templateUrl: './image-zoom-dialog.component.html',
  styleUrls: ['./image-zoom-dialog.component.css']
})
export class ImageZoomDialogComponent implements OnInit {

  // @Input() imageUrl: string = '';
  public imageUrl: string = ''

  constructor(public modal: NgbActiveModal) { }
  ngOnInit() {
    let img = document.getElementById('zoomed-image') as HTMLImageElement
    let result = document.querySelector('.img-zoom-result') as HTMLElement

    // img.addEventListener('mousemove', moveLens)
    // img.addEventListener('touchmove', moveLens)
    // result.addEventListener('mousemove', moveLens)
    // result.addEventListener('touchmove', moveLens)
    // result.style.display = 'none'

    // document.body.appendChild(result)

    // function moveLens(e: any){
    //   let image = img
    //   let lens = result
    //   let {left: imageX, top: imageY} = image.getBoundingClientRect()
    //   let { offsetX: lensX, offsetY: lensY} = e
    //   let {width: lensWidth, height: lensHeight} = lens.getBoundingClientRect()
    //   let resultX = lensX - lensWidth / 2
    //   let resultY = lensY - lensHeight / 2

    //   lens.style.left = `${lensX}px`
    //   lens.style.top = `${lensY}px`
    //   result.style.display = 'block'
    //   result.style.left = `${imageX + resultX}px`
    //   result.style.top = `${imageY + resultY}px`
    //   result.style.backgroundImage = `url(${image.src})`
    //   result.style.backgroundSize = `${image.width * 2}px ${image.height * 2}px`
    //   result.style.backgroundPosition = `-${resultX * 2}px - ${resultY * 2}px`

    // }
  }

  // ngOnInit(){
  //   let img = document.getElementById('myImage') as HTMLImageElement
  //   let zoom = document.createElement('div')
  //   zoom.classList.add('img-zoom')
  //   img?.parentElement?.insertBefore(zoom, img)

  //   img?.addEventListener('mousemove', this.moveLens)
  //   zoom?.addEventListener('mousemove', this.moveLens)
  //   img?.addEventListener('touchmove', this.moveLens)
  //   zoom?.addEventListener('touchmove', this.moveLens)

    

  //   // img?.addEventListener('mouseleave', () => zoom.style.display = 'none')
  //   // zoom?.addEventListener('mouseleave', () => zoom.style.display = 'none')

  // }

  //  moveLens(e: any){
  //   let img = document.getElementById('myImage') as HTMLImageElement
  //   let zoom = document.createElement('div')
  //   if(e.type === 'click'){
  //     let imgWidth = img?.offsetWidth
  //     let imgHeight = img?.offsetHeight
  //     let zoomWidth = zoom.offsetWidth
  //     let zoomHeight = zoom.offsetHeight
  //     let x = e.offsetX
  //     let y = e.offsetY

  //     let cx = imgWidth && (x / imgWidth) * zoomWidth
  //     let cy = imgHeight && (y / imgHeight) * zoomHeight

  //     zoom.style.backgroundImage = `url('${img?.src}')`
  //     if(imgWidth && imgHeight){
  //       zoom.style.backgroundSize = `${imgWidth * 2}px ${imgHeight * 2}px`
  //     }
  //     zoom.style.backgroundPosition = `-${cx}px - ${cy}px`
  //     zoom.style.display = 'block'
  //   }     
  // }

  // zoomIn(event: any){
  //   let img = event.target as HTMLImageElement
  //   let zoom = img.previousElementSibling as HTMLElement
  //   this.moveLens({type: 'click', offsetX: event.offsetX, offsetY: event.offsetY})
  //   setTimeout(() => {
  //     zoom.style.display = 'none'
  //   }, 3000);
  // }



}
