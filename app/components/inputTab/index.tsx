'use client';

import { Button, FormControl, Select, TextField, InputLabel, MenuItem, Stack, FormHelperText } from '@mui/material';
import { useState } from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { TeaRecommendation, Constitution } from '@/app/type';

type Props = {
  goToResultTab: () => void;
  resetResult: () => void;
  updateResult: (result: TeaRecommendation[]) => void;
  defaultConstitution: Constitution; // オプションで初期値を設定可能
}

export default function InputTab({ goToResultTab, resetResult, updateResult, defaultConstitution }: Props) {
  const [constitution, setConstitution] = useState<Constitution>(defaultConstitution);
  const [symptoms, setSymptoms] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const getRecommendation = async () => {
    if (!constitution || !age) {
      alert('体質と年齢は必須です。');
      return;
    }

    goToResultTab();
    resetResult();

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          constitution,
          symptoms,
          age,
        }),
      });

      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }

      const data = await response.json();
      updateResult(data.response);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: 'calc(100% - 6rem)', px: 6 }}>
      <FormControl fullWidth>
        <InputLabel id="form-constitution">体質</InputLabel>
        <Select
          labelId="form-constitution"
          id="constitution-select"
          value={constitution}
          label="体質"
          onChange={(e) => setConstitution(e.target.value)}
        >
          <MenuItem value={"平和質"}>平和（へいわ）体質</MenuItem>
          <MenuItem value={"気虚質"}>気虚（ききょ）体質</MenuItem>
          <MenuItem value={"陽虚質"}>陽虚（ようきょ）体質</MenuItem>
          <MenuItem value={"陰虚質"}>陰虚（いんきょ）体質</MenuItem>
          <MenuItem value={"血瘀質"}>血瘀（けつお）体質</MenuItem>
          <MenuItem value={"痰湿質"}>痰湿（たんしつ）体質</MenuItem>
          <MenuItem value={"湿熱質"}>湿熱（しつねつ）体質</MenuItem>
          <MenuItem value={"気鬱質"}>気鬱（きうつ）体質</MenuItem>
          <MenuItem value={"特稟質"}>特稟（とくりん）体質</MenuItem>
        </Select>
        <FormHelperText>体質結果が入力されます</FormHelperText>
      </FormControl>
      <FormControl fullWidth >
        <TextField
          id="age-input"
          value={age}
          type="number"
          label="年齢"
          helperText="年齢を入力してください"
          onChange={(e) => setAge(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          type="text"
          label="お悩みの症状"
          helperText="お悩みの症状があれば入力してください"
          id="symptoms-input"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          multiline
          rows={4}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={getRecommendation}>
        おすすめの薬膳茶をみる
        <ArrowCircleDownIcon sx={{ ml: 1 }} />
      </Button>
    </Stack>
  );
}
