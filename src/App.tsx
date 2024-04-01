import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Spacer } from "./Spacer.tsx";

const strategicGoals = {
  "Wir digitalisieren die Lufttechnik": null,
  "Wir stärken fortlaufend unsere Technologieführerschaft mit Innovationen":
    null,
  "Wir begeistern unsere Kunden": null,
  "Wir fokussieren profitables Wachstum zum Ausbau unserer Marktführerschaft":
    null,
  "Wir sind als Arbeitgeber die erste Wahl": null,
  "Wir verfolgen eine Null-Emissions-Strategie": null,
};

const steps = ["Strategische Ziele", "Sonsige Bewertungskriterien"];

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [strategicGoalScores, setStategicGoalScores] = useState(strategicGoals);
  const strategicGoalsStep = Object.keys(strategicGoalScores).map((goal) => (
    <React.Fragment key={goal}>
      <Box>
        <Typography variant="h5">{goal}</Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={
                strategicGoalScores[
                  goal as keyof typeof strategicGoalScores
                ] === star
                  ? "contained"
                  : "outlined"
              }
              onClick={() => {
                setStategicGoalScores((prev) => ({
                  ...prev,
                  [goal]: star,
                }));
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer />
      <Spacer />
      <Spacer />
    </React.Fragment>
  ));

  const [confidenceScore, setConfidenceScore] = useState<number | undefined>();
  const confidenceStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">
          Confidence zum Beitrag zur Erreichung der Kommunikationsziele
        </Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={confidenceScore === star ? "contained" : "outlined"}
              onClick={() => {
                setConfidenceScore(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer />
      <Spacer />
      <Spacer />
    </React.Fragment>
  );

  const [targetAudiences, setTargetAudiences] = useState<string[]>([]);
  const targetAudienceRelevanceStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Zielgruppenrelevanz</Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[
            "Führungskräfte",
            "Mitarbeiter (Blue Collar)",
            "Mitarbeitende (White Collar)",
            "Kunden",
            "Allg. Öffentlichkeit/Community",
          ].map((audience) => (
            <Button
              key={audience}
              variant={
                targetAudiences.includes(audience) ? "contained" : "outlined"
              }
              onClick={() => {
                setTargetAudiences((prev) =>
                  prev.includes(audience)
                    ? prev.filter(
                        (currentAudience) => currentAudience !== audience,
                      )
                    : [...prev, audience],
                );
              }}
            >
              {audience}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer />
      <Spacer />
      <Spacer />
    </React.Fragment>
  );

  const [globalRelevance, setGlobalRelevance] = useState<number | undefined>();
  const globalRelevanceStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Globale Relevanz</Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={globalRelevance === star ? "contained" : "outlined"}
              onClick={() => {
                setGlobalRelevance(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer />
      <Spacer />
      <Spacer />
    </React.Fragment>
  );

  const [urgency, setUrgency] = useState<number | undefined>();
  const urgencyStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Dringlichkeit</Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={urgency === star ? "contained" : "outlined"}
              onClick={() => {
                setUrgency(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer />
      <Spacer />
      <Spacer />
    </React.Fragment>
  );

  const [effort, setEffort] = useState<number | undefined>();
  const effortStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Aufwand</Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={effort === star ? "contained" : "outlined"}
              onClick={() => {
                setEffort(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer />
      <Spacer />
      <Spacer />
    </React.Fragment>
  );

  return (
    <>
      <Container>
        <Typography variant="h2">Newsroom Score Calculator</Typography>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        {activeStep === 0 && strategicGoalsStep}
        {activeStep > 0 && (
          <>
            {confidenceStep}
            {targetAudienceRelevanceStep}
            {globalRelevanceStep}
            {urgencyStep}
            {effortStep}
          </>
        )}

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleReset} sx={{ mr: 1 }}>
            Reset
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
          {activeStep !== steps.length &&
            (completed[activeStep] ? (
              <Typography variant="caption" sx={{ display: "inline-block" }}>
                Step {activeStep + 1} already completed
              </Typography>
            ) : (
              <Button onClick={handleComplete}>
                {completedSteps() === totalSteps() - 1
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            ))}
        </Box>
      </Container>
    </>
  );
}

export default App;
