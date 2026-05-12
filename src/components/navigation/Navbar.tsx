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
    <>
      <NavigationMenu>
        <NavigationMenuItem className={styles.Navbar}>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Recipes</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Test1</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Test2</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </>
  );
}
