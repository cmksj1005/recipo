'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { UserButton, SignUpButton, SignInButton, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const { userId, isLoaded } = useAuth();
  return (
    <div className={styles.navbarWrapper}>
      <div></div>
      <div className={styles.navMenu}>
        <NavigationMenu>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className={styles.navButton}>
                <div>Home</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className={styles.navButton}>
                Recipes
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className={styles.navButton}>
                <div>Best Recipes</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className={styles.navButton}>
                <div>About</div>
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/" className={styles.navButton}>
                <div>My Account</div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
      <div className={styles.authMenu}>
        <header className="flex justify-end items-center p-4 gap-4 h-full">
          {isLoaded && !userId && (
            <>
              <SignInButton>
                <button className="cursor-pointer">Sign In</button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-rose-300 text-white rounded-lg font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
          {isLoaded && userId && <UserButton />}
        </header>
      </div>
    </div>
  );
}
