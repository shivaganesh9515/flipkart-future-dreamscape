import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="product-card group cursor-pointer overflow-hidden border-accent/10 bg-card/50 backdrop-blur-sm"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {discountPercentage > 0 && (
            <div className="absolute left-2 top-2 rounded-md bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Quick Add Button - appears on hover */}
          <div className="absolute inset-x-2 bottom-2 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              size="sm"
              className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="mt-2 flex items-center space-x-1">
            <div className="flex items-center space-x-1 rounded bg-accent/20 px-2 py-1">
              <span className="text-xs font-bold text-accent">{product.rating}★</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};