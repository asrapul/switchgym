"use client";

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  videoUrl: string;
}

export default function VideoTutorialModal({
  isOpen,
  onClose,
  exerciseName,
  videoUrl,
}: VideoTutorialModalProps) {
  if (!isOpen) return null;

  // Extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url: string): string => {
    // Handle youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // Handle youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    // Handle youtube.com/embed/VIDEO_ID (already embedded format)
    if (url.includes("/embed/")) return url;

    // Return as-is if no match
    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl mx-4">
        {/* Header */}
        <div className="bg-[#1A1A1A] rounded-t-2xl p-4 flex items-center justify-between border-b border-[#2D2D2D]">
          <div>
            <p className="text-xs text-[#A3A3A3]">Tutorial Video</p>
            <h3 className="text-lg font-semibold text-white">{exerciseName}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center hover:bg-[#404040] transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Container */}
        <div className="bg-[#0A0A0A] rounded-b-2xl overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedUrl}
              title={`Tutorial: ${exerciseName}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
          <p className="text-sm text-[#A3A3A3]">
            💡 <span className="text-white font-medium">Tips:</span> Perhatikan form dan teknik yang benar. Mulai dengan beban ringan untuk menguasai gerakan.
          </p>
        </div>
      </div>
    </div>
  );
}
