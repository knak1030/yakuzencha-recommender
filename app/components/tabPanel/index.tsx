'use client';

import * as React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { TabKey } from '@/app/type';

interface TabPanelProps {
  children?: React.ReactNode;
  index: TabKey;
  value: TabKey;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%', height: '100%' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 3, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%', overflowY: 'auto', scrollBehavior: 'smooth' }}>
            {children}
          </Stack>
        </Box>
      )}
    </div>
  );
}
