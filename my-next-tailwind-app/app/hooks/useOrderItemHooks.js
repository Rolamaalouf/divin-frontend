import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getMyOrderItems,
  getOrderItemsByOrderId
} from '../lib/api';

export const useOrderItems = () =>
  useQuery({
    queryKey: ['orderItems'],
    queryFn: getOrderItems,
  });

export const useOrderItem =(orderId) =>
  useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: () => getOrderItemById(orderId),
    enabled: !!orderId,
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
export const useMyOrderItems = () =>
  useQuery({
    queryKey: ['myOrderItems'],
    queryFn: getMyOrderItems,
  });
export const useOrderItemsByOrderId = (orderId) =>
    useQuery({
      queryKey: ['orderItemsByOrderId', orderId],
      queryFn: () => getOrderItemsByOrderId(orderId),
      enabled: !!orderId, // only run if orderId exists
    });
  