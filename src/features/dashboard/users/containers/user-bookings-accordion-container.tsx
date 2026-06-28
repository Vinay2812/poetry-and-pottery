"use client";

import { useUIStore } from "@/store/ui.store";
import { useCallback, useMemo, useState } from "react";

import {
  useAdminUpdateDailyWorkshopRegistrationStatusMutation,
  useAdminUpdateOrderStatusMutation,
  useAdminUpdateRegistrationStatusMutation,
  useAdminUserDailyWorkshopRegistrationsForUserQuery,
  useAdminUserOrdersQuery,
  useAdminUserRegistrationsQuery,
} from "@/graphql/generated/graphql";

import { UserBookingsAccordion } from "../components/user-bookings-accordion";
import {
  buildDailyWorkshopBookingRows,
  buildOrderBookingRows,
  buildRegistrationBookingRows,
} from "../types";
import type {
  BookingRowViewModel,
  UserBookingsAccordionContainerProps,
  UserBookingsAccordionViewModel,
} from "../types";

// Rendered only while a user row is expanded, so mounting triggers the fetch.
export function UserBookingsAccordionContainer({
  userId,
  matchQuery,
}: UserBookingsAccordionContainerProps) {
  const { addToast } = useUIStore();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const ordersResult = useAdminUserOrdersQuery({ variables: { userId } });
  const registrationsResult = useAdminUserRegistrationsQuery({
    variables: { userId },
  });
  const workshopsResult = useAdminUserDailyWorkshopRegistrationsForUserQuery({
    variables: { userId },
  });

  const [updateOrderStatus] = useAdminUpdateOrderStatusMutation();
  const [updateRegistrationStatus] = useAdminUpdateRegistrationStatusMutation();
  const [updateDailyWorkshopStatus] =
    useAdminUpdateDailyWorkshopRegistrationStatusMutation();

  const orders = ordersResult.data?.adminUserOrders;
  const registrations = registrationsResult.data?.adminUserRegistrations;
  const workshops = workshopsResult.data?.adminUserDailyWorkshopRegistrations;

  const handleStatusChange = useCallback(
    async (row: BookingRowViewModel, nextStatus: string) => {
      if (nextStatus === row.status) {
        return;
      }

      setUpdatingId(row.id);
      try {
        let result: { success: boolean; error?: string | null } | undefined;

        if (row.kind === "order") {
          const { data } = await updateOrderStatus({
            variables: { orderId: row.id, status: nextStatus },
          });
          result = data?.adminUpdateOrderStatus;
          if (result?.success) {
            await ordersResult.refetch();
          }
        } else if (row.kind === "registration") {
          const { data } = await updateRegistrationStatus({
            variables: { registrationId: row.id, status: nextStatus },
          });
          result = data?.adminUpdateRegistrationStatus;
          if (result?.success) {
            await registrationsResult.refetch();
          }
        } else {
          const { data } = await updateDailyWorkshopStatus({
            variables: { registrationId: row.id, status: nextStatus },
          });
          result = data?.adminUpdateDailyWorkshopRegistrationStatus;
          if (result?.success) {
            await workshopsResult.refetch();
          }
        }

        if (result?.success) {
          addToast({ type: "success", message: "Status updated." });
        } else {
          addToast({
            type: "error",
            message: result?.error || "Failed to update status.",
          });
        }
      } catch {
        addToast({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      } finally {
        setUpdatingId(null);
      }
    },
    [
      addToast,
      ordersResult,
      registrationsResult,
      workshopsResult,
      updateOrderStatus,
      updateRegistrationStatus,
      updateDailyWorkshopStatus,
    ],
  );

  const viewModel: UserBookingsAccordionViewModel = useMemo(() => {
    const orderRows = buildOrderBookingRows(orders ?? [], matchQuery);
    const registrationRows = buildRegistrationBookingRows(
      registrations ?? [],
      matchQuery,
    );
    const dailyWorkshopRows = buildDailyWorkshopBookingRows(
      workshops ?? [],
      matchQuery,
    );

    const isLoading =
      (ordersResult.loading && !orders) ||
      (registrationsResult.loading && !registrations) ||
      (workshopsResult.loading && !workshops);

    const hasError = Boolean(
      ordersResult.error || registrationsResult.error || workshopsResult.error,
    );

    return {
      orders: orderRows,
      registrations: registrationRows,
      dailyWorkshops: dailyWorkshopRows,
      ordersCount: orderRows.length,
      registrationsCount: registrationRows.length,
      dailyWorkshopsCount: dailyWorkshopRows.length,
      isLoading,
      hasError,
    };
  }, [
    orders,
    registrations,
    workshops,
    matchQuery,
    ordersResult.loading,
    ordersResult.error,
    registrationsResult.loading,
    registrationsResult.error,
    workshopsResult.loading,
    workshopsResult.error,
  ]);

  return (
    <UserBookingsAccordion
      viewModel={viewModel}
      updatingId={updatingId}
      onStatusChange={handleStatusChange}
    />
  );
}
