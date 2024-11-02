import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ProductComponent } from './product/components/product.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { Product } from './product/interface/product';
import { ProductResolveService } from './product/services/product-resolve.service';
import { AddNewProductComponent } from './product/components/add-new-product/add-new-product.component';
import { AdminpageComponent } from './product/components/adminpage/adminpage.component';
import { PageNotFoundComponent } from './product/components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  {
    path: 'Admin', component: AdminpageComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'ProductList', component: ListProductsComponent },
          {
            path: 'AddProduct', component: AddNewProductComponent,
            resolve: {
              product: ProductResolveService
            }
          }

        ]
      }
    ]
  },
  {
    path: 'Product', component: ProductComponent,
    resolve: {
      product: ProductResolveService
    }
  },
  // {
  //   path: 'AddProduct', component: AddNewProductComponent,
  //   resolve: {
  //     product: ProductResolveService
  //   }
  // },
  // { path: 'ProductList', component: ListProductsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
