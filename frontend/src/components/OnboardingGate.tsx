import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function OnboardingGate() {
  const { progress } = useApp();
  return progress.onboardingCompleted ? <Outlet /> : <Navigate to="/onboarding" replace />;
}
