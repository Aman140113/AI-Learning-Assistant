import { MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[450px] bg-background border shadow-xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex justify-between items-center bg-primary text-primary-foreground p-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Assistant
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 h-8 w-8 rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Body */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-muted/20">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-medium text-lg mb-2">How can I help you today?</h4>
            <p className="text-muted-foreground text-sm">
              Our AI chatbot feature is coming soon! You will be able to ask questions, verify skills, and get personalized learning recommendations.
            </p>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default ChatbotButton;
