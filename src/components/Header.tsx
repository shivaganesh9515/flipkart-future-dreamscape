import { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onCartOpen: () => void;
  cartItemCount: number;
}

export const Header = ({ onCartOpen, cartItemCount }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <header className="sticky top-0 z-50 glass-surface border-b border-accent/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Flipkart X
            </div>
          </div>

          {/* Glass Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative glass-surface rounded-full border border-accent/20 p-1">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none bg-transparent px-6 py-3 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="mr-2 h-10 w-10 rounded-full bg-accent hover:bg-accent/90"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Login</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative flex items-center space-x-2 border-accent/20 hover:bg-accent/10"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};