'use client';

import { Container, Button, Box, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import TabPanel from '@/app/components/tabPanel';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ConstitutionTab from '@/app/components/constitutionTab';
import BlinkTypography from '@/app/components/atoms/blinkTypography';
import Tea from '@/app/components/tea';
import { TeaRecommendation, TabKey, Constitution } from './type';
import InputTab from '@/app/components/inputTab';
import Tabs from '@/app/components/tabs';

export default function Home() {
  const [result, setResult] = useState<TeaRecommendation[]>([]);
  const [tab, setTab] = useState<TabKey>(0);
  const [constitution, setConstitution] = useState<Constitution>("平和質");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabKey) => {
    setTab(newValue);
  };

  const skipToAge = () => {
    setTab(2);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          minHeight: 224,
          height: '100vh'
        }}
      >
        <Tabs
          tab={tab}
          handleChangeTab={handleChangeTab}
          hasResult={result.length > 0}
        />

        <TabPanel value={tab} index={0}>
          <Typography variant="h4">かんたん薬膳茶のすすめ</Typography>

          <Typography align="center" sx={{ py: 5 }}>
            あなたに合わせたお茶と薬膳食材を組み合わせた薬膳茶のレシピを提案します。<br />
          </Typography>
          <Button variant="text" color="primary" onClick={() => setTab(1)}>
            <ArrowCircleDownIcon />
          </Button>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <ConstitutionTab skipToAge={skipToAge} setConstitution={setConstitution} />
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <InputTab
            goToResultTab={() => setTab(3)}
            resetResult={() => setResult([])}
            updateResult={(newResult: TeaRecommendation[]) => setResult(newResult)}
            defaultConstitution={constitution}
          />
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <Typography variant="h4">おすすめ薬膳茶</Typography>

          {result.length === 0 && (
            <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: 'calc(100% - 6rem)', px: 6 }}>
              <BlinkTypography align="center">
                おすすめの薬膳茶を選定中...
              </BlinkTypography>
            </Stack>
          )}
          <Stack spacing={2} alignItems="center" justifyContent="center" direction="row">
            {result.map((item: TeaRecommendation, index: number) => (
              <Tea
                key={index}
                tea={item.tea}
                food={item.food}
                reason={item.reason}
                howToMake={item.howToMake}
                teaDescription={item.teaDescription}
                foodDescription={item.foodDescription}
              />
            ))}
          </Stack>
        </TabPanel>
      </Box>
    </Container>
  );
}
