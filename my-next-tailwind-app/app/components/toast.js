// app/components/toast.js
'use client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, message) => {
  if (type === 'error') {
    toast.error(message);
  } else if (type === 'success') {
    toast.success(message);
  } else {
    toast(message);
  }
};
