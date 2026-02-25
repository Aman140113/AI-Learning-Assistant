import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DomainSelection from "./pages/DomainSelection";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import LearningPath from "./pages/LearningPath";
import Interview from "./pages/Interview";
import DailyTasks from "./pages/DailyTasks";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import ChatbotButton from "./components/ChatbotButton";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="skillspark-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/domain-selection" element={<DomainSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/daily-tasks" element={<DailyTasks />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ChatbotButton />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
