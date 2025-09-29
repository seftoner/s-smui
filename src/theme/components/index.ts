// Import all component overrides
import { buttonOverrides } from './buttons';
import { surfaceOverrides } from './surfaces';
import { inputOverrides } from './inputs';
import { navigationOverrides } from './navigation';
import { dataDisplayOverrides } from './dataDisplay';
import { feedbackOverrides } from './feedback';

// Export all component overrides
export { buttonOverrides } from './buttons';
export { surfaceOverrides } from './surfaces';
export { inputOverrides } from './inputs';
export { navigationOverrides } from './navigation';
export { dataDisplayOverrides } from './dataDisplay';
export { feedbackOverrides } from './feedback';

// Combine all overrides into a single object
export const components = {
  ...buttonOverrides,
  ...surfaceOverrides,
  ...inputOverrides,
  ...navigationOverrides,
  ...dataDisplayOverrides,
  ...feedbackOverrides,
};