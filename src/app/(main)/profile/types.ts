export type MenuIconType =
  | "package"
  | "heart"
  | "calendar"
  | "message-circle"
  | "help-circle";

export interface MenuItemViewModel {
  icon: MenuIconType;
  label: string;
  href: string;
  count?: number;
}

export interface ProfileViewModel {
  fullName: string;
  initials: string;
  email: string;
  imageUrl: string;
  memberSince: string;
  accountItems: MenuItemViewModel[];
  settingsItems: MenuItemViewModel[];
}

export interface ProfileClientProps {
  viewModel: ProfileViewModel;
  onNavigate: (path: string) => void;
  onProfileSettings: () => void;
  onSignOut: () => void;
}
