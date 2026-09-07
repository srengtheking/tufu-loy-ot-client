loy-ot-client/
│
├── public/
│   └── images/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   │
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilter.tsx
│   │   │   └── ProductRating.tsx
│   │   │
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   │
│   │   └── category/
│   │       └── CategoryCard.tsx
│   │
│   ├── pages/
│   │   │
│   │   ├── Home/
│   │   │   └── Home.tsx
│   │   │
│   │   ├── Shop/
│   │   │   └── Shop.tsx
│   │   │
│   │   ├── Product/
│   │   │   └── ProductDetail.tsx
│   │   │
│   │   ├── Category/
│   │   │   └── CategoryProducts.tsx
│   │   │
│   │   ├── Cart/
│   │   │   └── Cart.tsx
│   │   │
│   │   ├── Checkout/
│   │   │   └── Checkout.tsx
│   │   │
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   │
│   │   ├── Order/
│   │   │   ├── Orders.tsx
│   │   │   └── OrderDetail.tsx
│   │   │
│   │   └── Profile/
│   │       └── Profile.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   ├── categoryService.ts
│   │   ├── cartService.ts
│   │   └── orderService.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   └── useCart.ts
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   └── user.ts
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   └── storage.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts