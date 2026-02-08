"use client";

import { useCallback, useState } from "react";

interface UseDailyWorkshopConfigSelectionInput {
  initialConfigId: number;
}

export function useDailyWorkshopConfigSelection({
  initialConfigId,
}: UseDailyWorkshopConfigSelectionInput) {
  const [selectedConfigId, setSelectedConfigId] = useState(initialConfigId);

  const selectConfig = useCallback((configId: number) => {
    setSelectedConfigId(configId);
  }, []);

  const isUsingInitialConfig = selectedConfigId === initialConfigId;

  return {
    selectedConfigId,
    isUsingInitialConfig,
    selectConfig,
  };
}
