import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from '../lib/api';

export const useOrderItems = () =>
  useQuery({
    queryKey: ['orderItems'],
    queryFn: getOrderItems,
  });

export const useOrderItem = (id) =>
  useQuery({
    queryKey: ['orderItem', id],
    queryFn: () => getOrderItemById(id),
    enabled: !!id,
  });

export const useCreateOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
};

export const useUpdateOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateOrderItem(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
};

export const useDeleteOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
  });
};
