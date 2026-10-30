import { redirect } from "next/navigation";

export default function InspectorRegisterRedirectPage() {
  redirect("/register?role=INSPECTOR");
}