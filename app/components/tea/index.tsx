'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

type Props = {
  tea: string;
  food: string;
  reason: string;
  howToMake: string;
  teaDescription: string;
  foodDescription: string;
}

export default function Tea({ tea, food, reason, howToMake, teaDescription, foodDescription }: Props) {
  return (
    <Card sx={{
      width: '100%', height: '100%', backgroundColor: 'tertiary.light', color: 'tertiary.dark'
    }} >
      <CardContent>
        <Stack direction="column" spacing={2} alignItems="flex-start" justifyContent="flex-start">
          <Typography variant="h5">{tea} + {food}</Typography>
          <Typography variant="body1">
            {reason}
          </Typography>

          <Box sx={{ width: '100%' }}>
            <Divider textAlign='left'>
              <Typography variant="body1">
                {tea}の特徴
              </Typography>
            </Divider>
            <Typography variant="body1">
              {teaDescription}
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Divider textAlign='left'>
              <Typography variant="body1">
                {food}の特徴
              </Typography>
            </Divider>
            <Typography variant="body1">
              {foodDescription}
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Divider textAlign='left'>
              <Typography variant="body1">
                淹れ方
              </Typography>
            </Divider>
            <Typography variant="body1">
              {howToMake}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
