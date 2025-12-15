import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import Index from "./pages/Index";
import WelcomeScreen from "./pages/WelcomeScreen";
import StoryScreen from "./pages/StoryScreen";
import QuestMapScreen from "./pages/QuestMapScreen";
import HomeScreen from "./pages/HomeScreen";
import AdventureScreen from "./pages/AdventureScreen";
import ShopScreen from "./pages/ShopScreen";
import SettingsScreen from "./pages/SettingsScreen";
import FinalStoryScreen from "./pages/FinalStoryScreen";
import JourneyCompleteScreen from "./pages/JourneyCompleteScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/story" element={<StoryScreen />} />
            <Route path="/quest-map" element={<QuestMapScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/adventure" element={<AdventureScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/final-story" element={<FinalStoryScreen />} />
            <Route path="/journey-complete" element={<JourneyCompleteScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
