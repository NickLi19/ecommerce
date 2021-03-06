"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from .views import home_page, about_page, contact
from accounts.views import RegisterView, LoginView, GuestRegisterView
from django.urls import path, re_path, include
from django.views.generic import TemplateView, RedirectView
from django.contrib.auth.views import LogoutView
from addresses.views import checkout_address_create_view, checkout_address_reuse_view
from carts.views import cart_detail_api_view
from billing.views import payment_method_view, payment_method_createview
from marketing.views import MarketingPreferenceUpdateView, MailchimpWebhookView
from orders.views import LibraryView
from analytics.views import SalesView, SalesAjaxView


urlpatterns = [
    re_path(r'^$', home_page, name='home'),
    re_path(r'^bootstrap/$', TemplateView.as_view(template_name='bootstrap/example.html')),
    re_path(r'^about/$', about_page, name='about'),
    re_path(r'^login/$', LoginView.as_view(), name='login'),
    re_path(r'^checkout/address/create/$', checkout_address_create_view, name='checkout_address_create'),
    re_path(r'^checkout/address/reuse/$', checkout_address_reuse_view, name='checkout_address_reuse'),
    re_path(r'^register/guest/$', GuestRegisterView.as_view(), name='guest_register'),
    re_path(r'^logout/$', LogoutView.as_view(), name='logout'),
    re_path(r'^register/$', RegisterView.as_view(), name='register'),
    re_path(r'^contact/$', contact, name='contact'),
    re_path(r'^billing/payment-method/$', payment_method_view, name='billing-payment-method'),
    re_path(r'^billing/payment-method/create/$', payment_method_createview, name='billing-payment-method-endpoint'),
    re_path(r'^settings/$', RedirectView.as_view(url='account')),
    re_path(r'^settings/email/$', MarketingPreferenceUpdateView.as_view(), name='marketing-pref'),
    re_path(r'^webhooks/mailchimp/$', MailchimpWebhookView.as_view(), name='webhooks-mailchimp'),
    re_path(r'^analytics/sales/$', SalesView.as_view(), name='sales-analytics'),
    re_path(r'^analytics/sales/data/$', SalesAjaxView.as_view, name='sales-analytics-data'),
    re_path(r'^library/$', LibraryView.as_view(), name='library'),
    path('admin/', admin.site.urls),
    re_path(r'^products/', include("products.urls", namespace='products')),
    re_path(r'^search/', include("search.urls", namespace='search')),
    re_path(r'^api/cart/$', cart_detail_api_view, name='api-cart'),
    re_path(r'^cart/', include("carts.urls", namespace='cart')),
    # re_path(r'^accounts/login/$', RedirectView.as_view(url='/login')),
    re_path(r'^accounts/$', RedirectView.as_view(url='/account')),
    re_path(r'^account/', include("accounts.urls", namespace='accounts')),
    re_path(r'^accounts/', include("accounts.passwords.urls")),
    re_path(r'^orders/', include('orders.urls', namespace='orders')),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
