import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../Restaurant';
import { RestaurantapiService } from '../restaurantapi.service';

@Component({
    selector: 'app-restaurant-all',
    templateUrl: './restaurant-all.component.html',
    styleUrls: ['./restaurant-all.component.scss']
})
  
/** RestaurantAll component*/
export class RestaurantAllComponent implements OnInit{

  restaurantList: Restaurant[] = [];

    /** RestaurantAll ctor */
    constructor(private service:RestaurantapiService, private route:ActivatedRoute, public router:Router ) {
    
  }

  ngOnInit(): void {
    this.getRestaurants();
  }
  
  getRestaurants(): void{
    this.service.getAllRestaurants().subscribe(
      (response: any) => {
        response.businesses.forEach((b) => {
          /*console.log(b);*/
          let restaurant: Restaurant = {
            name: b.name,
            address: b.location.address1,
            city: b.location.city,
            state: b.location.state,
            zip: b.location.zip_code,
            type: b.categories,
            yelpID: b.id,
            img: b.image_url,
            url: b.url,
          }
          this.restaurantList.push(restaurant);
        })
        console.log(response);
      });
  }

  addFavorite(restaurant:Restaurant) {
    this.service.addFavorite(restaurant);
    this.router.navigate(['restaurant-all']);

  }

  removeFavorite(userId: number, favId:number) {
    this.service.removeFavorite(userId,favId);
    this.router.navigate(['restuarant-all']);
  }

}
