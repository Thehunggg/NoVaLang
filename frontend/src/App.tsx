import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { OnboardingGate } from "./components/OnboardingGate";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { LessonPage } from "./pages/LessonPage";
import { LoginPage } from "./pages/LoginPage";
import { MistakesPage } from "./pages/MistakesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { PracticePage } from "./pages/PracticePage";
import { ProfilePage } from "./pages/ProfilePage";
import { PlacementResultPage } from "./pages/PlacementResultPage";
import { PlacementTestPage } from "./pages/PlacementTestPage";
import { ReviewPage } from "./pages/ReviewPage";

export default function App() {
  return <BrowserRouter><AuthProvider><AppProvider><Routes>
    <Route path="/welcome" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route element={<OnboardingGate />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/practice/:language" element={<PracticePage />} />
          <Route path="/placement/:language" element={<PlacementTestPage />} />
          <Route path="/placement-result" element={<PlacementResultPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/mistakes" element={<MistakesPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/progress" element={<Navigate to="/profile" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Route>
  </Routes></AppProvider></AuthProvider></BrowserRouter>;
}
