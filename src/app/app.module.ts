import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavigationHomeComponent} from './components/navigation-home/navigation-home.component';
import {ImageSliderComponent} from './components/image-slider/image-slider.component';
import {SearchPriceRangeBarComponent} from './components/search-price-range-bar/search-price-range-bar.component';
import {ItemViewComponent} from './components/item-view/item-view.component';
import {HomeSearchBarComponent} from './components/home-search-bar/home-search-bar.component';
import {MoneyComponent} from './components/money/money.component';
import {PayComponent} from './components/pay/pay.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {OwlModule} from 'ngx-owl-carousel';
import {ComparisonComponent} from './components/comparison/comparison.component';
import {CartComponent} from './components/cart/cart.component';
import {PurchaseHistoryComponent} from './components/purchase-history/purchase-history.component';
import {StripePaypalComponent} from './components/stripe-paypal/stripe-paypal.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {TopSearchBarComponent} from './components/top-search-bar/top-search-bar.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SubCategoryViewComponent} from './components/sub-category-view/sub-category-view.component';
import {PageNavigationComponent} from './components/page-navigation/page-navigation.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {PriceRangeSliderComponent} from './components/price-range-slider/price-range-slider.component';
import {Ng5SliderModule} from 'ng5-slider';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {AuthGuard} from './auth.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import {PortfolioComponent} from './components/portfolio/portfolio.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {FormsModule} from '@angular/forms';
import {NgxStripeModule} from 'ngx-stripe';
import {NgxPayPalModule} from 'ngx-paypal';
import {NgxGalleryModule} from 'ngx-gallery';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RatingComponent} from './components/rating/rating.component';
import {ComplainComponent} from './components/complain/complain.component';
import {ProfileComponent} from './components/profile/profile.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {DirectSignInComponent} from './components/direct-sign-in/direct-sign-in.component';
import {DirectResetComponent} from './components/direct-reset/direct-reset.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {TooltipModule} from 'ng2-tooltip-directive';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CrystalGalleryModule} from 'ngx-crystal-gallery';
import {ProductViewComponent} from './components/product-view/product-view.component';
import {ImageViewComponent} from './components/product-view/image-view/image-view.component';
import {ProductDetailComponent} from './components/product-view/product-detail/product-detail.component';
import {ButtonSetComponent} from './components/product-view/button-set/button-set.component';
import {SpecsComponent} from './components/product-view/specs/specs.component';
import {SimmilerItemComponent} from './components/product-view/simmiler-item/simmiler-item.component';
import {RentalComponent} from './components/rental/rental.component';
import {RentalFormComponent} from './components/rental/rental-form/rental-form.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        NavigationHomeComponent,
        TopSearchBarComponent,
        SignUpComponent,
        SignInComponent,
        ItemViewComponent,
        SubCategoryViewComponent,
        PageNavigationComponent,
        ImageSliderComponent,
        SearchPriceRangeBarComponent,
        ItemViewComponent,
        HomeSearchBarComponent,
        ProductViewComponent,
        MoneyComponent,
        PayComponent,
        WishlistComponent,
        ImageViewComponent,
        ProductDetailComponent,
        ButtonSetComponent,
        SpecsComponent,
        WishlistComponent,
        ComparisonComponent,
        CartComponent,
        PurchaseHistoryComponent,
        StripePaypalComponent,
        AboutUsComponent,
        ContactUsComponent,
        GalleryComponent,
        PriceRangeSliderComponent,
        ForgetPasswordComponent,
        PortfolioComponent,
        PaginationComponent,
        RatingComponent,
        ComplainComponent,
        RatingComponent,
        ComplainComponent,
        ProfileComponent,
        InvoiceComponent,
        DirectSignInComponent,
        DirectResetComponent,
        SimmilerItemComponent,
        RentalComponent,
        RentalFormComponent
    ],
    imports: [
        BrowserModule,
        OwlModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        Ng5SliderModule,
        NgxPaginationModule,
        FormsModule,
        NgxStripeModule,
        NgxPayPalModule,
        FormsModule,
        NgxGalleryModule,
        NgbModule,
        SlickCarouselModule,
        TooltipModule,
        NgxSpinnerModule,
        CrystalGalleryModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
