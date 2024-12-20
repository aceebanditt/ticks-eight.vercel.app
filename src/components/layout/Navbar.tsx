import Link from "next/link";
import Image from "next/image";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchDialog } from "@/components/search/SearchDialog";
import { CartSheet } from "@/components/cart/CartSheet";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  
  const categories = [
    { name: "Concerts", href: "/category/concerts" },
    { name: "Sports", href: "/category/sports" },
    { name: "Theatre", href: "/category/theatre" },
    { name: "Comedy", href: "/category/comedy" },
    { name: "Family", href: "/category/family" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&q=80"
                  alt="Your Choice Tickets"
                  width={40}
                  height={40}
                  className="object-contain transition-transform group-hover:scale-110"
                  priority
                />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight hover:text-primary transition-colors">
                Your Choice Tickets
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <SearchDialog />
            <CartSheet />
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/account">
                  <Button variant="ghost" size="icon" className="hover:text-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                  className="hidden sm:inline-flex hover:bg-destructive hover:text-destructive-foreground"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button className="hidden sm:inline-flex">Sign In</Button>
              </Link>
            )}
            <Link href="/sell" className="hidden md:block">
              <Button variant="secondary">Sell Tickets</Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link href="/sell">
                    <Button className="w-full mt-4">
                      Sell Tickets
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};