'use client';

import { useCallback, useState } from 'react';
import { Constitution } from '@/app/type';

const steps = [
  // 平和質の質問
  {
    label: "スタート！",
    description: '顔色がよく、ツヤがある',
  },
  {
    label: "",
    description: '睡眠・食欲・排便は正常',
  },
  {
    label: "",
    description: '疲れにくく、風邪をひきにくい',
  },
  {
    label: "",
    description: '気分が安定している',
  },
  {
    label: "",
    description: '肌にトラブルが少ない',
  },
  // 気虚質の質問
  {
    label: "",
    description: '疲れやすい、だるい',
  },
  {
    label: "",
    description: '声が小さい、話すと疲れる',
  },
  {
    label: "",
    description: '息切れしやすい',
  },
  {
    label: "",
    description: '汗をかきやすい（特に動いた時）',
  },
  {
    label: "",
    description: '風邪をひきやすい',
  },
  // 陽虚質の質問
  {
    label: "",
    description: '手足や体が冷えやすい',
  },
  {
    label: "",
    description: '冬が苦手、寒がり',
  },
  {
    label: "",
    description: '顔色が青白い',
  },
  {
    label: "",
    description: '寒いと下痢しやすい',
  },
  {
    label: "",
    description: '朝起きるのがつらい',
  },
  // 陰虚質（潤い不足）の質問
  {
    label: "",
    description: '口や喉が乾きやすい',
  },
  {
    label: "",
    description: '手足がほてりやすい',
  },
  {
    label: "",
    description: '皮膚が乾燥しやすい',
  },
  {
    label: "",
    description: '寝汗をかく',
  },
  {
    label: "",
    description: '便が硬くなりがち',
  },
  // 血瘀質（血の巡りが悪い）の質問
  {
    label: "",
    description: '顔色がくすんでいる',
  },
  {
    label: "",
    description: '目の下にクマができやすい',
  },
  {
    label: "",
    description: '肩こりや頭痛が多い',
  },
  {
    label: "",
    description: '生理が遅れがち／塊がある',
  },
  {
    label: "",
    description: 'しみ・あざができやすい',
  },
  // 痰湿質（余分な水分がたまりやすい）の質問
  {
    label: "",
    description: '体が重だるい',
  },
  {
    label: "",
    description: 'むくみやすい',
  },
  {
    label: "",
    description: '胃もたれしやすい',
  },
  {
    label: "",
    description: '痰が多い',
  },
  {
    label: "",
    description: '湿気の多い日が苦手',
  },
  // 湿熱質（熱と湿がたまっている）の質問
  {
    label: "",
    description: '顔や体がベタつきやすい',
  },
  {
    label: "",
    description: '吹き出物ができやすい',
  },
  {
    label: "",
    description: '尿の色が濃い',
  },
  {
    label: "",
    description: '便がネバネバしやすい',
  },
  {
    label: "",
    description: '怒りっぽい／イライラしやすい',
  },
  // 気鬱質（ストレス体質）の質問
  {
    label: "",
    description: '気分が落ち込みやすい',
  },
  {
    label: "",
    description: 'ため息が多い',
  },
  {
    label: "",
    description: '胸がつかえるような感じがある',
  },
  {
    label: "",
    description: '寝つきが悪い',
  },
  {
    label: "",
    description: '生理前に気分が不安定になる',
  },
  // 特稟質（アレルギー体質）の質問
  {
    label: "",
    description: '花粉症やアレルギーがある',
  },
  {
    label: "",
    description: '皮膚が敏感・かぶれやすい',
  },
  {
    label: "",
    description: '季節の変わり目に体調を崩す',
  },
  {
    label: "",
    description: '特定の食べ物や薬に弱い',
  },
  {
    label: "最後の質問！",
    description: 'くしゃみ・鼻水が出やすい',
  },
];


export default function useConstitution() {
  const [rating, setRating] = useState<Record<number, number>>({
    // 平和質の質問
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    // 気虚質の質問
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    // 陽虚質の質問
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    // 陰虚質（潤い不足）の質問
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    // 血瘀質（血の巡りが悪い）の質問
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    // 痰湿質（余分な水分がたまりやすい）の質問
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0,
    // 湿熱質（熱と湿がたまっている）の質問
    31: 0,
    32: 0,
    33: 0,
    34: 0,
    35: 0,
    // 気鬱質（ストレス体質）の質問
    36: 0,
    37: 0,
    38: 0,
    39: 0,
    40: 0,
    // 特稟質（アレルギー体質）の質問
    41: 0,
    42: 0,
    43: 0,
    44: 0,
    45: 0,
  });

  const isValid = useCallback(() => {
    return Object.values(rating).every(value => value > 0);
  }, [rating]);

  const notAnsweredItem = useCallback(() => {
    return Object.entries(rating).filter(([key, value]) => value === 0).map(([key]) => parseInt(key));
  }, [rating]);

  const hasAnswered = useCallback((key: number) => {
    return rating[key] > 0;
  }, [rating]);

  const getResult = useCallback(() => {

    const heiwashitsu = [1, 2, 3, 4, 5];
    const kikyoshitsu = [6, 7, 8, 9, 10];
    const yokyo = [11, 12, 13, 14, 15];
    const inkyoshitsu = [16, 17, 18, 19, 20];
    const ketsuoshitsu = [21, 22, 23, 24, 25];
    const tanshitsu = [26, 27, 28, 29, 30];
    const shitsunetsushitsu = [31, 32, 33, 34, 35];
    const kiutsushitsu = [36, 37, 38, 39, 40];
    const tokurinshitsu = [41, 42, 43, 44, 45];

    const heiwashitsuPoint = heiwashitsu.reduce((sum, q) => sum + rating[q], 0);
    const kikyoshitsuPoint = kikyoshitsu.reduce((sum, q) => sum + rating[q], 0);
    const yokyoPoint = yokyo.reduce((sum, q) => sum + rating[q], 0);
    const inkyoshitsuPoint = inkyoshitsu.reduce((sum, q) => sum + rating[q], 0);
    const ketsuoshitsuPoint = ketsuoshitsu.reduce((sum, q) => sum + rating[q], 0);
    const tanshitsuPoint = tanshitsu.reduce((sum, q) => sum + rating[q], 0);
    const shitsunetsushitsuPoint = shitsunetsushitsu.reduce((sum, q) => sum + rating[q], 0);
    const kiutsushitsuPoint = kiutsushitsu.reduce((sum, q) => sum + rating[q], 0);
    const tokurinshitsuPoint = tokurinshitsu.reduce((sum, q) => sum + rating[q], 0);

    const taishitsuPoint: { name: Constitution; point: number }[] = [
      { name: "平和質", point: heiwashitsuPoint },
      { name: "気虚質", point: kikyoshitsuPoint },
      { name: "陽虚質", point: yokyoPoint },
      { name: "陰虚質", point: inkyoshitsuPoint },
      { name: "血瘀質", point: ketsuoshitsuPoint },
      { name: "痰湿質", point: tanshitsuPoint },
      { name: "湿熱質", point: shitsunetsushitsuPoint },
      { name: "気鬱質", point: kiutsushitsuPoint },
      { name: "特稟質", point: tokurinshitsuPoint },
    ];

    // 最も得点の高い体質を返す
    return taishitsuPoint.sort((a, b) => b.point - a.point)[0];
  }, [rating]);

  return {
    steps,
    rating,
    setRating,
    getResult,
    isValid,
    notAnsweredItem,
    hasAnswered
  }
}
