import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuizAnswers {
  homeType: string;
  lifestyle: string;
  experience: string;
  allergies: string;
  sizePreference: string;
  timeAvailable: string;
  livingSpace: string;
  children: string;
}

interface BreedMatch {
  name: string;
  image: string;
  compatibility: number;
  traits: string[];
  description: string;
  careLevel: 'Low' | 'Medium' | 'High';
  exerciseNeeds: 'Low' | 'Medium' | 'High';
  familyFriendly: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers }: { answers: QuizAnswers } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing quiz answers:', answers);

    const systemPrompt = `You are an expert dog breed consultant. Analyze the user's quiz answers and recommend the SINGLE best dog breed match.

Based on these quiz answers:
- Home Type: ${answers.homeType}
- Lifestyle: ${answers.lifestyle}
- Experience Level: ${answers.experience}
- Allergies: ${answers.allergies}
- Size Preference: ${answers.sizePreference}
- Time Available: ${answers.timeAvailable}
- Living Space: ${answers.livingSpace}
- Children: ${answers.children}

You must respond with ONLY valid JSON in this exact format:
{
  "name": "Breed Name",
  "image": "🐕",
  "compatibility": 95,
  "traits": ["trait1", "trait2", "trait3"],
  "description": "Detailed 2-3 sentence explanation of why this breed is perfect for the user based on their specific answers.",
  "careLevel": "Low|Medium|High",
  "exerciseNeeds": "Low|Medium|High",
  "familyFriendly": true|false
}

Consider these popular breeds but choose the absolute best match: Golden Retriever, French Bulldog, Border Collie, Poodle, Cavalier King Charles Spaniel, Australian Shepherd, Shih Tzu, Labrador Retriever, German Shepherd, Husky, Beagle, Boston Terrier.

The compatibility score should be 80-99 for a good match. Use appropriate dog emojis for the image field.`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please analyze these quiz answers and recommend the best dog breed: ${JSON.stringify(answers)}` }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const aiResponse = data.choices[0].message.content.trim();
    console.log('AI recommendation:', aiResponse);

    // Parse the JSON response
    let breedMatch: BreedMatch;
    try {
      breedMatch = JSON.parse(aiResponse);
      console.log('Parsed breed match:', breedMatch);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw AI response:', aiResponse);
      throw new Error('Invalid AI response format');
    }

    // Validate the response has required fields
    if (!breedMatch.name || !breedMatch.description || typeof breedMatch.compatibility !== 'number') {
      console.error('Invalid breed match structure:', breedMatch);
      throw new Error('AI response missing required fields');
    }

    return new Response(JSON.stringify({ 
      breedMatch,
      aiPrompt: systemPrompt,
      aiResponse: aiResponse 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-breed-matcher function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error',
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});