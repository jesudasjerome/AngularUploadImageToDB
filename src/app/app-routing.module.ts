import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ProductComponent } from './product/components/product.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { Product } from './product/interface/product';
import { ProductResolveService } from './product/services/product-resolve.service';

const routes: Routes = [
  {path:'',  component: HomeComponent},
  {path:'Home',  component: HomeComponent},
  {path:'Product',  component: ProductComponent,
  resolve: {
    product:ProductResolveService
  }
},
  {path:'ProductList',  component: ListProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
