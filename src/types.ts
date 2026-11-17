import type { components } from "./api/schema";

export type WishlistItemData = components["schemas"]["WishlistItem"];
export type WishlistItemStatus = components["schemas"]["StatusEnum"] | components["schemas"]["NullEnum"]