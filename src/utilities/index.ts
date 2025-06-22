import { AnimeDetailsDataType } from "@/types"

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Ongoing":
      return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "Upcoming":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  }
}

export const removeDuplicateRelatedAnimes = (animes: AnimeDetailsDataType['relatedAnimes']) => {
  const uniqueRelatedAnimes = Array.from(
    new Map(
      animes.map((item: any) => [item.id, item])
    ).values()
  );
  return uniqueRelatedAnimes;
}

const parseTimeToSeconds = (hours: string, minutes: string, seconds: string, milliseconds: string) => {
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 1000;
  };

export const parseVTT = (vttContent:string) => {
    const lines = vttContent.split('\n');
    console.log(lines)
    const cues = [];
    let currentCue = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and WEBVTT header
      if (!line || line === 'WEBVTT') continue;
      
      // Check if line contains timestamp
      const timeMatch = line.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);
      
      if (timeMatch) {
        // If we have a previous cue, save it
        if (currentCue) {
          cues.push(currentCue);
        }
        
        // Create new cue
        const startTime = parseTimeToSeconds(timeMatch[1], timeMatch[2], timeMatch[3], timeMatch[4]);
        const endTime = parseTimeToSeconds(timeMatch[5], timeMatch[6], timeMatch[7], timeMatch[8]);
        
        currentCue = {
          start: startTime,
          end: endTime,
          text: ''
        };
      } else if (currentCue && line) {
        // Add text to current cue
        currentCue.text += (currentCue.text ? ' ' : '') + line;
      }
    }
    
    // Add the last cue
    if (currentCue) {
      cues.push(currentCue);
    }
    
    return cues;
  };