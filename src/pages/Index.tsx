import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryChip } from '@/components/CategoryChip';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useToast } from '@/hooks/use-toast';

// Import images
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import productPhone from '@/assets/product-phone.jpg';
import productLaptop from '@/assets/product-laptop.jpg';
import productHeadphones from '@/assets/product-headphones.jpg';
import productWatch from '@/assets/product-watch.jpg';

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

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sample data
  const heroSlides = [
    {
      id: '1',
      title: 'Future of Shopping',
      subtitle: 'Experience Tomorrow Today',
      description: 'Discover cutting-edge products with our AI-powered recommendations and seamless shopping experience.',
      image: heroBanner1,
      ctaText: 'Explore Now',
      ctaAction: () => toast({ title: 'Exploring products...', description: 'Welcome to the future of shopping!' })
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'computers', name: 'Computers', icon: '💻' },
    { id: 'audio', name: 'Audio', icon: '🎧' },
    { id: 'wearables', name: 'Wearables', icon: '⌚' },
    { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max - Latest flagship smartphone with advanced camera system',
      price: 134900,
      originalPrice: 159900,
      image: productPhone,
      rating: 4.5,
      reviews: 2847
    },
    {
      id: '2',
      name: 'MacBook Pro 16" - Powerful laptop for professionals with M3 chip',
      price: 249900,
      originalPrice: 279900,
      image: productLaptop,
      rating: 4.8,
      reviews: 1256
    },
    {
      id: '3',
      name: 'AirPods Pro - Premium wireless earbuds with noise cancellation',
      price: 24900,
      originalPrice: 29900,
      image: productHeadphones,
      rating: 4.6,
      reviews: 5643
    },
    {
      id: '4',
      name: 'Apple Watch Series 9 - Advanced smartwatch with health monitoring',
      price: 41900,
      originalPrice: 49900,
      image: productWatch,
      rating: 4.7,
      reviews: 3421
    },
    {
      id: '5',
      name: 'iPad Air - Versatile tablet for work and entertainment',
      price: 59900,
      originalPrice: 69900,
      image: productPhone,
      rating: 4.4,
      reviews: 1876
    },
    {
      id: '6',
      name: 'Sony WH-1000XM5 - Industry-leading noise canceling headphones',
      price: 29990,
      originalPrice: 34990,
      image: productHeadphones,
      rating: 4.9,
      reviews: 892
    }
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }];
    });
    
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    toast({
      title: 'Checkout initiated!',
      description: 'Redirecting to secure checkout...',
    });
    setIsCartOpen(false);
  };

  const handleProductClick = (product: Product) => {
    toast({
      title: 'Product Details',
      description: `Opening ${product.name} details...`,
    });
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => {
        // Simple category filtering based on product name
        switch (activeCategory) {
          case 'electronics':
            return product.name.toLowerCase().includes('iphone') || product.name.toLowerCase().includes('ipad');
          case 'computers':
            return product.name.toLowerCase().includes('macbook') || product.name.toLowerCase().includes('laptop');
          case 'audio':
            return product.name.toLowerCase().includes('airpods') || product.name.toLowerCase().includes('headphones');
          case 'wearables':
            return product.name.toLowerCase().includes('watch');
          default:
            return true;
        }
      });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Main Content */}
      <main className="animate-fade-in">
        {/* Hero Banner */}
        <section className="container mx-auto px-4 py-8">
          <HeroBanner slides={heroSlides} />
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                name={category.name}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {activeCategory === 'all' ? 'Featured Products' : `${categories.find(c => c.id === activeCategory)?.name}`}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;