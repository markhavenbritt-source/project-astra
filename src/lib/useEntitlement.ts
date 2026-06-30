// useEntitlement — answers one question: "does the signed-in user own this?"
// It checks the Supabase `entitlements` table. Thanks to the table's security
// rule, the query can only ever return THIS user's rows, so a returned row
// means they genuinely own it.

import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthProvider";

export function useEntitlement(productId: string) {
  const { user, loading: authLoading } = useAuth();
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    // Not signed in → definitely doesn't own it.
    if (!user) {
      setOwned(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("entitlements")
      .select("product_id")
      .eq("product_id", productId)
      .maybeSingle();

    if (error) console.error("Entitlement check failed:", error.message);
    setOwned(Boolean(data));
    setLoading(false);
  }, [user, productId]);

  useEffect(() => {
    // Wait until we know the auth state before checking.
    if (authLoading) return;
    check();
  }, [authLoading, check]);

  return { owned, loading: loading || authLoading, refresh: check };
}
