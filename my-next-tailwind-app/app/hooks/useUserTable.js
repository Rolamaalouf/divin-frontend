import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

export const useUserTable = ({ removeUser }) => {
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'Do you really want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await removeUser(id);
            toast.success('User deleted successfully');
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return { handleDelete };
};
