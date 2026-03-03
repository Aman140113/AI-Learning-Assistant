import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DomainSelection from "./pages/DomainSelection";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import LearningPath from "./pages/LearningPath";
import Interview from "./pages/Interview";
import DailyTasks from "./pages/DailyTasks";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Performance from "./pages/Performance";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ChatbotButton from "./components/ChatbotButton";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="skillspark-theme">
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/domain-selection" element={<DomainSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/daily-tasks" element={<DailyTasks />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotButton />
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
