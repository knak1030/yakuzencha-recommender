'use client';

import { Step, Button, Stepper, StepContent, StepLabel, Box, Paper, Typography, Link, Stack, Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import useConstitution from './useConstitution';
import { Constitution } from '@/app/type';

type Props = {
  skipToAge: () => void;
  setConstitution: (constitution: Constitution) => void;
}

export default function ConstitutionTab({ skipToAge, setConstitution }: Props) {
  const { steps, rating, setRating, getResult, isValid, notAnsweredItem } = useConstitution();
  const [activeStep, setActiveStep] = useState(0);
  const [constitutionResult, setConstitutionResult] = useState<string | null>(null);

  const scrollToStep = (step: number) => {
    const element = document.getElementById(`constitution-step-${step}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToStepper = () => {
    const element = document.getElementById('constitution-stepper');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToResult = () => {
    const element = document.getElementById('constitution-result');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (isValid()) {
      const result = getResult();
      console.log('is valid Constitution Result:', result);
      setConstitutionResult(result.name);
      setConstitution(result.name);
      scrollToResult();
      return;
    }

    if (activeStep >= steps.length) {
      if (!isValid()) {
        const notAnswered = notAnsweredItem();
        setActiveStep(notAnswered[0] - 1); // 最初の未回答項目に送る
        scrollToStep(notAnswered[0]);
        return;
      }
    }
  }, [activeStep, steps, isValid, getResult, notAnsweredItem, setConstitution]);

  const handleNext = () => {
    scrollToStep(activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Stack spacing={6} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <Typography align="center">
          まずは体質を判定しましょう。<br />
          すでに自分の体質を知っている人は、<Link sx={{ cursor: 'pointer' }} type="button" onClick={skipToAge}>スキップ</Link>
        </Typography>
        <Link type="button" href="#constitution-start" sx={{ cursor: 'pointer' }}>
          <ArrowCircleDownIcon />
        </Link>
      </Stack>

      <Stack id="constitution-start" spacing={1} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <Typography align="center">
          各質問に対して、以下の5段階でご回答ください。<br />
        </Typography>
        <Typography align="right">
          ほとんどない：<Rating size="small" name="read-only" value={1} readOnly /><br />
          時々ある：<Rating size="small" name="read-only" value={2} readOnly /><br />
          ときどき感じる：<Rating size="small" name="read-only" value={3} readOnly /><br />
          よくある：<Rating size="small" name="read-only" value={4} readOnly /><br />
          非常にあてはまる：<Rating size="small" name="read-only" value={5} readOnly />
        </Typography>
        <Box sx={{ pt: 4 }}>
          <Link type="button" onClick={scrollToStepper} sx={{ cursor: 'pointer' }}>
            <ArrowCircleDownIcon />
          </Link>
        </Box>
      </Stack>

      <Paper elevation={3} id="constitution-stepper" sx={{ height: '100%', m: 5, overflowY: 'auto' }}>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '380px', margin: '0 auto', py: 5, }}>
          {steps.map((step, index) => (
            <Step key={index} sx={{ width: '100%' }} id={`constitution-step-${index}`}>
              <StepLabel
                slotProps={{
                  stepIcon: {
                    onClick: () => {
                      setActiveStep(index);
                    },
                    completed: rating[index + 1] > 0,
                  },
                }}
              >
                {step.label}
              </StepLabel>
              <StepContent sx={{ width: '100%' }}>
                <Typography>{step.description}</Typography>
                <Stack direction="column" alignItems={'flex-start'} spacing={2} sx={{ mt: 2 }}>
                  <Rating
                    value={rating[index + 1]}
                    onChange={(event, newValue) => {
                      setRating({ ...rating, [index + 1]: newValue || 0 });
                      handleNext();
                    }}
                  />
                </Stack>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Stack id="constitution-result" spacing={2} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <Typography align="center">
          あなたの体質
        </Typography>
        {constitutionResult ?
          <Typography variant="h4">{constitutionResult}</Typography> : <Typography variant="caption">体質判定の結果がここに表示されます。</Typography>}
        <Box sx={{ pt: 4 }}>
          <Button variant="text" color="primary" onClick={skipToAge}>
            <ArrowCircleDownIcon />
          </Button>
        </Box>
      </Stack>

    </Box>

  );
}
