import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageSliderComponent} from './components/image-slider/image-slider.component';
import {PurchaseHistoryComponent} from './components/purchase-history/purchase-history.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {ComparisonComponent} from './components/comparison/comparison.component';
import {CartComponent} from './components/cart/cart.component';
import {ItemViewComponent} from './components/item-view/item-view.component';
import {PayComponent} from './components/pay/pay.component';
import {AuthGuard} from './auth.guard';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MoneyComponent} from './components/money/money.component';
import {StripePaypalComponent} from './components/stripe-paypal/stripe-paypal.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DirectSignInComponent} from './components/direct-sign-in/direct-sign-in.component';
import {DirectResetComponent} from './components/direct-reset/direct-reset.component';
import {ProductViewComponent} from './components/product-view/product-view.component';
import {RentalComponent} from './components/rental/rental.component';
import {RentalFormComponent} from './components/rental/rental-form/rental-form.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: ImageSliderComponent},
    {path: 'purchaseHistory', component: PurchaseHistoryComponent, canActivate: [AuthGuard]},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'contactUs', component: ContactUsComponent},
    {path: 'gallery', component: GalleryComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'productView', component: ProductViewComponent},
    {path: 'wishList', component: WishlistComponent, canActivate: [AuthGuard]},
    {path: 'comparision', component: ComparisonComponent},
    {path: 'cart', component: CartComponent},
    {path: 'itemView', component: ItemViewComponent},
    {path: 'pagination', component: PaginationComponent},
    {path: 'buy', component: PayComponent, canActivate: [AuthGuard]},
    {path: 'money', component: MoneyComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'payment', component: StripePaypalComponent},
    {path: 'directSignIn', component: DirectSignInComponent},
    {path: 'directReset', component: DirectResetComponent},
    {path: 'rental', component: RentalComponent},
    {path: 'rental-form', component: RentalFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

