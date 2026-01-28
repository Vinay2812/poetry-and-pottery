/**
 * User info for display in account dropdown.
 */
export interface UserInfo {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string | null;
}

/**
 * View model for Navbar component.
 */
export interface NavbarViewModel {
  cartCount: number;
  wishlistCount: number;
}

/**
 * Props for the presentational Navbar component.
 */
export interface NavbarProps {
  viewModel: NavbarViewModel;
  currentPath: string;
  onSearchClick: () => void;
}

/**
 * View model for AccountDropdown component.
 */
export interface AccountDropdownViewModel {
  user: UserInfo | null;
  isAdmin: boolean;
  pendingOrdersCount: number;
}

/**
 * Props for the presentational AccountDropdown component.
 */
export interface AccountDropdownProps {
  viewModel: AccountDropdownViewModel;
  onProfileSettings: () => void;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
}

/**
 * View model for MobileHeader component.
 */
export interface MobileHeaderViewModel {
  wishlistCount: number;
  isWishlistActive: boolean;
}

/**
 * Props for the presentational MobileHeader component.
 */
export interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  viewModel: MobileHeaderViewModel;
  currentPath: string;
  isHidden: boolean;
  isScrolled: boolean;
  onBack: () => void;
  onSearchClick: () => void;
}

/**
 * Props for the MobileHeaderContainer.
 */
export interface MobileHeaderContainerProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

/**
 * View model for MobileNav component.
 */
export interface MobileNavViewModel {
  cartCount: number;
  eventRegistrationCount: number;
}

/**
 * Props for the presentational MobileNav component.
 */
export interface MobileNavProps {
  viewModel: MobileNavViewModel;
  currentPath: string;
}

/**
 * Link item for footer navigation.
 */
export interface FooterLinkItem {
  label: string;
  href: string;
}

/**
 * Link group for footer navigation.
 */
export interface FooterLinkGroup {
  title: string;
  links: FooterLinkItem[];
}

/**
 * Social link for footer.
 */
export interface FooterSocialLink {
  platform: "instagram" | "facebook" | "pinterest" | "twitter";
  href: string;
  label: string;
}

/**
 * Contact info item for footer.
 */
export interface FooterContactItem {
  type: "address" | "hours" | "email" | "phone";
  value: string;
  href?: string;
}

/**
 * View model for Footer component.
 */
export interface FooterViewModel {
  brandDescription: string;
  linkGroups: FooterLinkGroup[];
  contactInfo: FooterContactItem[];
  socialLinks: FooterSocialLink[];
  currentYear: number;
  isAuthenticated: boolean;
  isAlreadySubscribed: boolean;
  subscriptionSuccess: boolean;
  subscriptionError: string | null;
}

/**
 * Props for the presentational Footer component.
 */
export interface FooterProps {
  viewModel: FooterViewModel;
  onNewsletterSubmit: () => Promise<void>;
}
