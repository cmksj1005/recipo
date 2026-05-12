import Link from 'next/link';
import styles from './Navbar.module.css';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
      <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={styles.navButton}>
              <div>Home</div>
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={styles.navButton}>
              Recipes
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={styles.navButton}>
              <div>Best Recipes</div>
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={styles.navButton}>
              <div>About</div>
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={styles.navButton}>
              <div>My Account</div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
