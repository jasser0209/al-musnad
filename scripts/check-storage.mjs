import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

async function check() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("Bucket list error:", error.message);
    return;
  }
  console.log("Available buckets:", buckets.map((b) => b.name));
  const hasWorksheets = buckets.some((b) => b.name === "worksheets");
  if (hasWorksheets) {
    console.log("✅ Bucket 'worksheets' exists and is ready!");
  } else {
    console.log("⚠️ Bucket 'worksheets' not found, attempting creation...");
    const { error: createErr } = await supabase.storage.createBucket("worksheets", { public: true });
    if (createErr) console.error("Create error:", createErr.message);
    else console.log("✅ Bucket 'worksheets' created successfully!");
  }
}
check();
