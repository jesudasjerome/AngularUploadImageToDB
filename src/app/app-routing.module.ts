import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ProductComponent } from './product/components/product.component';
import { ListProductsComponent } from './product/list-products/list-products.component';

const routes: Routes = [
  {path:'',  component: HomeComponent},
  {path:'Product',  component: ProductComponent},
  {path:'ProductList',  component: ListProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
