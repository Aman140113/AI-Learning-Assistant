import Navbar from "@/components/Navbar";
import RoadmapItem from "@/components/RoadmapItem";
import { learningPath } from "@/data/dummyData";
import { Map } from "lucide-react";

const LearningPath = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-10 animate-slide-up">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Map className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Your Learning Path
          </h1>
          <p className="text-muted-foreground">
            Personalized roadmap based on your performance
          </p>
        </div>

        <div className="animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
          {learningPath.map((item, index) => (
            <RoadmapItem
              key={item.week}
              {...item}
              isLast={index === learningPath.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
