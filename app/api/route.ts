import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import data from "./data.json";
import { TeaRecommendation } from "../type";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.constitution === undefined) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const ingredients = JSON.stringify(data);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `あなたは「おいしく、賢く、楽しく、健康に」をモットーとした管理栄養士・国際中医師・国際中医薬膳管理師。以下に提供される情報にを元に、薬膳茶を調合。お茶と薬膳食材は${ingredients}から一つずつ選定。現時点の季節や気候も加味すること。ベースのお茶（tea）、その特徴（teaDescription）、薬膳食材（food）、その特徴（foodDescription）、選定理由（reason）、おすすめの淹れ方（howToMake）を2パターン出力。\n
  年齢: ${body.age}\n
  体質: ${body.constitution}\n
  悩み: ${body.symptoms}`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            tea: {
              type: Type.STRING,
            },
            food: {
              type: Type.STRING,
            },
            reason: {
              type: Type.STRING,
            },
            howToMake: {
              type: Type.STRING,
            },
            teaDescription: {
              type: Type.STRING,
            },
            foodDescription: {
              type: Type.STRING,
            },
          },
        },
      },
    },
  });

  if (!response.text) {
    return NextResponse.json({ error: "No response from AI" }, { status: 500 });
  }
  console.log(response.text);
  const responseToJson = JSON.parse(response.text) as TeaRecommendation[];

  return NextResponse.json({ response: responseToJson });
}
