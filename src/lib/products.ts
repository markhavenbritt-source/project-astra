// Product IDs are the labels stored in the Supabase `entitlements` table
// (the `product_id` column) and written by the Stripe webhook.
// Keep these in sync with the Stripe products you create.

export const BINARY_ISSUE_1 = "binary_issue_1";

// Maps a Reader route id (the :id in /read/:id) to the product a user must
// own to read it. Add a line here for each future issue.
export const readerToProduct: Record<string, string> = {
  "binary-01": BINARY_ISSUE_1,
};
