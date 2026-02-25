import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Mic, Video, ArrowLeft, PhoneOff, MicOff, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type InterviewType = "select" | "video" | "voice";

const Interview = () => {
    const [type, setType] = useState<InterviewType>("select");
    const [isMuted, setIsMuted] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);

    const stopMedia = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const startMedia = async (requestVideo: boolean) => {
        setErrorMsg("");
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: requestVideo,
                audio: true,
            });
            setStream(mediaStream);
            if (requestVideo && videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing media devices.", err);
            setErrorMsg("Could not access camera/microphone. Please check permissions.");
        }
    };

    // Handle type change
    const handleSelectType = (newType: InterviewType) => {
        setType(newType);
        if (newType === "video") {
            startMedia(true);
        } else if (newType === "voice") {
            startMedia(false);
        }
    };

    const handleEndCall = () => {
        stopMedia();
        setType("select");
        setIsMuted(false);
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !nextMuted;
            });
        }
    };

    // Attach stream to video tag if it becomes available (for React lifecycle)
    useEffect(() => {
        if (type === "video" && videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, type]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopMedia();
        };
    }, [stream]);

    // Example messages for the transcript
    const transcript = [
        { sender: "AI", name: "Robin", time: "7:53 AM", text: "Hello Connor, I'm Robin, and I will be conducting your interview. I hope you are doing well. Let's begin the interview. This is for the position of Oncology Position at Mayo Clinic." },
        { sender: "User", name: "Connor", time: "7:53 AM", text: "okay great" },
        { sender: "AI", name: "Robin", time: "7:53 AM", text: "Can you describe a time when you had to overcome a significant objection from a potential client? What was your approach?" },
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-6xl pb-16 h-full flex flex-col">
                {type === "select" && (
                    <div className="flex flex-col items-center justify-center flex-1 animate-slide-up">
                        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
                            Take your Mock Interview
                        </h1>
                        <p className="text-muted-foreground text-lg mb-12 text-center max-w-lg">
                            Practice your skills in a simulated environment. Choose the type of interview you'd like to take today.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                            {/* Voice Option */}
                            <button
                                onClick={() => handleSelectType("voice")}
                                className="group flex flex-col items-center p-10 rounded-3xl glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/50 text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                    <Mic className="w-12 h-12" />
                                </div>
                                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Voice Based</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Focus on your verbal communication and quick thinking. Perfect for technical phone screens and HR rounds.
                                </p>
                            </button>

                            {/* Video Option */}
                            <button
                                onClick={() => handleSelectType("video")}
                                className="group flex flex-col items-center p-10 rounded-3xl glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-accent/50 text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                    <Video className="w-12 h-12" />
                                </div>
                                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Video Based</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Practice your body language, eye contact, and presence. Simulates a real face-to-face remote interview.
                                </p>
                            </button>
                        </div>
                    </div>
                )}

                {/* Video Based UI */}
                {type === "video" && (
                    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <Button variant="ghost" className="gap-2" onClick={handleEndCall}>
                                <ArrowLeft className="w-4 h-4" /> Back
                            </Button>
                            <h2 className="font-heading font-bold text-xl">Interview Details</h2>
                            <div className="w-20"></div> {/* Spacer */}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
                            {/* Video Feed (Left 3 columns) */}
                            <div className="lg:col-span-3 rounded-2xl overflow-hidden bg-black relative flex flex-col border border-border">
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-semibold text-white z-10">
                                    Connor (You)
                                </div>
                                {/* Video Feed or Error/Loading Placeholder */}
                                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/20 via-black to-black relative">
                                    {errorMsg ? (
                                        <div className="text-center p-6 text-destructive">
                                            <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p className="font-medium">{errorMsg}</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Actual Video Element */}
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className={`absolute inset-0 w-full h-full object-cover ${stream ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                            {/* Pulse overlay while loading stream */}
                                            {!stream && (
                                                <div className="flex flex-col items-center z-10 relative">
                                                    <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse mb-6 relative">
                                                        <Video className="w-12 h-12 text-primary/50" />
                                                        <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
                                                    </div>
                                                    <p className="text-sm font-medium">Requesting camera access...</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Controls */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <Button
                                        variant="outline"
                                        onClick={toggleMute}
                                        className={`rounded-full w-12 h-12 p-0 border-white/20 hover:bg-white/10 ${isMuted ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive' : 'bg-transparent text-white'}`}
                                    >
                                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </Button>
                                    <Button variant="destructive" className="rounded-full px-6 h-12 font-semibold" onClick={handleEndCall}>
                                        <PhoneOff className="w-5 h-5 mr-2" /> End Call
                                    </Button>
                                    <Button variant="outline" className="rounded-full w-12 h-12 p-0 bg-transparent text-white border-white/20 hover:bg-white/10">
                                        <Settings className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Transcript (Right 2 columns) */}
                            <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col border border-border">
                                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    <h3 className="font-heading font-semibold text-lg text-primary">AI transcript</h3>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-2">
                                    {transcript.map((msg, i) => (
                                        <div key={i} className={`flex flex-col ${msg.sender === "User" ? "items-start" : "items-end"}`}>
                                            <div className={`flex items-center gap-2 mb-1.5 ${msg.sender === "User" ? "flex-row" : "flex-row-reverse"}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.sender === "AI" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                                                    {msg.sender === "AI" ? <Sparkles className="w-4 h-4" /> : "CO"}
                                                </div>
                                                <span className="text-sm font-semibold">{msg.name}</span>
                                                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                                            </div>
                                            <div className={`px-4 py-3 text-sm max-w-[85%] ${msg.sender === "AI"
                                                ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                                                : "bg-muted text-foreground rounded-2xl rounded-tl-sm border border-border/50"
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Voice Based UI */}
                {type === "voice" && (
                    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex items-center mb-6">
                            <Button variant="ghost" className="gap-2" onClick={handleEndCall}>
                                <ArrowLeft className="w-4 h-4" /> Back
                            </Button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative">

                            {/* Voice Visualizer */}
                            <div className="relative flex items-center justify-center mb-16">
                                {/* Decorative background ripples */}
                                <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute w-64 h-64 border border-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute w-80 h-80 border border-primary/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>

                                {/* Central Avatar */}
                                <div className="relative w-40 h-40 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-[0_0_50px_hsl(var(--primary)/0.5)] z-10 border-4 border-background">
                                    <div className="flex flex-col items-center">
                                        <Sparkles className="w-12 h-12 text-white mb-2" />
                                        <span className="text-white font-bold font-heading">AI</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Robin (Interviewer)</h2>
                            {errorMsg ? (
                                <p className="text-destructive font-medium flex items-center gap-2 mb-12">
                                    {errorMsg}
                                </p>
                            ) : (
                                <p className="text-primary font-medium flex items-center gap-2 mb-12">
                                    <span className={`w-2 h-2 rounded-full bg-primary ${stream ? 'animate-pulse' : ''}`}></span>
                                    {stream ? "Listening to you..." : "Requesting microphone..."}
                                </p>
                            )}

                            {/* Controls */}
                            <div className="flex items-center gap-6 glass-card px-8 py-5 rounded-[2rem]">
                                <Button
                                    variant="outline"
                                    onClick={toggleMute}
                                    className={`rounded-full w-14 h-14 p-0 ${isMuted ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive' : 'bg-muted hover:bg-muted/80'}`}
                                >
                                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                </Button>
                                <Button variant="destructive" className="rounded-full px-8 h-14 font-semibold text-lg" onClick={handleEndCall}>
                                    <PhoneOff className="w-6 h-6 mr-3" /> End Interview
                                </Button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Interview;
