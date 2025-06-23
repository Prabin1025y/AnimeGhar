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

const parseTimeToSeconds = (hours: number, minutes: number, seconds: number, milliseconds: number) => {
  return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
};

export const parseVTT = (vttContent: string) => {
  const lines = vttContent.split('\n');
  const cues = [];
  let currentCue: { start: number; end: number; text: string; id?: string } | null = null;

  let expectingCueTime = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and header
    if (!line || line === 'WEBVTT') {
      continue;
    }

    // Skip comment blocks
    if (line.startsWith('NOTE')) {
      while (i < lines.length && lines[i].trim() !== '') {
        i++;
      }
      continue;
    }

    // Time match (ignore anything after timestamp like settings)
    const timeMatch = line.match(/^(\d{2}:)?(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}:)?(\d{2}):(\d{2})\.(\d{3})/);

    if (timeMatch) {
      if (currentCue) cues.push(currentCue);

      const startHours = timeMatch[1] ? parseInt(timeMatch[1].slice(0, -1)) : 0;
      const startMinutes = parseInt(timeMatch[2], 10);
      const startSeconds = parseInt(timeMatch[3], 10);
      const startMilliseconds = parseInt(timeMatch[4], 10);

      const endHours = timeMatch[5] ? parseInt(timeMatch[5].slice(0, -1)) : 0;
      const endMinutes = parseInt(timeMatch[6], 10);
      const endSeconds = parseInt(timeMatch[7], 10);
      const endMilliseconds = parseInt(timeMatch[8], 10);

      const start = parseTimeToSeconds(startHours, startMinutes, startSeconds, startMilliseconds);
      const end = parseTimeToSeconds(endHours, endMinutes, endSeconds, endMilliseconds);

      currentCue = {
        start,
        end,
        text: ''
      };
      expectingCueTime = false;
    } else if (!expectingCueTime && currentCue && line) {
      // Add text to current cue
      currentCue.text += (currentCue.text ? '\n' : '') + line;
    } else if (!expectingCueTime && !currentCue && line) {
      // Assume this is a cue identifier
      currentCue = { start: 0, end: 0, text: '', id: line };
      expectingCueTime = true;
    }
  }

  if (currentCue) {
    cues.push(currentCue);
  }

  return cues;
};
