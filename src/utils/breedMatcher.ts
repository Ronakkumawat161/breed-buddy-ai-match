import { QuizAnswers } from "@/components/QuizModal";

export interface BreedMatch {
  name: string;
  image: string;
  compatibility: number;
  traits: string[];
  description: string;
  careLevel: 'Low' | 'Medium' | 'High';
  exerciseNeeds: 'Low' | 'Medium' | 'High';
  familyFriendly: boolean;
}

const dogBreeds: BreedMatch[] = [
  {
    name: "Golden Retriever",
    image: "🐕‍🦺",
    compatibility: 0,
    traits: ["Friendly", "Intelligent", "Family-oriented"],
    description: "Golden Retrievers are perfect for families with their gentle nature and high intelligence. They're excellent with children and adapt well to various living situations.",
    careLevel: "Medium",
    exerciseNeeds: "High",
    familyFriendly: true
  },
  {
    name: "French Bulldog",
    image: "🐶",
    compatibility: 0,
    traits: ["Calm", "Apartment-friendly", "Low maintenance"],
    description: "French Bulldogs are ideal for apartment living with their calm demeanor and minimal exercise needs. They're perfect companions for a relaxed lifestyle.",
    careLevel: "Low",
    exerciseNeeds: "Low",
    familyFriendly: true
  },
  {
    name: "Border Collie",
    image: "🐕",
    compatibility: 0,
    traits: ["Highly intelligent", "Active", "Loyal"],
    description: "Border Collies are perfect for active owners who enjoy outdoor activities. They're incredibly smart and need mental stimulation to thrive.",
    careLevel: "High",
    exerciseNeeds: "High",
    familyFriendly: true
  },
  {
    name: "Poodle",
    image: "🐩",
    compatibility: 0,
    traits: ["Hypoallergenic", "Intelligent", "Adaptable"],
    description: "Poodles are excellent for people with allergies and come in various sizes. They're highly trainable and adapt well to different lifestyles.",
    careLevel: "Medium",
    exerciseNeeds: "Medium",
    familyFriendly: true
  },
  {
    name: "Cavalier King Charles Spaniel",
    image: "🐕",
    compatibility: 0,
    traits: ["Gentle", "Small", "Loving"],
    description: "These gentle spaniels are perfect for first-time owners who want a loving, manageable companion that's great with children.",
    careLevel: "Low",
    exerciseNeeds: "Low",
    familyFriendly: true
  },
  {
    name: "Australian Shepherd",
    image: "🐕‍🦺",
    compatibility: 0,
    traits: ["Active", "Intelligent", "Loyal"],
    description: "Australian Shepherds are perfect for active families with large spaces. They're incredibly loyal and excel at outdoor activities.",
    careLevel: "High",
    exerciseNeeds: "High",
    familyFriendly: true
  },
  {
    name: "Shih Tzu",
    image: "🐶",
    compatibility: 0,
    traits: ["Small", "Calm", "Indoor-friendly"],
    description: "Shih Tzus are perfect for apartment living and those who prefer a calm, indoor-oriented companion with minimal exercise needs.",
    careLevel: "Medium",
    exerciseNeeds: "Low",
    familyFriendly: true
  },
  {
    name: "Labrador Retriever",
    image: "🐕‍🦺",
    compatibility: 0,
    traits: ["Family-friendly", "Active", "Easy to train"],
    description: "Labradors are the ultimate family dog with their friendly nature, high energy, and excellent trainability. Perfect for active households.",
    careLevel: "Medium",
    exerciseNeeds: "High",
    familyFriendly: true
  }
];

export function findBestBreedMatch(answers: QuizAnswers): BreedMatch {
  // Calculate compatibility scores for each breed
  const scoredBreeds = dogBreeds.map(breed => {
    let score = 0;
    
    // Home type scoring
    if (answers.homeType === 'apartment') {
      if (['French Bulldog', 'Shih Tzu', 'Cavalier King Charles Spaniel'].includes(breed.name)) score += 25;
      if (['Poodle'].includes(breed.name)) score += 20;
    } else if (answers.homeType === 'house') {
      if (['Golden Retriever', 'Labrador Retriever', 'Poodle'].includes(breed.name)) score += 25;
      if (['Cavalier King Charles Spaniel'].includes(breed.name)) score += 20;
    } else if (answers.homeType === 'farm') {
      if (['Border Collie', 'Australian Shepherd'].includes(breed.name)) score += 25;
      if (['Golden Retriever', 'Labrador Retriever'].includes(breed.name)) score += 20;
    }
    
    // Lifestyle scoring
    if (answers.lifestyle === 'calm') {
      if (['French Bulldog', 'Shih Tzu', 'Cavalier King Charles Spaniel'].includes(breed.name)) score += 25;
    } else if (answers.lifestyle === 'moderate') {
      if (['Golden Retriever', 'Poodle', 'Labrador Retriever'].includes(breed.name)) score += 25;
    } else if (answers.lifestyle === 'active') {
      if (['Border Collie', 'Australian Shepherd', 'Labrador Retriever'].includes(breed.name)) score += 25;
    }
    
    // Experience level scoring
    if (answers.experience === 'none') {
      if (['Cavalier King Charles Spaniel', 'French Bulldog', 'Golden Retriever'].includes(breed.name)) score += 20;
    } else if (answers.experience === 'basic') {
      if (['Golden Retriever', 'Labrador Retriever', 'Poodle'].includes(breed.name)) score += 20;
    } else if (answers.experience === 'confident') {
      if (['Border Collie', 'Australian Shepherd'].includes(breed.name)) score += 20;
    }
    
    // Allergies scoring
    if (answers.allergies === 'yes') {
      if (['Poodle'].includes(breed.name)) score += 30;
    }
    
    // Size preference scoring
    if (answers.sizePreference === 'small') {
      if (['French Bulldog', 'Shih Tzu', 'Cavalier King Charles Spaniel'].includes(breed.name)) score += 25;
    } else if (answers.sizePreference === 'medium') {
      if (['Poodle', 'Border Collie'].includes(breed.name)) score += 25;
    } else if (answers.sizePreference === 'large') {
      if (['Golden Retriever', 'Labrador Retriever', 'Australian Shepherd'].includes(breed.name)) score += 25;
    }
    
    // Time available scoring
    if (answers.timeAvailable === 'low') {
      if (['French Bulldog', 'Shih Tzu', 'Cavalier King Charles Spaniel'].includes(breed.name)) score += 20;
    } else if (answers.timeAvailable === 'medium') {
      if (['Golden Retriever', 'Poodle', 'Labrador Retriever'].includes(breed.name)) score += 20;
    } else if (answers.timeAvailable === 'high') {
      if (['Border Collie', 'Australian Shepherd'].includes(breed.name)) score += 20;
    }
    
    // Children scoring
    if (answers.children === 'yes') {
      if (breed.familyFriendly) score += 15;
      if (['Golden Retriever', 'Labrador Retriever', 'Cavalier King Charles Spaniel'].includes(breed.name)) score += 10;
    }
    
    return { ...breed, compatibility: score };
  });
  
  // Sort by compatibility score and return the best match
  const bestMatch = scoredBreeds.sort((a, b) => b.compatibility - a.compatibility)[0];
  return bestMatch;
}