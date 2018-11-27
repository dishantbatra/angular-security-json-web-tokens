import { AppUserClaim } from './app-user-claims';

export class AppUserAuth {
  userName: String = '';
  bearerToken: String = '';
  isAuthenticated: Boolean = false;
  // canAccessProducts: Boolean = false;
  // canAddProduct: Boolean = false;
  // canSaveProduct: Boolean = false;
  // canAccessCategories: Boolean = false;
  // canAddCategory: Boolean = false;
  claims: AppUserClaim[];
}
