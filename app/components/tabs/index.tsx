'use client';

import { Tab, Tabs as MuiTabs } from '@mui/material';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import { TabKey } from '@/app/type';

function a11yProps(index: TabKey) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

type Props = {
  handleChangeTab: (event: React.SyntheticEvent, newValue: TabKey) => void;
  tab: TabKey;
  hasResult?: boolean;
}

export default function Tabs({ handleChangeTab, tab, hasResult }: Props) {
  return (
    <MuiTabs
      orientation="vertical"
      value={tab}
      onChange={handleChangeTab}
      aria-label="Vertical tabs"
      sx={{
        borderRight: 1, borderColor: "divider", '& .MuiTabs-scroller': {
          display: 'flex',
        },
      }}
      centered={true}
    >
      <Tab label={<ModeStandbyIcon />} {...a11yProps(0)} />
      <Tab label="体質" {...a11yProps(1)} />
      <Tab label="入力" {...a11yProps(2)} />
      <Tab disabled={!hasResult} label={<FreeBreakfastIcon />} {...a11yProps(3)} />
    </MuiTabs>
  )
}