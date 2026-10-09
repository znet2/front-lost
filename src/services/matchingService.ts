import { Item, MatchingResult } from '../types';

// Simple text similarity calculation (Jaccard similarity)
const calculateTextSimilarity = (text1: string, text2: string): number => {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? (intersection.size / union.size) * 100 : 0;
};

// Calculate date/time proximity (in days)
const calculateDateProximity = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffDays = Math.abs((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
  
  // Score: 100% if same day, decreases with each day difference
  if (diffDays === 0) return 100;
  if (diffDays <= 1) return 80;
  if (diffDays <= 3) return 60;
  if (diffDays <= 7) return 40;
  return 20;
};

// Calculate location similarity
const calculateLocationSimilarity = (loc1: string, loc2: string): number => {
  const words1 = loc1.toLowerCase().split(/\s+/);
  const words2 = loc2.toLowerCase().split(/\s+/);
  
  let matchCount = 0;
  for (const word of words1) {
    if (words2.some(w => w.includes(word) || word.includes(w))) {
      matchCount++;
    }
  }
  
  return (matchCount / Math.max(words1.length, words2.length)) * 100;
};

// Main matching function
export const findMatches = (lostItem: Item, foundItems: Item[]): MatchingResult[] => {
  const matches: MatchingResult[] = [];
  
  for (const foundItem of foundItems) {
    // Calculate individual scores
    const textSimilarity = calculateTextSimilarity(
      `${lostItem.title} ${lostItem.description}`,
      `${foundItem.title} ${foundItem.description}`
    );
    
    const categoryScore = lostItem.category === foundItem.category ? 100 : 0;
    
    const dateTimeScore = calculateDateProximity(lostItem.date, foundItem.date);
    
    const locationScore = calculateLocationSimilarity(lostItem.location, foundItem.location);
    
    // Image matching (mock - just check if both have images)
    const imageScore = (lostItem.images.length > 0 && foundItem.images.length > 0) ? 50 : 0;
    
    // Calculate weighted overall score
    const overallScore = Math.round(
      textSimilarity * 0.3 +
      categoryScore * 0.25 +
      dateTimeScore * 0.2 +
      locationScore * 0.15 +
      imageScore * 0.1
    );
    
    // Only include matches above threshold
    if (overallScore >= 40) {
      matches.push({
        id: `match-${lostItem.id}-${foundItem.id}`,
        lostItemId: lostItem.id,
        foundItemId: foundItem.id,
        score: overallScore,
        breakdown: {
          textSimilarity: Math.round(textSimilarity),
          category: categoryScore,
          dateTime: Math.round(dateTimeScore),
          location: Math.round(locationScore),
          image: imageScore
        },
        createdAt: new Date().toISOString()
      });
    }
  }
  
  // Sort by score (highest first)
  return matches.sort((a, b) => b.score - a.score);
};

// Find all matches for a user's lost items
export const findAllMatchesForUser = (
  lostItems: Item[],
  foundItems: Item[]
): MatchingResult[] => {
  const allMatches: MatchingResult[] = [];
  
  for (const lostItem of lostItems) {
    const matches = findMatches(lostItem, foundItems);
    allMatches.push(...matches);
  }
  
  return allMatches.sort((a, b) => b.score - a.score);
};

// Get color name for score
export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-emerald-600';
  if (score >= 40) return 'text-amber-600';
  return 'text-slate-600';
};

// Get score background color
export const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-emerald-100';
  if (score >= 40) return 'bg-amber-100';
  return 'bg-slate-100';
};

// Get score label
export const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'ตรงกันมาก';
  if (score >= 60) return 'ค่อนข้างตรงกัน';
  if (score >= 40) return 'อาจตรงกัน';
  return 'ตรงกันน้อย';
};
