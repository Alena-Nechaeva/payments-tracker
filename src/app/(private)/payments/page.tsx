'use client';

import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowIcon from '@/src/assets/icons/arrow';
import { months } from '@/src/assets/months';
import { PaymentForm } from '@/src/shared/paymentForm';
import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentMonth } from '@/src/store/store.slice';

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (month: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? month : false);

    if (isExpanded) dispatch(setCurrentMonth(month));
    else dispatch(setCurrentMonth(null));
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Typography variant='h5'>Insert payments data</Typography>
          </Grid>

          <Grid size={12}>
            {months.map(month => {
              return (
                <Accordion key={month} expanded={expanded === month} onChange={handleChange(month)}>
                  <AccordionSummary expandIcon={<ArrowIcon />}>
                    <Typography className='gradient-text' variant={'h5'} fontWeight={600}>
                      {month}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PaymentForm />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
