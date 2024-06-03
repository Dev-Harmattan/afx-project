'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
} from '@tanstack/react-table';
import Button from '../button';
import CopyButton from '../copyButton';
import AddUserButton from './addUserButton';
import AddUserModal from './addUserModal';
import ConfirmDelete from '../confirmDelete';
import { User } from '@prisma/client';
import { userDeleteAction } from '@/lib/actions/userDeleteAction';

interface UserTableProps {
  userData: User | any;
  currentUser: User | any;
}

interface ColumnSort {
  id: string;
  desc: boolean;
}

interface SortingState {
  sorting: ColumnSort[];
}

interface CellProps<T extends Record<string, any>> {
  row: Row<T>;
}

interface RoleDataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const formatId = (id: string) => {
  if (id.length > 5) {
    return `${id.substring(0, 5)}...`;
  }
  return id;
};

const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }: CellProps<RoleDataType>) => (
      <CopyButton
        originalValue={row.original.id}
        value={formatId(row.original.id.toString())}
      />
    ),
  },
  {
    header: 'Name',
    accessorFn: (row: any) => `${row.first_name} ${row.last_name}`,
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  // {
  //   header: 'New Event',
  //   accessorKey: 'details',
  //   cell: ({
  //     handleUserDetail,
  //     isDisable,
  //   }: {
  //     handleUserDetail: () => void;
  //     isDisable: boolean;
  //   }) => (
  //     <button
  //       onClick={handleUserDetail}
  //       className="bg-textSoft text-bgOriginal rounded-md outline-none py-1 px-2 text-lg hover:bg-slate-400"
  //       disabled={isDisable}
  //     >
  //       Add To Event
  //     </button>
  //   ),
  // },
  {
    header: 'Delete',
    accessorKey: 'delete',
    cell: ({
      handleDeleteUser,
      isDisable,
    }: {
      handleDeleteUser: () => void;
      isDisable: boolean;
    }) => (
      <button
        onClick={handleDeleteUser}
        className="bg-red-600 text-white rounded-md outline-none py-1 px-2 text-lg hover:bg-red-700"
        disabled={isDisable}
      >
        Delete
      </button>
    ),
  },
];

const UserTable = ({ userData, currentUser }: UserTableProps) => {
  const userMap = useMemo(() => {
    if (!userData || userData?.length === 0) return [];
    return userData
      .filter((user: User) => user.id !== currentUser.id)
      .map((user: User) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }));
  }, [userData]);

  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState('');
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenDeleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>('');
  const router = useRouter();

  const handleModalOpen = () => {
    setOpenModal((current) => !current);
  };

  const handleConfirmDeleteUser = async () => {
    if (deleteUserId) {
      await userDeleteAction(deleteUserId);
      setDeleteUserId('');
      window.location.reload();
    }
    setDeleteUserModal(false);
  };

  const closeDeleteModal = () => {
    setDeleteUserModal(false);
  };

  const handleDetailsClick = (data: any) => {};

  const handleDeleteClick = (data: any) => {
    setDeleteUserId(data.id);
    setDeleteUserModal(true);
    router.refresh();
  };

  const table = useReactTable({
    data: userMap,
    //@ts-ignore
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="bg-bgSoft p-5 rounded-md mx-3 w-full">
      <AddUserModal
        isDisable={currentUser.role !== 'admin'}
        handleModalClose={() => setOpenModal(false)}
        showModal={isOpenModal}
      />
      <ConfirmDelete
        isOpen={isOpenDeleteUserModal}
        confirm={handleConfirmDeleteUser}
        handleClose={closeDeleteModal}
        content="Are you sure you want to delete this user?"
      />
      <>
        <h1 className="font-medium bg-bgSoft mb-2">Explore Users List</h1>
        <div className="flex items-center justify-between m-5">
          <div className="my-2 mb-3 border-none outline-none focus:border-transparent">
            <input
              className="bg-textSoft border-none focus:outline-none text-black rounded-sm w-40px px-3 py-1 placeholder-black"
              type="text"
              placeholder="Search...."
              name={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
          <AddUserButton handleClick={handleModalOpen} />
        </div>

        <div className="overflow-scroll">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-bgSoft">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-textSoft uppercase tracking-wider cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === false
                        ? null
                        : header.column.getIsSorted() === 'asc'
                        ? ' 🔼'
                        : header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {userMap && userMap.length !== 0 && (
              <tbody className="bg-bgSoft divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="transition-colors ">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-textSoft"
                        onClick={
                          cell.column.columnDef.header === 'Details'
                            ? () => handleDetailsClick(row.original)
                            : cell.column.columnDef.header === 'Delete'
                            ? () => handleDeleteClick(row.original)
                            : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!userMap ||
            (userMap?.length === 0 && (
              <div className="text-textSoft text-center self-center my-10">
                No User Data.
              </div>
            ))}

          {!userMap && userMap.length === 0 && (
            <div className="mt-5">
              <Button
                handleClick={() => table.setPageIndex(0)}
                title="First page"
                disabled={false}
              />
              <Button
                disabled={!table.getCanPreviousPage()}
                handleClick={() => table.previousPage()}
                title="Prev Page"
              />
              <Button
                disabled={!table.getCanNextPage()}
                handleClick={() => table.nextPage()}
                title="Next Page"
              />
              <Button
                title="Last Page"
                handleClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={false}
              />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default UserTable;
